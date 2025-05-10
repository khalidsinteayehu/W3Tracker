// Project: W3Drop Manual Web3 Quest Tracker // Filename: /js/app.js

import { generateAnalytics } from './modules/analytics.js'; import { parseCSV, exportCSV } from './lib/csv-parser.js'; import { HistoryManager } from './lib/history-manager.js';

const state = { projects: [], backups: [], filters: {}, sortKey: 'date', theme: localStorage.getItem('theme') || 'light', };

// Initialization init();

function init() { loadFromStorage(); bindUI(); applyTheme(); HistoryManager.init(); generateAnalytics(state.projects); }

function bindUI() { document.addEventListener('keydown', e => { if (e.ctrlKey && e.key === 'q') { e.preventDefault(); quickAddProject(); } });

document.getElementById('themeToggle').addEventListener('click', toggleTheme); document.getElementById('exportCSV').addEventListener('click', () => exportCSV(state.projects)); document.getElementById('importCSV').addEventListener('change', handleCSVImport); }

function quickAddProject() { const name = prompt('Enter project name:'); if (!name || state.projects.find(p => p.name === name)) return; const newProject = { id: Date.now(), name, tasks: [], created: new Date().toISOString() }; state.projects.push(newProject); saveToStorage(); renderProjects(); HistoryManager.record('add', newProject); }

function toggleTheme() { state.theme = state.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', state.theme); applyTheme(); }

function applyTheme() { document.documentElement.setAttribute('data-theme', state.theme); }

function loadFromStorage() { try { const saved = JSON.parse(localStorage.getItem('projects')); state.projects = Array.isArray(saved) ? saved : []; } catch (e) { state.projects = []; } }

function saveToStorage() { localStorage.setItem('projects', JSON.stringify(state.projects)); backupData(); }

function backupData() { const backup = { timestamp: new Date().toISOString(), data: [...state.projects], }; state.backups.push(backup); if (state.backups.length > 10) state.backups.shift(); localStorage.setItem('backups', JSON.stringify(state.backups)); }

function handleCSVImport(e) { const file = e.target.files[0]; if (!file) return;

const worker = new Worker('js/lib/csv-worker.js'); worker.postMessage(file); worker.onmessage = e => { const imported = e.data; state.projects = [...state.projects, ...imported]; saveToStorage(); renderProjects(); worker.terminate(); }; }

function renderProjects() { // Placeholder - implement DOM updates }

