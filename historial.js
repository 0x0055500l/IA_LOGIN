/**
 * ─── historial.js ────────────────────────────────────────────────────────────
 * Módulo de Historial — BankSecure Sistema Experto
 *
 * Responsabilidades:
 *   · registrarAccion()  — registra acciones del sistema (login, perfil, etc.)
 *   · registrarChat()    — registra interacciones con el Asistente IA
 *   · initHistorialView() — inicializa la vista SPA del historial
 *   · Filtros: tipo, fecha, resultado, búsqueda libre
 *   · Eliminación parcial y total con modal de confirmación de 3 pasos
 */

'use strict';

// ─── Estado del módulo ───────────────────────────────────────────────────────
let _historialInited   = false;
let _currentLogs       = [];
let _activeFilters     = { tipo: 'all', fecha: '', resultado: '', q: '' };
let _selectedIds       = new Set();
let _deleteStep        = 0;   // 0=cerrado, 1=seleccionar tipo, 2=confirmar, 3=código
let _pendingDeleteBody = null;

// ─── Constantes ──────────────────────────────────────────────────────────────
const CONFIRM_WORD = 'CONFIRMAR';

// ─── Helpers de formato ──────────────────────────────────────────────────────
function formatFecha(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('es-HN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function getLang() {
  return localStorage.getItem('userLanguage') || 'es';
}

function getToken() {
  return sessionStorage.getItem('authToken') || '';
}

// ─── Traducciones del módulo ─────────────────────────────────────────────────
const T = {
  es: {
    title: 'Historial del Sistema',
    subtitle: 'Registro completo de acciones y conversaciones con el Asistente IA.',
    tab_all: 'Todo', tab_sys: 'Sistema', tab_chat: 'Asistente IA',
    filter_date: 'Filtrar por fecha', filter_result: 'Resultado',
    filter_q: 'Buscar…', btn_refresh: 'Actualizar',
    btn_delete_partial: 'Eliminar selección', btn_delete_all: 'Eliminar todo',
    col_tipo: 'Tipo', col_accion: 'Acción / Consulta',
    col_usuario: 'Usuario', col_resultado: 'Resultado',
    col_fecha: 'Fecha', col_modulo: 'Módulo / Detalles',
    badge_sys: 'Sistema', badge_chat: 'IA',
    res_exito: 'Éxito', res_error: 'Error', res_advertencia: 'Advertencia',
    res_respondido: 'Respondido', res_desconocido: 'Sin respuesta',
    empty: 'No hay registros que coincidan con los filtros.',
    empty_sub: 'Interactúa con el sistema para generar historial.',
    modal_title_partial: '⚠️ Eliminar registros seleccionados',
    modal_title_all: '🗑️ Eliminar todo el historial',
    modal_step1: 'Selecciona qué deseas eliminar:',
    modal_step2: '¿Confirmas que deseas eliminar estos registros?',
    modal_step3: 'Escribe CONFIRMAR para proceder:',
    modal_opt_all: 'Todo el historial', modal_opt_sys: 'Solo acciones del sistema',
    modal_opt_chat: 'Solo conversaciones IA', modal_opt_selected: 'Solo registros seleccionados',
    modal_btn_next: 'Continuar →', modal_btn_confirm: 'Sí, eliminar',
    modal_btn_cancel: 'Cancelar', modal_btn_delete: 'Eliminar definitivamente',
    modal_code_placeholder: 'Escribe CONFIRMAR',
    modal_code_error: 'Debes escribir exactamente: CONFIRMAR',
    deleting: 'Eliminando…', deleted_ok: 'registros eliminados correctamente.',
    delete_error: 'Error al eliminar registros.',
    load_error: 'Error al cargar el historial.',
    no_selection: 'Selecciona al menos un registro para eliminar.',
    select_all: 'Seleccionar todo', deselect_all: 'Deseleccionar todo',
    records: 'registros',
  },
  en: {
    title: 'System History',
    subtitle: 'Complete record of system actions and AI Assistant interactions.',
    tab_all: 'All', tab_sys: 'System', tab_chat: 'AI Assistant',
    filter_date: 'Filter by date', filter_result: 'Result',
    filter_q: 'Search…', btn_refresh: 'Refresh',
    btn_delete_partial: 'Delete selection', btn_delete_all: 'Delete all',
    col_tipo: 'Type', col_accion: 'Action / Query',
    col_usuario: 'User', col_resultado: 'Result',
    col_fecha: 'Date', col_modulo: 'Module / Details',
    badge_sys: 'System', badge_chat: 'AI',
    res_exito: 'Success', res_error: 'Error', res_advertencia: 'Warning',
    res_respondido: 'Answered', res_desconocido: 'Unknown',
    empty: 'No records match the current filters.',
    empty_sub: 'Interact with the system to generate history.',
    modal_title_partial: '⚠️ Delete selected records',
    modal_title_all: '🗑️ Delete all history',
    modal_step1: 'Select what you want to delete:',
    modal_step2: 'Do you confirm deletion of these records?',
    modal_step3: 'Type CONFIRMAR to proceed:',
    modal_opt_all: 'All history', modal_opt_sys: 'System actions only',
    modal_opt_chat: 'AI conversations only', modal_opt_selected: 'Selected records only',
    modal_btn_next: 'Continue →', modal_btn_confirm: 'Yes, delete',
    modal_btn_cancel: 'Cancel', modal_btn_delete: 'Delete permanently',
    modal_code_placeholder: 'Type CONFIRMAR',
    modal_code_error: 'You must type exactly: CONFIRMAR',
    deleting: 'Deleting…', deleted_ok: 'records deleted successfully.',
    delete_error: 'Error deleting records.',
    load_error: 'Error loading history.',
    no_selection: 'Select at least one record to delete.',
    select_all: 'Select all', deselect_all: 'Deselect all',
    records: 'records',
  },
};

function t(key) {
  const lang = getLang();
  return (T[lang] || T.es)[key] || key;
}

// ─── Registro de acciones del sistema ────────────────────────────────────────
/**
 * Registra una acción del sistema en el servidor.
 * @param {string} accion    - Identificador de la acción (ej. 'login', 'perfil_actualizado')
 * @param {string} resultado - 'exito' | 'error' | 'advertencia'
 * @param {object} detalles  - Metadata adicional (sin contraseñas)
 */
async function registrarAccion(accion, resultado = 'exito', detalles = {}) {
  const token = getToken();
  if (!token) return; // No hay sesión activa

  try {
    await fetch('/api/logs/action', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accion, resultado, detalles }),
    });

    // Guardar también localmente para persistencia entre recargas
    _saveToLocalCache({ tipo: 'sistema', accion, resultado, detalles,
      usuario: sessionStorage.getItem('userEmail') || 'usuario',
      fecha: new Date().toISOString() });

  } catch (e) {
    // Fallos silenciosos — el registro no debe interrumpir el flujo principal
    console.debug('[historial] Error al registrar acción:', e.message);
  }
}

/**
 * Registra una interacción con el Asistente IA.
 * @param {string} consulta   - Mensaje del usuario
 * @param {string} respuesta  - Respuesta del bot
 * @param {string} modulo     - Intent detectado (ej. 'explain_rule', 'fraud_info')
 * @param {string} resultado  - 'respondido' | 'desconocido'
 */
async function registrarChat(consulta, respuesta, modulo = 'unknown', resultado = 'respondido') {
  const token = getToken();
  if (!token) return;

  try {
    await fetch('/api/logs/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ consulta, respuesta, modulo, resultado }),
    });

    _saveToLocalCache({ tipo: 'chat', consulta, respuesta, modulo, resultado,
      usuario: sessionStorage.getItem('userEmail') || 'usuario',
      fecha: new Date().toISOString() });

  } catch (e) {
    console.debug('[historial] Error al registrar chat:', e.message);
  }
}

// ─── Cache local (localStorage) ──────────────────────────────────────────────
function _saveToLocalCache(entry) {
  try {
    const KEY = 'bankSecureHistory';
    const cache = JSON.parse(localStorage.getItem(KEY) || '[]');
    cache.unshift({ ...entry, _local: true });
    if (cache.length > 200) cache.splice(200);
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch (_) {}
}

// ─── Carga de historial desde el servidor ────────────────────────────────────
async function _fetchLogs(filters = {}) {
  const token = getToken();
  if (!token) return [];

  const params = new URLSearchParams();
  if (filters.tipo && filters.tipo !== 'all') params.set('tipo', filters.tipo);
  if (filters.fecha)     params.set('fecha', filters.fecha);
  if (filters.resultado) params.set('resultado', filters.resultado);
  if (filters.q)         params.set('q', filters.q);

  try {
    const res = await fetch(`/api/logs?${params.toString()}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.logs || [];
  } catch (e) {
    console.error('[historial] Error al cargar logs:', e);
    return [];
  }
}

// ─── Inicialización de la vista SPA ──────────────────────────────────────────
function initHistorialView() {
  if (_historialInited) {
    renderHistorial();
    return;
  }
  _historialInited = true;

  _buildHistorialHTML();
  _bindHistorialEvents();
  renderHistorial();
}

function _buildHistorialHTML() {
  const view = document.getElementById('historialView');
  if (!view) return;

  view.innerHTML = `
    <div class="historial-container">

      <!-- Header -->
      <div class="historial-header">
        <div>
          <p class="eyebrow">${t('title')}</p>
          <h2 class="historial-title">${t('title')}</h2>
          <p class="historial-subtitle">${t('subtitle')}</p>
        </div>
        <div class="historial-header-actions">
          <button id="histRefreshBtn" class="hist-btn hist-btn-secondary" title="${t('btn_refresh')}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
            ${t('btn_refresh')}
          </button>
          <button id="histDeleteAllBtn" class="hist-btn hist-btn-danger">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
            ${t('btn_delete_all')}
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="historial-tabs">
        <button class="hist-tab active" data-tab="all">${t('tab_all')} <span id="histCountAll" class="hist-count">0</span></button>
        <button class="hist-tab" data-tab="sistema">${t('tab_sys')} <span id="histCountSys" class="hist-count">0</span></button>
        <button class="hist-tab" data-tab="chat">${t('tab_chat')} <span id="histCountChat" class="hist-count">0</span></button>
      </div>

      <!-- Filters bar -->
      <div class="historial-filters">
        <div class="hist-filter-group">
          <label>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            ${t('filter_date')}
          </label>
          <input type="date" id="histFilterDate" class="hist-input" />
        </div>
        <div class="hist-filter-group">
          <label>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            ${t('filter_result')}
          </label>
          <select id="histFilterResult" class="hist-input">
            <option value="">— Todos —</option>
            <option value="exito">${t('res_exito')}</option>
            <option value="error">${t('res_error')}</option>
            <option value="advertencia">${t('res_advertencia')}</option>
            <option value="respondido">${t('res_respondido')}</option>
            <option value="desconocido">${t('res_desconocido')}</option>
          </select>
        </div>
        <div class="hist-filter-group hist-filter-search">
          <label>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            ${t('filter_q')}
          </label>
          <input type="text" id="histFilterQ" class="hist-input" placeholder="${t('filter_q')}" />
        </div>
        <button id="histClearFilters" class="hist-btn hist-btn-ghost">✕</button>
      </div>

      <!-- Selection bar -->
      <div class="historial-selection-bar" id="histSelectionBar" style="display:none;">
        <span id="histSelectionCount">0 ${t('records')} ${getLang() === 'en' ? 'selected' : 'seleccionados'}</span>
        <div class="hist-sel-actions">
          <button id="histSelectAllBtn" class="hist-btn hist-btn-ghost">${t('select_all')}</button>
          <button id="histDeleteSelBtn" class="hist-btn hist-btn-warning">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
            ${t('btn_delete_partial')}
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="historial-table-wrapper">
        <table class="historial-table" id="histTable">
          <thead>
            <tr>
              <th class="col-check"><input type="checkbox" id="histCheckAll" title="${t('select_all')}"></th>
              <th>${t('col_tipo')}</th>
              <th>${t('col_accion')}</th>
              <th>${t('col_usuario')}</th>
              <th>${t('col_resultado')}</th>
              <th>${t('col_fecha')}</th>
              <th>${t('col_modulo')}</th>
            </tr>
          </thead>
          <tbody id="histTableBody">
            <tr class="hist-loading"><td colspan="7"><div class="hist-spinner"></div></td></tr>
          </tbody>
        </table>
      </div>

      <!-- Empty state -->
      <div class="historial-empty" id="histEmptyState" style="display:none;">
        <div class="hist-empty-icon">📋</div>
        <strong>${t('empty')}</strong>
        <p>${t('empty_sub')}</p>
      </div>

    </div>

    <!-- ─── Modal de Confirmación ─── -->
    <div class="hist-modal-overlay" id="histModalOverlay" style="display:none;">
      <div class="hist-modal" id="histModal">
        <div class="hist-modal-header">
          <h3 id="histModalTitle"></h3>
          <button class="hist-modal-close" id="histModalClose">✕</button>
        </div>
        <div class="hist-modal-body" id="histModalBody"></div>
        <div class="hist-modal-footer" id="histModalFooter"></div>
      </div>
    </div>
  `;
}

function _bindHistorialEvents() {
  // Tabs
  document.querySelectorAll('.hist-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.hist-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _activeFilters.tipo = btn.dataset.tab;
      renderHistorial();
    });
  });

  // Filtros con debounce
  let filterDebounce;
  ['histFilterDate', 'histFilterResult', 'histFilterQ'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', (e) => {
      clearTimeout(filterDebounce);
      filterDebounce = setTimeout(() => {
        if (id === 'histFilterDate') _activeFilters.fecha = e.target.value;
        if (id === 'histFilterResult') _activeFilters.resultado = e.target.value;
        if (id === 'histFilterQ') _activeFilters.q = e.target.value;
        renderHistorial();
      }, 350);
    });
  });

  // Limpiar filtros
  document.getElementById('histClearFilters')?.addEventListener('click', () => {
    _activeFilters = { tipo: _activeFilters.tipo, fecha: '', resultado: '', q: '' };
    document.getElementById('histFilterDate').value = '';
    document.getElementById('histFilterResult').value = '';
    document.getElementById('histFilterQ').value = '';
    renderHistorial();
  });

  // Refresh
  document.getElementById('histRefreshBtn')?.addEventListener('click', () => renderHistorial());

  // Select all checkbox
  document.getElementById('histCheckAll')?.addEventListener('change', (e) => {
    _selectedIds.clear();
    if (e.target.checked) {
      _currentLogs.forEach(l => _selectedIds.add(l.id));
    }
    _updateCheckboxes();
    _updateSelectionBar();
  });

  // Select all button
  document.getElementById('histSelectAllBtn')?.addEventListener('click', () => {
    if (_selectedIds.size === _currentLogs.length) {
      _selectedIds.clear();
    } else {
      _currentLogs.forEach(l => _selectedIds.add(l.id));
    }
    _updateCheckboxes();
    _updateSelectionBar();
  });

  // Delete selection
  document.getElementById('histDeleteSelBtn')?.addEventListener('click', () => {
    if (_selectedIds.size === 0) {
      if (typeof showToast === 'function') showToast(t('no_selection'), 'error');
      return;
    }
    _openDeleteModal('partial');
  });

  // Delete all
  document.getElementById('histDeleteAllBtn')?.addEventListener('click', () => {
    _openDeleteModal('all');
  });

  // Modal close
  document.getElementById('histModalClose')?.addEventListener('click', _closeModal);
  document.getElementById('histModalOverlay')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('histModalOverlay')) _closeModal();
  });
}

// ─── Render de la tabla ───────────────────────────────────────────────────────
async function renderHistorial() {
  const tbody = document.getElementById('histTableBody');
  const emptyState = document.getElementById('histEmptyState');
  if (!tbody) return;

  tbody.innerHTML = `<tr class="hist-loading"><td colspan="7"><div class="hist-spinner"></div>${getLang() === 'en' ? 'Loading…' : 'Cargando…'}</td></tr>`;
  if (emptyState) emptyState.style.display = 'none';

  const logs = await _fetchLogs(_activeFilters);
  _currentLogs = logs;

  // Actualizar contadores en tabs
  const allLogs = await _fetchLogs({ tipo: 'all' });
  const sysCount  = allLogs.filter(l => l.tipo === 'sistema').length;
  const chatCount = allLogs.filter(l => l.tipo === 'chat').length;
  const el = (id) => document.getElementById(id);
  if (el('histCountAll'))  el('histCountAll').textContent  = allLogs.length;
  if (el('histCountSys'))  el('histCountSys').textContent  = sysCount;
  if (el('histCountChat')) el('histCountChat').textContent = chatCount;

  if (logs.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.style.display = 'flex';
    return;
  }

  tbody.innerHTML = logs.map(log => _renderRow(log)).join('');

  // Bind checkboxes de filas
  tbody.querySelectorAll('.hist-row-check').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = Number(e.target.dataset.id);
      const type = e.target.dataset.type;
      const key = `${type}_${id}`;
      if (e.target.checked) _selectedIds.add(key);
      else _selectedIds.delete(key);
      _updateSelectionBar();
    });
  });

  _updateSelectionBar();
}

function _renderRow(log) {
  const key = `${log.tipo}_${log.id}`;
  const isChecked = _selectedIds.has(key) ? 'checked' : '';
  const tipoBadge = log.tipo === 'sistema'
    ? `<span class="hist-badge hist-badge-sys">${t('badge_sys')}</span>`
    : `<span class="hist-badge hist-badge-chat">${t('badge_chat')}</span>`;

  const resultadoMap = {
    exito: `<span class="hist-result hist-result-exito">✓ ${t('res_exito')}</span>`,
    error: `<span class="hist-result hist-result-error">✗ ${t('res_error')}</span>`,
    advertencia: `<span class="hist-result hist-result-warn">⚠ ${t('res_advertencia')}</span>`,
    respondido: `<span class="hist-result hist-result-exito">💬 ${t('res_respondido')}</span>`,
    desconocido: `<span class="hist-result hist-result-warn">❓ ${t('res_desconocido')}</span>`,
  };

  const resultBadge = resultadoMap[log.resultado] || `<span class="hist-result">${log.resultado}</span>`;

  // Acción principal: para sistema = accion, para chat = consulta truncada
  const accionText = log.tipo === 'sistema'
    ? `<strong>${log.accion}</strong>`
    : `<span class="hist-query" title="${_escapeHtml(log.consulta || '')}">${_escapeHtml((log.consulta || '').substring(0, 60))}${(log.consulta || '').length > 60 ? '…' : ''}</span>`;

  // Detalles: para sistema = detalles JSON, para chat = respuesta truncada + modulo
  const detallesText = log.tipo === 'sistema'
    ? `<code class="hist-detail">${_escapeHtml(_prettifyDetails(log.detalles))}</code>`
    : `<span class="hist-response" title="${_escapeHtml(log.respuesta || '')}">${_escapeHtml((log.respuesta || '').substring(0, 50))}…</span>`;

  const moduloText = log.tipo === 'chat'
    ? `<span class="hist-module-tag">${log.modulo || '—'}</span>`
    : '—';

  return `
    <tr class="hist-row" data-id="${log.id}" data-type="${log.tipo}">
      <td class="col-check">
        <input type="checkbox" class="hist-row-check" data-id="${log.id}" data-type="${log.tipo}" ${isChecked}>
      </td>
      <td>${tipoBadge}</td>
      <td class="col-accion">${accionText}</td>
      <td class="col-usuario">${_escapeHtml(log.usuario || '—')}</td>
      <td>${resultBadge}</td>
      <td class="col-fecha">${formatFecha(log.fecha)}</td>
      <td class="col-detalles">${log.tipo === 'chat' ? `${moduloText} ${detallesText}` : detallesText}</td>
    </tr>
  `;
}

function _prettifyDetails(detJson) {
  try {
    const obj = JSON.parse(detJson || '{}');
    return Object.entries(obj).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(' | ') || '—';
  } catch {
    return detJson || '—';
  }
}

function _escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function _updateCheckboxes() {
  document.querySelectorAll('.hist-row-check').forEach(cb => {
    const key = `${cb.dataset.type}_${cb.dataset.id}`;
    cb.checked = _selectedIds.has(key);
  });
  const checkAll = document.getElementById('histCheckAll');
  if (checkAll) {
    checkAll.checked = _selectedIds.size > 0 && _selectedIds.size === _currentLogs.length;
    checkAll.indeterminate = _selectedIds.size > 0 && _selectedIds.size < _currentLogs.length;
  }
}

function _updateSelectionBar() {
  const bar = document.getElementById('histSelectionBar');
  const cnt = document.getElementById('histSelectionCount');
  const selBtn = document.getElementById('histSelectAllBtn');
  if (!bar) return;

  bar.style.display = _selectedIds.size > 0 ? 'flex' : 'none';
  if (cnt) {
    const lang = getLang();
    cnt.textContent = `${_selectedIds.size} ${t('records')} ${lang === 'en' ? 'selected' : 'seleccionados'}`;
  }
  if (selBtn) {
    selBtn.textContent = _selectedIds.size === _currentLogs.length ? t('deselect_all') : t('select_all');
  }
  _updateCheckboxes();
}

// ─── Modal de confirmación (3 pasos) ─────────────────────────────────────────
function _openDeleteModal(mode) {
  _deleteStep = 1;
  _pendingDeleteBody = { mode };

  const overlay = document.getElementById('histModalOverlay');
  const title   = document.getElementById('histModalTitle');
  if (!overlay || !title) return;

  title.textContent = mode === 'all' ? t('modal_title_all') : t('modal_title_partial');
  overlay.style.display = 'flex';
  _renderModalStep(mode);
}

function _closeModal() {
  _deleteStep = 0;
  _pendingDeleteBody = null;
  const overlay = document.getElementById('histModalOverlay');
  if (overlay) overlay.style.display = 'none';
}

function _renderModalStep(mode) {
  const body   = document.getElementById('histModalBody');
  const footer = document.getElementById('histModalFooter');
  if (!body || !footer) return;

  if (_deleteStep === 1) {
    // Paso 1: seleccionar qué borrar
    const options = mode === 'all'
      ? `
        <label class="hist-radio-opt"><input type="radio" name="delTipo" value="all" checked> ${t('modal_opt_all')}</label>
        <label class="hist-radio-opt"><input type="radio" name="delTipo" value="sistema"> ${t('modal_opt_sys')}</label>
        <label class="hist-radio-opt"><input type="radio" name="delTipo" value="chat"> ${t('modal_opt_chat')}</label>
      `
      : `<p>${t('btn_delete_partial')}: <strong>${_selectedIds.size} ${t('records')}</strong></p>`;

    body.innerHTML = `
      <p class="hist-modal-step-label">Paso 1 / 3 — ${t('modal_step1')}</p>
      <div class="hist-radio-group">${options}</div>
    `;

    footer.innerHTML = `
      <button class="hist-btn hist-btn-ghost" id="mBtnCancel">${t('modal_btn_cancel')}</button>
      <button class="hist-btn hist-btn-primary" id="mBtnNext">${t('modal_btn_next')}</button>
    `;

    document.getElementById('mBtnCancel')?.addEventListener('click', _closeModal);
    document.getElementById('mBtnNext')?.addEventListener('click', () => {
      if (mode === 'all') {
        const checked = document.querySelector('input[name="delTipo"]:checked');
        _pendingDeleteBody.tipo = checked?.value || 'all';
      } else {
        _pendingDeleteBody.tipo = 'partial';
        _pendingDeleteBody.ids = [..._selectedIds];
      }
      _deleteStep = 2;
      _renderModalStep(mode);
    });

  } else if (_deleteStep === 2) {
    // Paso 2: confirmación visual
    const tipoLabel = {
      all: t('modal_opt_all'), sistema: t('modal_opt_sys'),
      chat: t('modal_opt_chat'), partial: `${_selectedIds.size} ${t('records')}`,
    };

    body.innerHTML = `
      <p class="hist-modal-step-label">Paso 2 / 3 — ${t('modal_step2')}</p>
      <div class="hist-confirm-card">
        <div class="hist-confirm-icon">🗑️</div>
        <p><strong>${tipoLabel[_pendingDeleteBody?.tipo] || '—'}</strong></p>
        <p class="hist-confirm-warning">${getLang() === 'en' ? 'This action cannot be undone.' : 'Esta acción no se puede deshacer.'}</p>
      </div>
    `;

    footer.innerHTML = `
      <button class="hist-btn hist-btn-ghost" id="mBtnCancel">${t('modal_btn_cancel')}</button>
      <button class="hist-btn hist-btn-danger" id="mBtnConfirm">${t('modal_btn_confirm')}</button>
    `;

    document.getElementById('mBtnCancel')?.addEventListener('click', _closeModal);
    document.getElementById('mBtnConfirm')?.addEventListener('click', () => {
      _deleteStep = 3;
      _renderModalStep(mode);
    });

  } else if (_deleteStep === 3) {
    // Paso 3: código de confirmación
    body.innerHTML = `
      <p class="hist-modal-step-label">Paso 3 / 3 — ${t('modal_step3')}</p>
      <div class="hist-code-input-wrap">
        <input type="text" id="histConfirmCode" class="hist-code-input"
          placeholder="${t('modal_code_placeholder')}" autocomplete="off" maxlength="20">
        <p class="hist-code-error" id="histCodeError" style="display:none;">${t('modal_code_error')}</p>
      </div>
    `;

    footer.innerHTML = `
      <button class="hist-btn hist-btn-ghost" id="mBtnCancel">${t('modal_btn_cancel')}</button>
      <button class="hist-btn hist-btn-danger" id="mBtnDelete">${t('modal_btn_delete')}</button>
    `;

    document.getElementById('histConfirmCode')?.focus();
    document.getElementById('mBtnCancel')?.addEventListener('click', _closeModal);
    document.getElementById('mBtnDelete')?.addEventListener('click', () => {
      const code = document.getElementById('histConfirmCode')?.value?.trim();
      const errEl = document.getElementById('histCodeError');
      if (code !== CONFIRM_WORD) {
        if (errEl) errEl.style.display = 'block';
        document.getElementById('histConfirmCode')?.classList.add('hist-input-error');
        return;
      }
      _executeDelete();
    });

    // Enter key en el input
    document.getElementById('histConfirmCode')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('mBtnDelete')?.click();
    });
  }
}

// ─── Ejecución de la eliminación ─────────────────────────────────────────────
async function _executeDelete() {
  const btn = document.getElementById('mBtnDelete');
  if (btn) { btn.disabled = true; btn.textContent = t('deleting'); }

  const token = getToken();
  const body  = _pendingDeleteBody || {};
  let   url   = '/api/logs';
  let   reqBody = {};

  if (body.tipo === 'partial') {
    // Eliminar por IDs seleccionados — separar en sistema y chat
    const sysIds  = [..._selectedIds].filter(k => k.startsWith('sistema_')).map(k => Number(k.split('_')[1]));
    const chatIds = [..._selectedIds].filter(k => k.startsWith('chat_')).map(k => Number(k.split('_')[1]));
    reqBody = { tipo: 'all', ids: [...sysIds, ...chatIds] };
  } else if (body.tipo === 'all') {
    url = '/api/logs/all';
    reqBody = { confirmCode: CONFIRM_WORD };
  } else {
    reqBody = { tipo: body.tipo };
  }

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });

    const data = await res.json();
    _closeModal();

    if (res.ok && data.success) {
      _selectedIds.clear();
      // Limpiar cache local
      if (body.tipo === 'all') localStorage.removeItem('bankSecureHistory');

      if (typeof showToast === 'function') {
        const total = (data.eliminados?.sistema || 0) + (data.eliminados?.chat || 0);
        showToast(`${total} ${t('deleted_ok')}`, 'success');
      }
      renderHistorial();
    } else {
      if (typeof showToast === 'function') showToast(t('delete_error'), 'error');
    }
  } catch (err) {
    _closeModal();
    if (typeof showToast === 'function') showToast(t('delete_error'), 'error');
    console.error('[historial] Error al eliminar:', err);
  }
}

// ─── API pública global ───────────────────────────────────────────────────────
window.registrarAccion   = registrarAccion;
window.registrarChat     = registrarChat;
window.initHistorialView = initHistorialView;
window.renderHistorial   = renderHistorial;
