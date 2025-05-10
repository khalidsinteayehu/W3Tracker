/* File: /js/lib/history-manager.js */

const HistoryManager = (() => { const STORAGE_KEY = 'w3drop_history_v1';

let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function addSnapshot(snapshot) { const timestamp = new Date().toISOString(); history.push({ timestamp, snapshot }); localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); }

function getHistory() { return history; }

function clearHistory() { history = []; localStorage.removeItem(STORAGE_KEY); }

function getLatestSnapshot() { if (history.length === 0) return null; return history[history.length - 1]; }

function restoreSnapshot(index) { const entry = history[index]; return entry ? entry.snapshot : null; }

return { addSnapshot, getHistory, clearHistory, getLatestSnapshot, restoreSnapshot, }; })();

export default HistoryManager;

