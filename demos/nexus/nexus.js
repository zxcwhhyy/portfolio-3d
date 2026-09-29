// Nexus Dashboard & AI Analytics Engine
import '../../src/style.css';

document.addEventListener('DOMContentLoaded', () => {
  // State
  let isPaused = false;
  let isLoadSpike = false;
  let activeFilter = 'all';
  let baseRps = 14800;
  let baseLatency = 16.8;
  let baseCpu = 24.2;

  const maxPoints = 35;
  const historyPoints = [];

  // Initialize initial points
  for (let i = 0; i < maxPoints; i++) {
    historyPoints.push({
      rps: baseRps + (Math.random() - 0.5) * 1200,
      latency: baseLatency + (Math.random() - 0.5) * 3,
      time: new Date(Date.now() - (maxPoints - i) * 1250)
    });
  }

  // DOM elements
  const canvas = document.getElementById('telemetry-chart');
  const ctx = canvas.getContext('2d');
  const tooltip = document.getElementById('chart-tooltip');

  const metricRps = document.getElementById('metric-rps');
  const metricLatency = document.getElementById('metric-latency');
  const metricCpu = document.getElementById('metric-cpu');
  const cpuBar = document.getElementById('cpu-bar');
  const metricCache = document.getElementById('metric-cache');
  const liveClock = document.getElementById('live-clock');
  const streamStatus = document.getElementById('stream-status');
  const requestTbody = document.getElementById('request-log-tbody');
  const aiFeed = document.getElementById('ai-insights-feed');

  const btnLoadSpike = document.getElementById('btn-load-spike');
  const btnPauseStream = document.getElementById('btn-pause-stream');
  const regionSelect = document.getElementById('region-select');

  // Resize canvas for high resolution
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    drawChart();
  });
  resizeCanvas();

  // Clock
  function updateClock() {
    const now = new Date();
    liveClock.textContent = now.toTimeString().split(' ')[0];
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Draw Rolling Telemetry Chart
  function drawChart() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    // Draw Background Grid
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.08)';
    ctx.lineWidth = 1;

    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    for (let x = 0; x < w; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    if (historyPoints.length < 2) return;

    // Calculate Y scale
    const minRps = Math.min(...historyPoints.map(p => p.rps)) * 0.85;
    const maxRps = Math.max(...historyPoints.map(p => p.rps)) * 1.15;

    function getX(index) {
      return (index / (historyPoints.length - 1)) * w;
    }

    function getY(val) {
      return h - ((val - minRps) / (maxRps - minRps)) * (h - 20) - 10;
    }

    // 1. Draw Area Fill (Amber gradient)
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(245, 158, 11, 0.25)');
    grad.addColorStop(1, 'rgba(245, 158, 11, 0.0)');

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(historyPoints[0].rps));

    for (let i = 1; i < historyPoints.length; i++) {
      const prevX = getX(i - 1);
      const prevY = getY(historyPoints[i - 1].rps);
      const curX = getX(i);
      const curY = getY(historyPoints[i].rps);
      const cpX = (prevX + curX) / 2;
      ctx.bezierCurveTo(cpX, prevY, cpX, curY, curX, curY);
    }

    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // 2. Draw Stroke Line
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(historyPoints[0].rps));

    for (let i = 1; i < historyPoints.length; i++) {
      const prevX = getX(i - 1);
      const prevY = getY(historyPoints[i - 1].rps);
      const curX = getX(i);
      const curY = getY(historyPoints[i].rps);
      const cpX = (prevX + curX) / 2;
      ctx.bezierCurveTo(cpX, prevY, cpX, curY, curX, curY);
    }

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(245, 158, 11, 0.5)';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    // 3. Draw latest point pulse
    const lastX = getX(historyPoints.length - 1);
    const lastY = getY(historyPoints[historyPoints.length - 1].rps);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 7, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Hover Tooltip tracking on chart
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratio = mouseX / rect.width;
    const index = Math.min(
      historyPoints.length - 1,
      Math.max(0, Math.floor(ratio * historyPoints.length))
    );
    const point = historyPoints[index];
    if (point) {
      tooltip.textContent = `${Math.round(point.rps).toLocaleString()} req/s • ${point.latency.toFixed(1)} ms • ${point.time.toLocaleTimeString()}`;
    }
  });

  canvas.addEventListener('mouseleave', () => {
    tooltip.textContent = 'Hover graph to inspect point';
  });

  // Endpoints and Methods Pool for live stream
  const endpoints = [
    { path: '/api/v2/analytics/telemetry', method: 'GET' },
    { path: '/api/auth/oauth2/token', method: 'POST' },
    { path: '/api/orders/checkout', method: 'POST' },
    { path: '/ws/client/subscriptions', method: 'GET' },
    { path: '/api/models/predict', method: 'POST' },
    { path: '/api/users/settings', method: 'PUT' },
    { path: '/api/cache/cluster/flush', method: 'DELETE' }
  ];

  const regions = ['us-east-1', 'eu-central-1', 'ap-northeast-1', 'sa-east-1'];

  function generateRequest() {
    const ep = endpoints[Math.floor(Math.random() * endpoints.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];

    let status = 200;
    const rand = Math.random();

    if (isLoadSpike) {
      if (rand > 0.85) status = 500;
      else if (rand > 0.70) status = 429;
      else status = 200;
    } else {
      if (rand > 0.96) status = 500;
      else if (rand > 0.90) status = 404;
      else if (rand > 0.82) status = 201;
      else status = 200;
    }

    const latency = isLoadSpike
      ? Math.floor(Math.random() * 85 + 40)
      : Math.floor(Math.random() * 22 + 8);

    return {
      method: ep.method,
      endpoint: ep.path,
      status: status,
      latency: latency,
      region: region,
      time: new Date().toLocaleTimeString()
    };
  }

  function addRequestToTable(req) {
    // Check filter
    if (activeFilter !== 'all') {
      const prefix = activeFilter[0]; // '2', '4', or '5'
      if (!req.status.toString().startsWith(prefix)) {
        return;
      }
    }

    const tr = document.createElement('tr');
    tr.className = 'border-b border-amber-900/10 hover:bg-amber-950/20 transition-colors animate-fade-in';

    let statusBadge = '';
    if (req.status >= 200 && req.status < 300) {
      statusBadge = `<span class="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">${req.status} OK</span>`;
    } else if (req.status >= 400 && req.status < 500) {
      statusBadge = `<span class="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">${req.status} REQ</span>`;
    } else {
      statusBadge = `<span class="px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-500/30 font-bold">${req.status} ERR</span>`;
    }

    let methodColor = 'text-amber-400';
    if (req.method === 'POST') methodColor = 'text-blue-400';
    if (req.method === 'PUT') methodColor = 'text-purple-400';
    if (req.method === 'DELETE') methodColor = 'text-red-400';

    tr.innerHTML = `
      <td class="py-2 px-3 font-bold ${methodColor}">${req.method}</td>
      <td class="py-2 px-3 text-stone-200 truncate max-w-[180px] sm:max-w-xs">${req.endpoint}</td>
      <td class="py-2 px-3">${statusBadge}</td>
      <td class="py-2 px-3 text-stone-300">${req.latency}ms</td>
      <td class="py-2 px-3 text-stone-400">${req.region}</td>
      <td class="py-2 px-3 text-right text-stone-400">${req.time}</td>
    `;

    requestTbody.insertBefore(tr, requestTbody.firstChild);

    // Keep max 20 rows
    while (requestTbody.children.length > 20) {
      requestTbody.removeChild(requestTbody.lastChild);
    }
  }

  // Prepopulate initial requests
  for (let i = 0; i < 8; i++) {
    addRequestToTable(generateRequest());
  }

  // Live Simulation Interval
  function tick() {
    if (isPaused) return;

    // Calculate next values
    let targetRps = baseRps + (Math.random() - 0.5) * 1400;
    let targetLatency = baseLatency + (Math.random() - 0.5) * 2.5;
    let targetCpu = baseCpu + (Math.random() - 0.5) * 3;

    if (isLoadSpike) {
      targetRps = 48500 + Math.random() * 6000;
      targetLatency = 72 + Math.random() * 25;
      targetCpu = 84 + Math.random() * 10;
    }

    // Add to history
    historyPoints.push({
      rps: targetRps,
      latency: targetLatency,
      time: new Date()
    });

    if (historyPoints.length > maxPoints) {
      historyPoints.shift();
    }

    // Update Metrics in DOM
    metricRps.textContent = Math.round(targetRps).toLocaleString();
    metricLatency.textContent = `${targetLatency.toFixed(1)} ms`;
    metricCpu.textContent = `${targetCpu.toFixed(1)}%`;
    cpuBar.style.width = `${Math.min(100, targetCpu)}%`;

    if (targetCpu > 75) {
      cpuBar.className = 'bg-gradient-to-r from-red-500 to-amber-500 h-full transition-all duration-500';
    } else {
      cpuBar.className = 'bg-gradient-to-r from-emerald-400 to-amber-400 h-full transition-all duration-500';
    }

    metricCache.textContent = `${(98.4 + (Math.random() - 0.5) * 0.4).toFixed(1)}%`;

    // Redraw graph
    drawChart();

    // Generate and insert 1-2 new requests
    addRequestToTable(generateRequest());
    if (isLoadSpike) {
      addRequestToTable(generateRequest());
    }
  }

  const intervalId = setInterval(tick, 1200);

  // Load Spike Simulator
  btnLoadSpike.addEventListener('click', () => {
    if (isLoadSpike) return;
    isLoadSpike = true;
    btnLoadSpike.classList.add('animate-pulse', 'from-red-600', 'to-amber-600');
    btnLoadSpike.textContent = 'Spike in Progress ⚡';

    // Post Alert to AI Feed
    const alertDiv = document.createElement('div');
    alertDiv.className = 'p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs space-y-1 animate-fade-in';
    alertDiv.innerHTML = `
      <div class="flex items-center justify-between text-red-400 font-mono text-[11px] font-bold">
        <span>🚨 ANOMALY_SURGE_DETECTED</span>
        <span>Just now</span>
      </div>
      <div class="text-stone-200">Traffic spiked to 48,000+ RPS. Auto-scaling 4 additional server instances in EU-Central.</div>
    `;
    aiFeed.insertBefore(alertDiv, aiFeed.firstChild);

    // Restore after 6 seconds
    setTimeout(() => {
      isLoadSpike = false;
      btnLoadSpike.classList.remove('animate-pulse', 'from-red-600', 'to-amber-600');
      btnLoadSpike.textContent = 'Trigger Load Spike ⚡';

      const recoveryDiv = document.createElement('div');
      recoveryDiv.className = 'p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs space-y-1 animate-fade-in';
      recoveryDiv.innerHTML = `
        <div class="flex items-center justify-between text-emerald-400 font-mono text-[11px] font-bold">
          <span>✅ SURGE_RESOLVED</span>
          <span>Just now</span>
        </div>
        <div class="text-stone-200">Elastic cluster scaled to 12 nodes. Average latency normalized to 17.2ms.</div>
      `;
      aiFeed.insertBefore(recoveryDiv, aiFeed.firstChild);

      // Keep max 5 items in AI feed
      while (aiFeed.children.length > 5) {
        aiFeed.removeChild(aiFeed.lastChild);
      }
    }, 6000);
  });

  // Pause / Resume Stream
  btnPauseStream.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
      btnPauseStream.textContent = 'Resume ▶';
      btnPauseStream.classList.add('text-amber-400', 'border-amber-400');
      streamStatus.textContent = 'WSS: PAUSED';
      streamStatus.previousElementSibling.classList.replace('bg-emerald-400', 'bg-amber-400');
    } else {
      btnPauseStream.textContent = 'Pause ⏸';
      btnPauseStream.classList.remove('text-amber-400', 'border-amber-400');
      streamStatus.textContent = 'WSS: CONNECTED';
      streamStatus.previousElementSibling.classList.replace('bg-amber-400', 'bg-emerald-400');
    }
  });

  // Filter Buttons
  document.querySelectorAll('.log-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.log-filter-btn').forEach(b => {
        b.className = 'log-filter-btn px-2.5 py-1 rounded-lg bg-[#1a120c] hover:bg-[#2b1c12] text-stone-300';
      });
      const target = e.currentTarget;
      target.className = 'log-filter-btn px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-bold';
      activeFilter = target.getAttribute('data-filter');
    });
  });

  // Region switch simulation
  regionSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'us-east') {
      baseLatency = 14.2;
      baseRps = 16200;
    } else if (val === 'eu-central') {
      baseLatency = 18.6;
      baseRps = 14800;
    } else {
      baseLatency = 38.1;
      baseRps = 11400;
    }
  });
});
