// ── File Upload Logic ──
const dropZone    = document.getElementById('dropZone');
const fileInput   = document.getElementById('fileInput');
const previewSec  = document.getElementById('previewSection');
const previewImg  = document.getElementById('previewImg');
const loadingSt   = document.getElementById('loadingState');
const resultSt    = document.getElementById('resultState');
const analyzeBtn  = document.getElementById('analyzeBtn');
const clearBtn    = document.getElementById('clearBtn');
const resetBtn    = document.getElementById('resetBtn');
let currentFile   = null;
let history       = [];

dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => {
  e.preventDefault(); dropZone.classList.remove('drag-over');
  const f = e.dataTransfer.files[0];
  if (f && f.type.startsWith('image/')) loadPreview(f);
});
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => { if(fileInput.files[0]) loadPreview(fileInput.files[0]); });

function loadPreview(file) {
  currentFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    previewImg.src = e.target.result;
    dropZone.style.display = 'none';
    previewSec.style.display = 'block';
    resultSt.style.display = 'none';
    loadingSt.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

clearBtn.addEventListener('click', resetAll);
resetBtn.addEventListener('click', resetAll);
function resetAll() {
  currentFile = null; fileInput.value = '';
  dropZone.style.display = 'block';
  previewSec.style.display = 'none';
  loadingSt.style.display = 'none';
  resultSt.style.display = 'none';
}

analyzeBtn.addEventListener('click', () => {
  previewSec.style.display = 'none';
  loadingSt.style.display = 'block';
  setTimeout(() => {
    loadingSt.style.display = 'none';
    showResult();
  }, 2400);
});

function showResult() {
  const isReal = Math.random() > 0.45;
  const conf   = (Math.random() * 25 + 70).toFixed(1);
  const realP  = isReal ? parseFloat(conf) : (100 - parseFloat(conf)).toFixed(1);
  const fakeP  = isReal ? (100 - parseFloat(conf)).toFixed(1) : parseFloat(conf);

  const badge = document.getElementById('resultBadge');
  badge.className = 'result-badge ' + (isReal ? 'real' : 'fake');
  badge.innerHTML = isReal ? '🟢 Real Image' : '🔴 AI-Generated Image';

  document.getElementById('confPct').textContent = conf + '%';
  document.getElementById('realPct').textContent = realP + '%';
  document.getElementById('fakePct').textContent = fakeP + '%';

  resultSt.style.display = 'block';
  setTimeout(() => {
    document.getElementById('barReal').style.width = realP + '%';
    document.getElementById('barFake').style.width = fakeP + '%';
  }, 100);

  const now = new Date();
  document.getElementById('resultTimestamp').textContent = 'Analyzed at: ' + now.toLocaleString();

  // Add to history
  if (currentFile) {
    history.unshift({ name: currentFile.name, result: isReal ? 'Real' : 'AI Generated', conf: conf + '%', time: now.toLocaleString() });
    renderHistory();
  }
}

function renderHistory() {
  const tbody = document.getElementById('historyBody');
  if (!history.length) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:30px">No history yet.</td></tr>';
    return;
  }
  tbody.innerHTML = history.map(h => `
    <tr>
      <td style="color:var(--text)">${h.name}</td>
      <td><span class="${h.result === 'Real' ? 'badge-real' : 'badge-fake'}">${h.result}</span></td>
      <td style="font-family:'JetBrains Mono',monospace">${h.conf}</td>
      <td>${h.time}</td>
    </tr>`).join('');
}

document.getElementById('clearHistBtn').addEventListener('click', () => {
  history = []; renderHistory();
});

// ── Grad-CAM toggle ──
function toggleView(btn, view) {
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── Scroll animations ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Nav active link ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});
