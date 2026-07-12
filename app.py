import os
import secrets
import datetime
import re
from functools import wraps
from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_cors import CORS
import jwt

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', secrets.token_hex(32))
JWT_EXPIRATION = datetime.timedelta(hours=1)
token_blacklist = set()

# Mock Database
USERS = [
    {
        "id": 1,
        "email": 'test@test.com',
        "password": 'Test1234!',
        "name": 'Usuario Demo',
        "role": 'user',
        "preferences": {
            "language": 'es',
            "theme": 'dark',
            "twoFactor": False,
            "strictMode": False,
        }
    },
    {
        "id": 2,
        "email": 'admin@test.com',
        "password": 'Admin1234!',
        "name": 'Administrador del Sistema',
        "role": 'admin',
        "preferences": {
            "language": 'es',
            "theme": 'dark',
            "twoFactor": True,
            "strictMode": True,
        }
    }
]

USER_CARDS = []
SYSTEM_LOGS = []
CHAT_LOGS = []

cardIdCounter = 1
logIdCounter = 1
chatIdCounter = 1
MAX_LOGS = 1000

# Rate Limiting
loginAttempts = {}
MAX_ATTEMPTS = 5
LOCKOUT_DURATION = 60  # seconds

def get_rate_limit_info(ip):
    if ip not in loginAttempts:
        loginAttempts[ip] = {"count": 0, "lockoutEnd": 0}
    return loginAttempts[ip]

def is_rate_limited(ip):
    info = get_rate_limit_info(ip)
    now = datetime.datetime.now().timestamp()
    if info["lockoutEnd"] > now:
        return {"locked": True, "remaining": int(info["lockoutEnd"] - now)}
    if 0 < info["lockoutEnd"] <= now:
        info["count"] = 0
        info["lockoutEnd"] = 0
    return {"locked": False}

def record_failed_attempt(ip):
    info = get_rate_limit_info(ip)
    info["count"] += 1
    if info["count"] >= MAX_ATTEMPTS:
        info["lockoutEnd"] = datetime.datetime.now().timestamp() + LOCKOUT_DURATION

def reset_attempts(ip):
    if ip in loginAttempts:
        del loginAttempts[ip]

def crear_log(usuario, accion, resultado, detalles=None):
    global logIdCounter
    if detalles is None:
        detalles = {}
    safe = detalles.copy()
    for key in ['password', 'currentPassword', 'newPassword', 'token']:
        safe.pop(key, None)
    
    entry = {
        "id": logIdCounter,
        "usuario": str(usuario or 'sistema'),
        "accion": str(accion),
        "fecha": datetime.datetime.utcnow().isoformat() + "Z",
        "resultado": str(resultado),
        "detalles": str(safe).replace("'", '"')
    }
    logIdCounter += 1
    SYSTEM_LOGS.insert(0, entry)
    if len(SYSTEM_LOGS) > MAX_LOGS:
        SYSTEM_LOGS.pop()
    return entry

def crear_chat_log(usuario, consulta, respuesta, modulo, resultado='respondido'):
    global chatIdCounter
    entry = {
        "id": chatIdCounter,
        "usuario": str(usuario or 'sistema'),
        "consulta": str(consulta)[:500],
        "respuesta": str(respuesta)[:2000],
        "modulo": str(modulo),
        "fecha": datetime.datetime.utcnow().isoformat() + "Z",
        "resultado": str(resultado),
    }
    chatIdCounter += 1
    CHAT_LOGS.insert(0, entry)
    if len(CHAT_LOGS) > MAX_LOGS:
        CHAT_LOGS.pop()
    return entry

# Auth Middleware
def authenticate_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"valid": False, "message": "Token de autenticación requerido."}), 401
        
        token = auth_header.split(' ')[1]
        if token in token_blacklist:
            return jsonify({"valid": False, "message": "Sesión cerrada. Inicia sesión de nuevo."}), 401
            
        try:
            decoded = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            request.user = decoded
            request.token = token
        except jwt.ExpiredSignatureError:
            return jsonify({"valid": False, "message": "Tu sesión ha expirado. Inicia sesión de nuevo."}), 403
        except jwt.InvalidTokenError:
            return jsonify({"valid": False, "message": "Token inválido."}), 403
            
        return f(*args, **kwargs)
    return decorated

def authorize_admin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.user.get('role') != 'admin':
            return jsonify({"success": False, "message": "Acceso denegado. Se requieren permisos de administrador."}), 403
        return f(*args, **kwargs)
    return decorated

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/login', methods=['POST'])
def login():
    ip = request.remote_addr or 'unknown'
    data = request.json or {}
    email = data.get('email')
    password = data.get('password')

    rate_limit = is_rate_limited(ip)
    if rate_limit["locked"]:
        return jsonify({"success": False, "locked": True, "message": f"Demasiados intentos. Intenta de nuevo en {rate_limit['remaining']}s."}), 429

    if not email or not password:
        return jsonify({"success": False, "message": "Correo y contraseña son requeridos."}), 400

    user = next((u for u in USERS if u['email'].lower() == email.lower() and u['password'] == password), None)

    if user:
        reset_attempts(ip)
        payload = {
            "id": user['id'],
            "email": user['email'],
            "name": user['name'],
            "role": user['role'],
            "exp": datetime.datetime.utcnow() + JWT_EXPIRATION,
            "iss": "banksecure-expert-system"
        }
        token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
        return jsonify({
            "success": True,
            "message": "Autenticación exitosa.",
            "token": token,
            "user": {"email": user['email'], "name": user['name'], "role": user['role']}
        })

    record_failed_attempt(ip)
    info = get_rate_limit_info(ip)
    attempts_left = MAX_ATTEMPTS - info["count"]

    if info["lockoutEnd"] > datetime.datetime.now().timestamp():
        return jsonify({"success": False, "locked": True, "message": f"Cuenta bloqueada por demasiados intentos. Espera {LOCKOUT_DURATION}s."}), 429

    suffix = "s" if attempts_left != 1 else ""
    return jsonify({"success": False, "locked": False, "message": f"Credenciales incorrectas. {attempts_left} intento{suffix} restante{suffix}."}), 401

@app.route('/api/session', methods=['GET'])
@authenticate_token
def get_session():
    user = next((u for u in USERS if u['id'] == request.user['id']), None)
    if not user:
        return jsonify({"valid": False, "message": "Usuario no encontrado."}), 404
    
    return jsonify({
        "valid": True,
        "user": {
            "id": user['id'],
            "email": user['email'],
            "name": user['name'],
            "role": user['role'],
            "preferences": user.get('preferences', {
                "language": 'es', "theme": 'dark', "twoFactor": False, "strictMode": False
            })
        },
        "expiresAt": datetime.datetime.utcfromtimestamp(request.user['exp']).isoformat() + "Z"
    })

@app.route('/api/logout', methods=['POST'])
@authenticate_token
def logout():
    token_blacklist.add(request.token)
    return jsonify({"success": True, "message": "Sesión cerrada exitosamente."})

@app.route('/api/user/profile', methods=['PUT'])
@authenticate_token
def update_profile():
    data = request.json or {}
    name = data.get('name')
    email = data.get('email')

    if not name or not str(name).strip():
        return jsonify({"success": False, "message": "El nombre es requerido."}), 400
    if not email or not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$', email):
        return jsonify({"success": False, "message": "Formato de correo electrónico inválido."}), 400

    user = next((u for u in USERS if u['id'] == request.user['id']), None)
    if not user:
        return jsonify({"success": False, "message": "Usuario no encontrado."}), 404

    if any(u['id'] != user['id'] and u['email'].lower() == email.lower() for u in USERS):
        return jsonify({"success": False, "message": "Este correo ya está en uso."}), 409

    user['name'] = str(name).strip()
    user['email'] = str(email).lower().strip()
    
    crear_log(user['email'], 'actualizar_perfil', 'exito', {})
    return jsonify({"success": True, "message": "Perfil actualizado con éxito.", "user": {"name": user['name'], "email": user['email']}})

@app.route('/api/user/preferences', methods=['PUT'])
@authenticate_token
def update_preferences():
    data = request.json or {}
    user = next((u for u in USERS if u['id'] == request.user['id']), None)
    if not user:
        return jsonify({"success": False, "message": "Usuario no encontrado."}), 404

    prefs = user.setdefault('preferences', {})
    if 'language' in data: prefs['language'] = data['language']
    if 'theme' in data: prefs['theme'] = data['theme']
    if 'twoFactor' in data: prefs['twoFactor'] = bool(data['twoFactor'])
    if 'strictMode' in data: prefs['strictMode'] = bool(data['strictMode'])

    return jsonify({"success": True, "message": "Preferencias actualizadas con éxito.", "preferences": prefs})

@app.route('/api/user/password', methods=['PUT'])
@authenticate_token
def update_password():
    data = request.json or {}
    current = data.get('currentPassword')
    new_pass = data.get('newPassword')

    if not current or not new_pass:
        return jsonify({"success": False, "message": "La contraseña actual y la nueva son requeridas."}), 400

    user = next((u for u in USERS if u['id'] == request.user['id']), None)
    if not user:
        return jsonify({"success": False, "message": "Usuario no encontrado."}), 404

    if user['password'] != current:
        return jsonify({"success": False, "message": "La contraseña actual es incorrecta."}), 400

    if not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$', new_pass):
        return jsonify({"success": False, "message": "La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."}), 400

    user['password'] = new_pass
    return jsonify({"success": True, "message": "Contraseña actualizada con éxito."})

@app.route('/api/chat', methods=['POST'])
@authenticate_token
def chat():
    data = request.json or {}
    if not data.get('message') or not isinstance(data['message'], str):
        return jsonify({"reply": "Mensaje vacío."}), 400
    return jsonify({"authenticated": True, "user": request.user.get('name')})

# --- Cards Endpoints ---
def get_user_cards(user_id):
    return [c for c in USER_CARDS if c.get('userId') == user_id]

def sanitize_card(card):
    safe = card.copy()
    safe.pop('userId', None)
    return safe

def validate_card_payload(data):
    if not data: return {"valid": False, "message": "Datos inválidos"}
    number = str(data.get('number', '')).strip()
    expiry = str(data.get('expiry', '')).strip()
    cvv = str(data.get('cvv', '')).strip()
    status = str(data.get('status', '')).strip()
    
    if not number or not expiry or not cvv or not status:
        return {"valid": False, "message": "Todos los campos de la tarjeta son obligatorios."}
    if not re.match(r'^\d{4}(?:\s?\d{4}){3}$', number):
        return {"valid": False, "message": "El número de tarjeta debe tener formato de 16 dígitos."}
    if not re.match(r'^(0[1-9]|1[0-2])\/(\d{2})$', expiry):
        return {"valid": False, "message": "La fecha de vencimiento es inválida."}
    if not re.match(r'^\d{3,4}$', cvv):
        return {"valid": False, "message": "El CVV es inválido."}
    return {"valid": True}

@app.route('/api/cards', methods=['GET'])
@authenticate_token
def get_cards():
    cards = [sanitize_card(c) for c in get_user_cards(request.user['id'])]
    return jsonify({"success": True, "cards": cards})

@app.route('/api/cards', methods=['POST'])
@authenticate_token
def add_card():
    global cardIdCounter
    data = request.json or {}
    val = validate_card_payload(data)
    if not val["valid"]:
        return jsonify({"success": False, "message": val["message"]}), 400
    
    card = {
        "id": cardIdCounter,
        "userId": request.user['id'],
        "number": str(data['number']).strip(),
        "expiry": str(data['expiry']).strip(),
        "cvv": str(data['cvv']).strip(),
        "status": str(data['status']).strip(),
        "availableAmount": 50000.0,
        "selected": False,
        "createdAt": datetime.datetime.utcnow().isoformat() + "Z"
    }
    cardIdCounter += 1
    USER_CARDS.append(card)
    
    last4 = re.sub(r'\D', '', card['number'])[-4:]
    crear_log(request.user['email'], 'tarjeta_agregada', 'exito', {"last4": last4, "status": card['status']})
    return jsonify({"success": True, "card": sanitize_card(card)}), 201

@app.route('/api/cards/<int:card_id>', methods=['PUT'])
@authenticate_token
def update_card(card_id):
    data = request.json or {}
    val = validate_card_payload(data)
    if not val["valid"]:
        return jsonify({"success": False, "message": val["message"]}), 400
        
    cards = get_user_cards(request.user['id'])
    card = next((c for c in cards if c['id'] == card_id), None)
    if not card:
        return jsonify({"success": False, "message": "Tarjeta no encontrada."}), 404
        
    card['number'] = str(data['number']).strip()
    card['expiry'] = str(data['expiry']).strip()
    card['cvv'] = str(data['cvv']).strip()
    card['status'] = str(data['status']).strip()
    
    if data.get('selected') is True:
        for c in cards:
            c['selected'] = (c['id'] == card['id'])
            
    last4 = re.sub(r'\D', '', card['number'])[-4:]
    crear_log(request.user['email'], 'tarjeta_actualizada', 'exito', {"last4": last4, "status": card['status']})
    return jsonify({"success": True, "card": sanitize_card(card)})

@app.route('/api/cards/<int:card_id>/transactions', methods=['POST'])
@authenticate_token
def card_transaction(card_id):
    data = request.json or {}
    cards = get_user_cards(request.user['id'])
    card = next((c for c in cards if c['id'] == card_id), None)
    
    try:
        amount = float(data.get('amount', 0))
    except (ValueError, TypeError):
        amount = 0.0
        
    desc = str(data.get('description', 'Transacción'))
    
    if not card:
        return jsonify({"success": False, "message": "Tarjeta no encontrada."}), 404
    if not card['selected'] or card['status'] != 'Activa':
        return jsonify({"success": False, "message": "No hay una tarjeta activa y validada para realizar la transacción."}), 400
    if amount <= 0:
        return jsonify({"success": False, "message": "El monto debe ser mayor a cero."}), 400
    if card['availableAmount'] < amount:
        return jsonify({"success": False, "message": "Saldo insuficiente."}), 400
        
    card['availableAmount'] = round(card['availableAmount'] - amount, 2)
    crear_log(request.user['email'], 'transaccion_aprobada', 'exito', {"cardId": card['id'], "amount": amount, "description": desc})
    return jsonify({"success": True, "card": sanitize_card(card), "transaction": {"amount": amount, "description": desc}}), 201

@app.route('/api/cards/<int:card_id>/select', methods=['POST'])
@authenticate_token
def select_card(card_id):
    cards = get_user_cards(request.user['id'])
    card = next((c for c in cards if c['id'] == card_id), None)
    if not card:
        return jsonify({"success": False, "message": "Tarjeta no encontrada."}), 404
    for c in cards:
        c['selected'] = (c['id'] == card['id'])
    return jsonify({"success": True, "card": sanitize_card(card)})

# --- Logs Endpoints ---
@app.route('/api/logs/action', methods=['POST'])
@authenticate_token
def log_action():
    data = request.json or {}
    accion = data.get('accion')
    resultado = data.get('resultado')
    if not accion or not resultado:
        return jsonify({"success": False, "message": "accion y resultado son requeridos."}), 400
    if resultado not in ['exito', 'error', 'advertencia']:
        return jsonify({"success": False, "message": "resultado debe ser: exito, error, advertencia."}), 400
        
    log = crear_log(request.user['email'], accion, resultado, data.get('detalles', {}))
    return jsonify({"success": True, "log": log}), 201

@app.route('/api/logs/chat', methods=['POST'])
@authenticate_token
def log_chat():
    data = request.json or {}
    if not all(k in data for k in ['consulta', 'respuesta', 'modulo']):
        return jsonify({"success": False, "message": "consulta, respuesta y modulo son requeridos."}), 400
    
    log = crear_chat_log(request.user['email'], data['consulta'], data['respuesta'], data['modulo'], data.get('resultado', 'respondido'))
    return jsonify({"success": True, "log": log}), 201

@app.route('/api/logs', methods=['GET'])
@authenticate_token
def get_logs():
    tipo = request.args.get('tipo', 'all')
    usuario = request.args.get('usuario')
    fecha = request.args.get('fecha')
    resultado = request.args.get('resultado')
    q = request.args.get('q')
    
    is_admin = request.user['role'] == 'admin'
    user_email = request.user['email']
    
    def match_sys(l):
        if not is_admin and l['usuario'] != user_email: return False
        if is_admin and usuario and l['usuario'] != usuario: return False
        if fecha and not l['fecha'].startswith(fecha): return False
        if resultado and l['resultado'] != resultado: return False
        if q and q.lower() not in l['accion'].lower() and q.lower() not in l['detalles'].lower(): return False
        return True
        
    def match_chat(l):
        if not is_admin and l['usuario'] != user_email: return False
        if is_admin and usuario and l['usuario'] != usuario: return False
        if fecha and not l['fecha'].startswith(fecha): return False
        if resultado and l['resultado'] != resultado: return False
        if q and q.lower() not in l['consulta'].lower() and q.lower() not in l['respuesta'].lower(): return False
        return True

    sys_logs = [{**l, "tipo": "sistema"} for l in SYSTEM_LOGS if match_sys(l)]
    chat_logs = [{**l, "tipo": "chat"} for l in CHAT_LOGS if match_chat(l)]
    
    if tipo == 'sistema':
        combinados = sys_logs
    elif tipo == 'chat':
        combinados = chat_logs
    else:
        combinados = sorted(sys_logs + chat_logs, key=lambda x: x['fecha'], reverse=True)
        
    return jsonify({
        "success": True,
        "total": len(combinados),
        "logs": combinados[:200],
        "meta": {"totalSistema": len(sys_logs), "totalChat": len(chat_logs), "isAdmin": is_admin}
    })

@app.route('/api/logs', methods=['DELETE'])
@authenticate_token
def delete_logs():
    data = request.json or {}
    tipo, usuario, fecha, resultado, ids = data.get('tipo'), data.get('usuario'), data.get('fecha'), data.get('resultado'), data.get('ids')
    
    if not any([tipo, usuario, fecha, resultado, ids]):
        return jsonify({"success": False, "message": "Se requiere al menos un filtro."}), 400
        
    is_admin = request.user['role'] == 'admin'
    user_email = request.user['email']
    
    def match(l, ltype):
        if not is_admin and l['usuario'] != user_email: return False
        if is_admin and usuario and l['usuario'] != usuario: return False
        if tipo and tipo != 'all' and tipo != ltype: return False
        if fecha and not l['fecha'].startswith(fecha): return False
        if resultado and l['resultado'] != resultado: return False
        if ids and isinstance(ids, list) and l['id'] not in ids: return False
        return True

    del_sys = 0
    del_chat = 0
    
    if not tipo or tipo in ['sistema', 'all']:
        before = len(SYSTEM_LOGS)
        SYSTEM_LOGS[:] = [l for l in SYSTEM_LOGS if not match(l, 'sistema')]
        del_sys = before - len(SYSTEM_LOGS)
        
    if not tipo or tipo in ['chat', 'all']:
        before = len(CHAT_LOGS)
        CHAT_LOGS[:] = [l for l in CHAT_LOGS if not match(l, 'chat')]
        del_chat = before - len(CHAT_LOGS)
        
    crear_log(user_email, 'eliminar_historial', 'exito', {"filtros": data, "eliminados": {"sistema": del_sys, "chat": del_chat}})
    return jsonify({"success": True, "message": f"Se eliminaron {del_sys + del_chat} registros.", "eliminados": {"sistema": del_sys, "chat": del_chat}})

@app.route('/api/logs/all', methods=['DELETE'])
@authenticate_token
@authorize_admin
def delete_all_logs():
    data = request.json or {}
    if data.get('confirmCode') != 'CONFIRMAR':
        return jsonify({"success": False, "message": "Se requiere confirmCode = 'CONFIRMAR' para borrar todo el historial."}), 400
        
    global logIdCounter, chatIdCounter
    del_sys = len(SYSTEM_LOGS)
    del_chat = len(CHAT_LOGS)
    SYSTEM_LOGS.clear()
    CHAT_LOGS.clear()
    logIdCounter = 1
    chatIdCounter = 1
    
    crear_log(request.user['email'], 'eliminar_historial_total', 'advertencia', {"esAdmin": True, "eliminados": {"sistema": del_sys, "chat": del_chat}})
    return jsonify({"success": True, "message": f"Historial eliminado. {del_sys + del_chat} registros borrados.", "eliminados": {"sistema": del_sys, "chat": del_chat}})

@app.route('/health')
def health():
    return jsonify({"ok": True})

# Catch-all to serve static files
@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
