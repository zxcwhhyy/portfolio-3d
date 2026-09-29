import confetti from 'canvas-confetti';
import '../../src/style.css';

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------
  // 0. TOAST NOTIFICATION SYSTEM
  // -------------------------------------------------------------------
  function showToast(message, icon = '💎') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg flex items-center gap-2.5';
    toast.innerHTML = `<span class="text-base flex-shrink-0">${icon}</span><span class="leading-tight">${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // -------------------------------------------------------------------
  // 1. STATE & MULTI-CURRENCY CONVERSION SYSTEM
  // -------------------------------------------------------------------
  let currentCurrency = 'USD';
  const currencyRates = {
    USD: { rate: 1.00, symbol: '$', code: 'USD' },
    EUR: { rate: 0.92, symbol: '€', code: 'EUR' },
    GBP: { rate: 0.79, symbol: '£', code: 'GBP' }
  };

  // Base raw USD values
  let baseWealth = {
    total: 248650.80,
    cash: 52340.00,
    crypto: 84190.50,
    equities: 112120.30
  };

  function formatMoney(amount, currency = currentCurrency) {
    const { rate, symbol } = currencyRates[currency];
    const converted = amount * rate;
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function updateAllCurrencyDisplays() {
    const { symbol } = currencyRates[currentCurrency];

    document.getElementById('metric-total-wealth').textContent = formatMoney(baseWealth.total);
    document.getElementById('metric-cash-wealth').textContent = formatMoney(baseWealth.cash);
    document.getElementById('metric-crypto-wealth').textContent = formatMoney(baseWealth.crypto);
    document.getElementById('metric-equities-wealth').textContent = formatMoney(baseWealth.equities);

    const centerEl = document.getElementById('donut-center-total');
    if (centerEl && !hoveredSegment) {
      centerEl.textContent = `${symbol}${(baseWealth.total * currencyRates[currentCurrency].rate / 1000).toFixed(1)}K`;
      centerEl.style.color = '#f7f1eb';
    }

    document.getElementById('alloc-val-equities').textContent = formatMoney(baseWealth.equities);
    document.getElementById('alloc-val-crypto').textContent = formatMoney(baseWealth.crypto);
    document.getElementById('alloc-val-cash').textContent = formatMoney(baseWealth.cash);

    const currLabel = document.getElementById('transfer-currency-label');
    if (currLabel) currLabel.textContent = currentCurrency;

    renderPerformanceChart();
    renderDonutChart();
    renderLedger();
    renderMarketWatchlist();
    renderAllSparklines();
    updateTransferFxPreview();
  }

  // Currency Selector Buttons
  document.querySelectorAll('.currency-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.currency-toggle-btn').forEach(b => {
        b.classList.remove('bg-amber-500', 'text-stone-950', 'font-bold');
        b.classList.add('text-stone-400');
      });
      const target = e.currentTarget;
      target.classList.remove('text-stone-400');
      target.classList.add('bg-amber-500', 'text-stone-950', 'font-bold');

      currentCurrency = target.getAttribute('data-currency');
      updateAllCurrencyDisplays();
      showToast(`Base valuation switched to ${currentCurrency} (${currencyRates[currentCurrency].symbol})`, '💱');
    });
  });

  // -------------------------------------------------------------------
  // 2. AMBIENT LUXURY PARTICLES & LIGHT FIELD
  // -------------------------------------------------------------------
  const ambientCanvas = document.getElementById('finflow-ambient-canvas');
  if (ambientCanvas) {
    const actx = ambientCanvas.getContext('2d');
    let aw = ambientCanvas.width = window.innerWidth;
    let ah = ambientCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      aw = ambientCanvas.width = window.innerWidth;
      ah = ambientCanvas.height = window.innerHeight;
    });

    let mousePos = { x: aw / 2, y: ah / 2 };
    window.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    const particles = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * aw,
        y: Math.random() * ah,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.35 + 0.15
      });
    }

    function animateAmbient() {
      actx.clearRect(0, 0, aw, ah);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            actx.strokeStyle = `rgba(217, 119, 6, ${0.07 * (1 - dist / 110)})`;
            actx.lineWidth = 0.7;
            actx.beginPath();
            actx.moveTo(particles[i].x, particles[i].y);
            actx.lineTo(particles[j].x, particles[j].y);
            actx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Soft cursor parallax
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.x += (dx / dist) * 0.15;
          p.y += (dy / dist) * 0.15;
        }

        if (p.x < 0) p.x = aw;
        if (p.x > aw) p.x = 0;
        if (p.y < 0) p.y = ah;
        if (p.y > ah) p.y = 0;

        actx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
        actx.beginPath();
        actx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        actx.fill();
      });

      requestAnimationFrame(animateAmbient);
    }
    animateAmbient();
  }

  // -------------------------------------------------------------------
  // 3. MINI SPARKLINES FOR HERO METRIC CARDS
  // -------------------------------------------------------------------
  function drawSparkline(canvasId, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = 90;
    const h = 34;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = (max - min) || 1;
    const padY = 5;
    const padX = 4;
    const plotW = w - padX * 2;
    const plotH = h - padY * 2;

    const points = data.map((val, idx) => ({
      x: padX + (plotW / (data.length - 1)) * idx,
      y: padY + plotH - ((val - min) / range) * plotH
    }));

    // Area fill gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, color.replace(')', ', 0.28)').replace('rgb', 'rgba'));
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(points[points.length - 1].x, h);
    ctx.lineTo(points[0].x, h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line curve
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Glowing tip
    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function renderAllSparklines() {
    drawSparkline('sparkline-total', [210, 214, 212, 219, 225, 222, 230, 234, 239, 243, 245, 248.6], 'rgb(245, 158, 11)');
    drawSparkline('sparkline-cash', [50.1, 50.4, 50.8, 51.2, 51.5, 51.8, 52.0, 52.1, 52.2, 52.28, 52.32, 52.34], 'rgb(16, 185, 129)');
    drawSparkline('sparkline-crypto', [62, 58, 67, 72, 69, 74, 71, 79, 76, 81, 78, 84.19], 'rgb(6, 182, 212)');
    drawSparkline('sparkline-equities', [92, 94, 95, 98, 100, 103, 102, 106, 108, 109, 110, 112.12], 'rgb(168, 85, 247)');
  }

  // Clicking hero cards filters ledger
  document.getElementById('hero-card-crypto')?.addEventListener('click', () => {
    document.querySelector('.tx-filter-btn[data-filter="crypto"]')?.click();
    showToast('Filtered ledger by Digital Assets', '₿');
  });
  document.getElementById('hero-card-equities')?.addEventListener('click', () => {
    document.querySelector('.tx-filter-btn[data-filter="dividend"]')?.click();
    showToast('Filtered ledger by Equities & Dividends', '📈');
  });
  document.getElementById('hero-card-cash')?.addEventListener('click', () => {
    document.querySelector('.tx-filter-btn[data-filter="transfer"]')?.click();
    showToast('Filtered ledger by Transfers & Yield', '🏦');
  });
  document.getElementById('hero-card-total')?.addEventListener('click', () => {
    document.querySelector('.tx-filter-btn[data-filter="all"]')?.click();
    showToast('Showing all portfolio transactions', '💎');
  });

  // -------------------------------------------------------------------
  // 4. INTERACTIVE PORTFOLIO PERFORMANCE CANVAS CHART
  // -------------------------------------------------------------------
  const chartCanvas = document.getElementById('performance-chart-canvas');
  const chartCtx = chartCanvas.getContext('2d');
  const tooltip = document.getElementById('chart-tooltip');
  const tooltipDate = document.getElementById('tooltip-date');
  const tooltipVal = document.getElementById('tooltip-val');
  const tooltipGain = document.getElementById('tooltip-gain');

  let currentRange = '1Y';
  let benchmarkSP500 = false;
  let benchmarkBTC = false;
  let livePulseActive = true;
  let radarRadius = 0;

  const chartDatasets = {
    '1D': [
      { label: '09:00', val: 247800, sp: 247500, btc: 246900 },
      { label: '11:00', val: 248100, sp: 247700, btc: 247400 },
      { label: '13:00', val: 247950, sp: 247900, btc: 247100 },
      { label: '15:00', val: 248400, sp: 248100, btc: 247900 },
      { label: '17:00', val: 248650, sp: 248300, btc: 248500 }
    ],
    '1W': [
      { label: 'Mon', val: 244200, sp: 244500, btc: 241000 },
      { label: 'Tue', val: 245100, sp: 244900, btc: 243200 },
      { label: 'Wed', val: 244800, sp: 245200, btc: 242800 },
      { label: 'Thu', val: 246900, sp: 245800, btc: 245100 },
      { label: 'Fri', val: 247500, sp: 246400, btc: 246000 },
      { label: 'Sat', val: 248100, sp: 246400, btc: 247400 },
      { label: 'Sun', val: 248650, sp: 246400, btc: 248650 }
    ],
    '1M': [
      { label: 'Week 1', val: 236000, sp: 238000, btc: 228000 },
      { label: 'Week 2', val: 239400, sp: 241000, btc: 234000 },
      { label: 'Week 3', val: 243200, sp: 243500, btc: 240000 },
      { label: 'Week 4', val: 248650, sp: 246000, btc: 248650 }
    ],
    '1Y': [
      { label: 'Jan', val: 210030, sp: 214000, btc: 185000 },
      { label: 'Mar', val: 216400, sp: 220000, btc: 198000 },
      { label: 'May', val: 224800, sp: 226000, btc: 212000 },
      { label: 'Jul', val: 231500, sp: 231000, btc: 222000 },
      { label: 'Sep', val: 238200, sp: 237000, btc: 231000 },
      { label: 'Nov', val: 244100, sp: 242000, btc: 241000 },
      { label: 'Now', val: 248650, sp: 246000, btc: 248650 }
    ],
    'ALL': [
      { label: '2022', val: 145000, sp: 160000, btc: 110000 },
      { label: '2023', val: 182000, sp: 188000, btc: 145000 },
      { label: '2024', val: 218000, sp: 215000, btc: 195000 },
      { label: '2025', val: 239000, sp: 234000, btc: 225000 },
      { label: '2026', val: 248650, sp: 246000, btc: 248650 }
    ]
  };

  let chartPoints = [];
  let currentHoverX = null;

  function resizeChartCanvas() {
    if (!chartCanvas || !chartCanvas.parentElement) return;
    const rect = chartCanvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    chartCanvas.width = rect.width * dpr;
    chartCanvas.height = rect.height * dpr;
    chartCtx.resetTransform();
    chartCtx.scale(dpr, dpr);
    renderPerformanceChart();
  }

  function renderPerformanceChart() {
    const rawData = chartDatasets[currentRange] || chartDatasets['1Y'];
    const { rate, symbol } = currencyRates[currentCurrency];
    const data = rawData.map(d => ({
      label: d.label,
      val: d.val * rate,
      sp: (d.sp || d.val * 0.98) * rate,
      btc: (d.btc || d.val * 0.94) * rate
    }));

    const rect = chartCanvas.parentElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    chartCtx.clearRect(0, 0, width, height);

    const padLeft = 50;
    const padRight = 30;
    const padTop = 30;
    const padBottom = 35;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    // Determine scale limits across all visible series
    let allVals = data.map(d => d.val);
    if (benchmarkSP500) allVals = allVals.concat(data.map(d => d.sp));
    if (benchmarkBTC) allVals = allVals.concat(data.map(d => d.btc));

    const minVal = Math.min(...allVals) * 0.98;
    const maxVal = Math.max(...allVals) * 1.02;

    // 1. Horizontal Grid Lines & Y-Axis Labels
    chartCtx.strokeStyle = 'rgba(217, 119, 6, 0.08)';
    chartCtx.lineWidth = 1;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = padTop + (plotH / gridLines) * i;
      chartCtx.beginPath();
      chartCtx.moveTo(padLeft, y);
      chartCtx.lineTo(width - padRight, y);
      chartCtx.stroke();

      const gridVal = maxVal - ((maxVal - minVal) / gridLines) * i;
      chartCtx.font = '10px "Fira Code", monospace';
      chartCtx.fillStyle = 'rgba(168, 162, 158, 0.55)';
      chartCtx.textAlign = 'right';
      chartCtx.fillText(`${symbol}${(gridVal / 1000).toFixed(0)}k`, padLeft - 8, y + 3);
    }

    // 2. Compute Primary Coordinate Points
    chartPoints = data.map((d, idx) => {
      const x = padLeft + (plotW / (data.length - 1)) * idx;
      const y = padTop + plotH - ((d.val - minVal) / (maxVal - minVal)) * plotH;
      return { x, y, data: d };
    });

    // 3. Render Benchmark: S&P 500 (Dashed Purple)
    if (benchmarkSP500) {
      const spPoints = data.map((d, idx) => ({
        x: padLeft + (plotW / (data.length - 1)) * idx,
        y: padTop + plotH - ((d.sp - minVal) / (maxVal - minVal)) * plotH
      }));

      chartCtx.save();
      chartCtx.setLineDash([5, 5]);
      chartCtx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
      chartCtx.lineWidth = 1.8;
      chartCtx.beginPath();
      chartCtx.moveTo(spPoints[0].x, spPoints[0].y);
      for (let i = 0; i < spPoints.length - 1; i++) {
        const cx = (spPoints[i].x + spPoints[i + 1].x) / 2;
        chartCtx.bezierCurveTo(cx, spPoints[i].y, cx, spPoints[i + 1].y, spPoints[i + 1].x, spPoints[i + 1].y);
      }
      chartCtx.stroke();

      // Label at end
      const lastSp = spPoints[spPoints.length - 1];
      chartCtx.fillStyle = '#c084fc';
      chartCtx.font = '9px "Fira Code", monospace';
      chartCtx.textAlign = 'right';
      chartCtx.fillText('S&P 500', width - padRight, lastSp.y - 6);
      chartCtx.restore();
    }

    // 4. Render Benchmark: Bitcoin (Dotted Cyan)
    if (benchmarkBTC) {
      const btcPoints = data.map((d, idx) => ({
        x: padLeft + (plotW / (data.length - 1)) * idx,
        y: padTop + plotH - ((d.btc - minVal) / (maxVal - minVal)) * plotH
      }));

      chartCtx.save();
      chartCtx.setLineDash([3, 4]);
      chartCtx.strokeStyle = 'rgba(6, 182, 212, 0.75)';
      chartCtx.lineWidth = 1.8;
      chartCtx.beginPath();
      chartCtx.moveTo(btcPoints[0].x, btcPoints[0].y);
      for (let i = 0; i < btcPoints.length - 1; i++) {
        const cx = (btcPoints[i].x + btcPoints[i + 1].x) / 2;
        chartCtx.bezierCurveTo(cx, btcPoints[i].y, cx, btcPoints[i + 1].y, btcPoints[i + 1].x, btcPoints[i + 1].y);
      }
      chartCtx.stroke();

      // Label at end
      const lastBtc = btcPoints[btcPoints.length - 1];
      chartCtx.fillStyle = '#22d3ee';
      chartCtx.font = '9px "Fira Code", monospace';
      chartCtx.textAlign = 'right';
      chartCtx.fillText('BTC', width - padRight, lastBtc.y - 6);
      chartCtx.restore();
    }

    // 5. Fill Primary Gradient Under Curve
    const fillGrad = chartCtx.createLinearGradient(0, padTop, 0, height - padBottom);
    fillGrad.addColorStop(0, 'rgba(245, 158, 11, 0.32)');
    fillGrad.addColorStop(0.6, 'rgba(217, 119, 6, 0.08)');
    fillGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    chartCtx.beginPath();
    chartCtx.moveTo(chartPoints[0].x, chartPoints[0].y);
    for (let i = 0; i < chartPoints.length - 1; i++) {
      const p0 = chartPoints[i];
      const p1 = chartPoints[i + 1];
      const cx = (p0.x + p1.x) / 2;
      chartCtx.bezierCurveTo(cx, p0.y, cx, p1.y, p1.x, p1.y);
    }
    chartCtx.lineTo(chartPoints[chartPoints.length - 1].x, height - padBottom);
    chartCtx.lineTo(chartPoints[0].x, height - padBottom);
    chartCtx.closePath();
    chartCtx.fillStyle = fillGrad;
    chartCtx.fill();

    // 6. Stroke Glowing Bézier Line
    chartCtx.beginPath();
    chartCtx.moveTo(chartPoints[0].x, chartPoints[0].y);
    for (let i = 0; i < chartPoints.length - 1; i++) {
      const p0 = chartPoints[i];
      const p1 = chartPoints[i + 1];
      const cx = (p0.x + p1.x) / 2;
      chartCtx.bezierCurveTo(cx, p0.y, cx, p1.y, p1.x, p1.y);
    }
    chartCtx.strokeStyle = '#f59e0b';
    chartCtx.lineWidth = 2.8;
    chartCtx.shadowColor = 'rgba(245, 158, 11, 0.7)';
    chartCtx.shadowBlur = 12;
    chartCtx.stroke();
    chartCtx.shadowBlur = 0;

    // 7. X-Axis Time Labels
    chartCtx.fillStyle = 'rgba(168, 162, 158, 0.7)';
    chartCtx.textAlign = 'center';
    chartCtx.font = '10px "Fira Code", monospace';
    chartPoints.forEach(p => {
      chartCtx.fillText(p.data.label, p.x, height - 12);
    });

    // 8. Animated Pulsing Radar Beacon on End-Point
    const lastP = chartPoints[chartPoints.length - 1];
    if (lastP) {
      chartCtx.save();
      // Expanding ripple ring
      chartCtx.beginPath();
      chartCtx.arc(lastP.x, lastP.y, 6 + (radarRadius % 16), 0, Math.PI * 2);
      chartCtx.strokeStyle = `rgba(245, 158, 11, ${Math.max(0, 0.8 - (radarRadius % 16) / 16)})`;
      chartCtx.lineWidth = 1.5;
      chartCtx.stroke();

      // Solid core beacon
      chartCtx.beginPath();
      chartCtx.arc(lastP.x, lastP.y, 5, 0, Math.PI * 2);
      chartCtx.fillStyle = '#f59e0b';
      chartCtx.fill();
      chartCtx.strokeStyle = '#ffffff';
      chartCtx.lineWidth = 2;
      chartCtx.stroke();
      chartCtx.restore();
    }

    // 9. Laser Scanning Crosshair Line if Active
    if (currentHoverX !== null && chartPoints.length > 0) {
      let closest = chartPoints[0];
      let minD = Math.abs(currentHoverX - closest.x);
      for (let i = 1; i < chartPoints.length; i++) {
        const d = Math.abs(currentHoverX - chartPoints[i].x);
        if (d < minD) {
          minD = d;
          closest = chartPoints[i];
        }
      }

      chartCtx.save();
      chartCtx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      chartCtx.setLineDash([4, 4]);
      chartCtx.lineWidth = 1.2;

      // Vertical guideline
      chartCtx.beginPath();
      chartCtx.moveTo(closest.x, padTop);
      chartCtx.lineTo(closest.x, height - padBottom);
      chartCtx.stroke();

      // Horizontal guideline
      chartCtx.beginPath();
      chartCtx.moveTo(padLeft, closest.y);
      chartCtx.lineTo(width - padRight, closest.y);
      chartCtx.stroke();

      // Glowing selection target ring
      chartCtx.beginPath();
      chartCtx.arc(closest.x, closest.y, 8, 0, Math.PI * 2);
      chartCtx.strokeStyle = '#fbbf24';
      chartCtx.lineWidth = 2;
      chartCtx.shadowColor = '#fbbf24';
      chartCtx.shadowBlur = 10;
      chartCtx.stroke();

      chartCtx.beginPath();
      chartCtx.arc(closest.x, closest.y, 3.5, 0, Math.PI * 2);
      chartCtx.fillStyle = '#ffffff';
      chartCtx.fill();
      chartCtx.restore();
    }
  }

  // Crosshair hover inspection on chart canvas
  chartCanvas.parentElement.addEventListener('mousemove', (e) => {
    if (chartPoints.length === 0) return;
    const rect = chartCanvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    currentHoverX = mouseX;

    let closest = chartPoints[0];
    let minD = Math.abs(mouseX - closest.x);
    for (let i = 1; i < chartPoints.length; i++) {
      const d = Math.abs(mouseX - chartPoints[i].x);
      if (d < minD) {
        minD = d;
        closest = chartPoints[i];
      }
    }

    renderPerformanceChart();

    tooltip.classList.remove('hidden');
    const { symbol } = currencyRates[currentCurrency];
    tooltipDate.textContent = `TIMEFRAME: ${currentRange} • ${closest.data.label}`;
    tooltipVal.textContent = `${symbol}${closest.data.val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const gain = ((closest.data.val - chartPoints[0].data.val) / chartPoints[0].data.val) * 100;
    const gainStr = `${gain >= 0 ? '+' : ''}${gain.toFixed(2)}% vs Period Start`;
    tooltipGain.innerHTML = `<span class="${gain >= 0 ? 'text-emerald-400' : 'text-rose-400'}">${gainStr}</span>`;

    let leftPos = closest.x - tooltip.offsetWidth / 2;
    leftPos = Math.max(10, Math.min(rect.width - tooltip.offsetWidth - 10, leftPos));
    let topPos = closest.y - tooltip.offsetHeight - 14;
    if (topPos < 10) topPos = closest.y + 14;

    tooltip.style.left = `${leftPos}px`;
    tooltip.style.top = `${topPos}px`;
  });

  chartCanvas.parentElement.addEventListener('mouseleave', () => {
    tooltip.classList.add('hidden');
    currentHoverX = null;
    renderPerformanceChart();
  });

  // Timeframe Buttons with Toast
  document.querySelectorAll('.timeframe-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.timeframe-btn').forEach(b => {
        b.classList.remove('bg-amber-500', 'text-stone-950', 'font-bold');
        b.classList.add('text-stone-400');
      });
      const target = e.currentTarget;
      target.classList.remove('text-stone-400');
      target.classList.add('bg-amber-500', 'text-stone-950', 'font-bold');

      currentRange = target.getAttribute('data-range');
      renderPerformanceChart();
      showToast(`Curve timeframe: ${currentRange}`, '📈');
    });
  });

  // Benchmark Toggles
  const btnSP500 = document.getElementById('btn-benchmark-sp500');
  btnSP500?.addEventListener('click', () => {
    benchmarkSP500 = !benchmarkSP500;
    btnSP500.className = benchmarkSP500
      ? 'px-2 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold text-[11px] transition-all'
      : 'px-2 py-0.5 rounded-lg text-stone-400 hover:text-purple-300 text-[11px] transition-all';
    renderPerformanceChart();
    showToast(benchmarkSP500 ? 'Overlay: S&P 500 Index active' : 'Overlay: S&P 500 hidden', '📊');
  });

  const btnBTC = document.getElementById('btn-benchmark-btc');
  btnBTC?.addEventListener('click', () => {
    benchmarkBTC = !benchmarkBTC;
    btnBTC.className = benchmarkBTC
      ? 'px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold text-[11px] transition-all'
      : 'px-2 py-0.5 rounded-lg text-stone-400 hover:text-cyan-300 text-[11px] transition-all';
    renderPerformanceChart();
    showToast(benchmarkBTC ? 'Overlay: Bitcoin Index active' : 'Overlay: Bitcoin hidden', '₿');
  });

  // Live Pulse Mode Toggle
  const btnLivePulse = document.getElementById('btn-live-pulse');
  btnLivePulse?.addEventListener('click', () => {
    livePulseActive = !livePulseActive;
    btnLivePulse.classList.toggle('bg-amber-500/20', livePulseActive);
    btnLivePulse.classList.toggle('text-amber-300', livePulseActive);
    showToast(livePulseActive ? 'Real-time NAV tick stream enabled' : 'NAV tick stream paused', '⚡');
  });

  // Export Chart Snapshot
  const btnSnapshot = document.getElementById('btn-chart-snapshot');
  btnSnapshot?.addEventListener('click', () => {
    try {
      const link = document.createElement('a');
      link.download = `finflow-growth-${currentRange}-${Date.now()}.png`;
      link.href = chartCanvas.toDataURL('image/png');
      link.click();
      showToast('Chart snapshot exported to PNG!', '📸');
    } catch {
      showToast('Snapshot generated!', '📸');
    }
  });

  // Continuous animation loop for pulsing radar beacon
  setInterval(() => {
    radarRadius += 1.5;
    if (!currentHoverX) {
      renderPerformanceChart();
    }
  }, 80);

  // Live tick simulation on curve
  setInterval(() => {
    if (!livePulseActive) return;
    const currentDataset = chartDatasets[currentRange];
    if (currentDataset && currentDataset.length > 0) {
      const last = currentDataset[currentDataset.length - 1];
      const delta = (Math.random() - 0.48) * 35;
      last.val = Math.max(245000, last.val + delta);
      baseWealth.total = last.val;
      document.getElementById('metric-total-wealth').textContent = formatMoney(baseWealth.total);
      if (!currentHoverX) renderPerformanceChart();
    }
  }, 1800);

  // -------------------------------------------------------------------
  // 5. ASSET ALLOCATION INTERACTIVE DONUT CHART
  // -------------------------------------------------------------------
  const donutCanvas = document.getElementById('allocation-donut-canvas');
  const donutCtx = donutCanvas.getContext('2d');

  const allocationSegments = [
    { key: 'equities', label: 'Equities & Funds', pct: 0.451, color: '#a855f7' },
    { key: 'crypto', label: 'Crypto & Web3', pct: 0.339, color: '#06b6d4' },
    { key: 'cash', label: 'Cash & High-Yield', pct: 0.210, color: '#f59e0b' }
  ];

  let hoveredSegment = null;

  function renderDonutChart() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    donutCanvas.width = 200 * dpr;
    donutCanvas.height = 200 * dpr;
    donutCtx.resetTransform();
    donutCtx.scale(dpr, dpr);

    const cx = 100;
    const cy = 100;
    const outerR = 85;
    const innerR = 60;

    donutCtx.clearRect(0, 0, 200, 200);

    let startAngle = -Math.PI / 2;

    allocationSegments.forEach(seg => {
      const angleLength = seg.pct * Math.PI * 2;
      const endAngle = startAngle + angleLength;
      const isHovered = (hoveredSegment === seg.key);

      const rCurrentOuter = isHovered ? outerR + 6 : outerR;
      const rCurrentInner = isHovered ? innerR - 3 : innerR;

      donutCtx.beginPath();
      donutCtx.arc(cx, cy, rCurrentOuter, startAngle, endAngle);
      donutCtx.arc(cx, cy, rCurrentInner, endAngle, startAngle, true);
      donutCtx.closePath();

      donutCtx.fillStyle = seg.color;
      if (isHovered) {
        donutCtx.shadowColor = seg.color;
        donutCtx.shadowBlur = 16;
      }
      donutCtx.fill();
      donutCtx.shadowBlur = 0;

      // Clean separator border
      donutCtx.strokeStyle = '#0a0705';
      donutCtx.lineWidth = 2.5;
      donutCtx.stroke();

      seg.startAngle = startAngle;
      seg.endAngle = endAngle;

      startAngle = endAngle;
    });
  }

  // Donut mouse hover detection
  donutCanvas.addEventListener('mousemove', (e) => {
    const rect = donutCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left - 100;
    const y = e.clientY - rect.top - 100;
    const dist = Math.sqrt(x * x + y * y);

    let found = null;
    if (dist >= 55 && dist <= 96) {
      let angle = Math.atan2(y, x);
      if (angle < -Math.PI / 2) angle += Math.PI * 2;

      allocationSegments.forEach(seg => {
        let s = seg.startAngle;
        let end = seg.endAngle;
        if (s < -Math.PI / 2) s += Math.PI * 2;
        if (end < -Math.PI / 2) end += Math.PI * 2;

        if (angle >= seg.startAngle && angle <= seg.endAngle) {
          found = seg.key;
        }
      });
    }

    if (found !== hoveredSegment) {
      hoveredSegment = found;
      renderDonutChart();

      const centerEl = document.getElementById('donut-center-total');
      if (hoveredSegment) {
        const seg = allocationSegments.find(s => s.key === hoveredSegment);
        centerEl.textContent = `${(seg.pct * 100).toFixed(1)}%`;
        centerEl.style.color = seg.color;
      } else {
        const { symbol } = currencyRates[currentCurrency];
        centerEl.textContent = `${symbol}${(baseWealth.total * currencyRates[currentCurrency].rate / 1000).toFixed(1)}K`;
        centerEl.style.color = '#f7f1eb';
      }
    }
  });

  // Clicking donut segment filters the transaction ledger
  donutCanvas.addEventListener('click', () => {
    if (hoveredSegment) {
      const segMap = {
        'crypto': 'crypto',
        'equities': 'dividend',
        'cash': 'transfer'
      };
      const filterKey = segMap[hoveredSegment] || 'all';
      document.querySelector(`.tx-filter-btn[data-filter="${filterKey}"]`)?.click();
      showToast(`Cross-filtered ledger by: ${hoveredSegment.toUpperCase()}`, '🎯');
    } else {
      document.querySelector('.tx-filter-btn[data-filter="all"]')?.click();
    }
  });

  donutCanvas.addEventListener('mouseleave', () => {
    hoveredSegment = null;
    renderDonutChart();
    const { symbol } = currencyRates[currentCurrency];
    const centerEl = document.getElementById('donut-center-total');
    centerEl.textContent = `${symbol}${(baseWealth.total * currencyRates[currentCurrency].rate / 1000).toFixed(1)}K`;
    centerEl.style.color = '#f7f1eb';
  });

  // -------------------------------------------------------------------
  // 6. MULTI-CURRENCY TRANSACTIONS WITH CRYPTOGRAPHIC PROOF DRAWERS
  // -------------------------------------------------------------------
  let transactions = [
    {
      id: 'tx_8f91',
      recipient: 'Vanguard Total Stock Market (VTI)',
      category: 'equities',
      type: 'transfer',
      sourceCurrency: 'USD',
      amount: -12500.00,
      timestamp: 'Today, 14:24',
      status: 'Settled',
      icon: '📈',
      hash: '0x8f91c30e9d12a77419f85b820a45e41201948ba2',
      protocol: 'ACH Corporate Prime / FedNow',
      confirmations: '64/64 (Finalized)'
    },
    {
      id: 'tx_3a42',
      recipient: 'Bitcoin Cold Vault Staking',
      category: 'crypto',
      type: 'crypto',
      sourceCurrency: 'USD',
      amount: 4250.00,
      timestamp: 'Today, 11:05',
      status: 'Completed',
      icon: '₿',
      hash: '0x3a42e58dfa89047214b772091c532454b827e8a9',
      protocol: 'Native SegWit / Taproot Multisig',
      confirmations: '6 Blocks (Confirmed)'
    },
    {
      id: 'tx_7b19',
      recipient: 'Apple Inc. (AAPL) Q3 Dividend',
      category: 'dividend',
      type: 'dividend',
      sourceCurrency: 'USD',
      amount: 684.50,
      timestamp: 'Yesterday, 18:40',
      status: 'Completed',
      icon: '💎',
      hash: '0x7b19e27c089a456123498acb41295b821430ef89',
      protocol: 'DTCC Automated Dividend Relay',
      confirmations: 'Settled & Verified'
    },
    {
      id: 'tx_1c88',
      recipient: 'SEPA Direct Wire // Zurich Node',
      category: 'transfer',
      type: 'transfer',
      sourceCurrency: 'EUR',
      amount: -3500.00,
      timestamp: '2 days ago',
      status: 'Settled',
      icon: '🏦',
      hash: '0x1c88bf45091a456b82093e412845c08924b89e71',
      protocol: 'SEPA Instant Credit Transfer',
      confirmations: 'Instant Clearing (Zero-Fee)'
    },
    {
      id: 'tx_9e44',
      recipient: 'Ethereum Staking Rewards // Validator #402',
      category: 'crypto',
      type: 'crypto',
      sourceCurrency: 'USD',
      amount: 1180.20,
      timestamp: '3 days ago',
      status: 'Completed',
      icon: '⚡',
      hash: '0x9e44c207b891a0459283e4710295e84120349b81',
      protocol: 'Beacon Chain Consensus Engine',
      confirmations: 'Epoch #298,401 Finalized'
    },
    {
      id: 'tx_2d55',
      recipient: 'Realty Income Corp (O) Monthly Yield',
      category: 'dividend',
      type: 'dividend',
      sourceCurrency: 'USD',
      amount: 412.80,
      timestamp: '5 days ago',
      status: 'Completed',
      icon: '🏢',
      hash: '0x2d55f89104b78912304918e745239a04891b2c45',
      protocol: 'REIT Automated Distribution',
      confirmations: 'Settled'
    },
    {
      id: 'tx_6f33',
      recipient: 'Treasury Bills Yield Settlement',
      category: 'income',
      type: 'income',
      sourceCurrency: 'USD',
      amount: 224.15,
      timestamp: '6 days ago',
      status: 'Settled',
      icon: '💵',
      hash: '0x6f33b102948e71024981a5392014b827e8a93c41',
      protocol: 'US Fedwire RTGS',
      confirmations: 'Direct Vault Credit'
    }
  ];

  let currentTxFilter = 'all';
  let txSearchQuery = '';
  let openTxId = null;

  function renderLedger() {
    const container = document.getElementById('tx-ledger-container');
    container.innerHTML = '';

    const filtered = transactions.filter(tx => {
      const matchFilter = (currentTxFilter === 'all') || (tx.type === currentTxFilter);
      const matchSearch = tx.recipient.toLowerCase().includes(txSearchQuery.toLowerCase()) ||
                          tx.id.toLowerCase().includes(txSearchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });

    document.getElementById('tx-count-badge').textContent = `${filtered.length} items`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="py-8 text-center text-stone-500 font-mono text-xs">
          No transactions found matching "${txSearchQuery}"
        </div>
      `;
      return;
    }

    filtered.forEach(tx => {
      const isPositive = tx.amount > 0;
      const formattedAmt = `${isPositive ? '+' : ''}${formatMoney(Math.abs(tx.amount))}`;
      const isOpen = (openTxId === tx.id);

      const wrapper = document.createElement('div');
      wrapper.className = 'py-3.5 px-2 hover:bg-white/[0.02] rounded-xl transition-all cursor-pointer';

      wrapper.innerHTML = `
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-8 h-8 rounded-xl bg-[#1d140e] border border-amber-900/40 flex items-center justify-center text-sm flex-shrink-0">
              ${tx.icon}
            </div>
            <div class="min-w-0">
              <div class="font-bold text-stone-200 text-xs sm:text-sm truncate flex items-center gap-2">
                <span>${tx.recipient}</span>
                <span class="text-[9px] px-1.5 py-0.2 rounded bg-stone-900 text-stone-400 font-mono border border-stone-800">${tx.type.toUpperCase()}</span>
              </div>
              <div class="text-[11px] font-mono text-stone-400 flex items-center gap-2 mt-0.5">
                <span>${tx.timestamp}</span>
                <span>•</span>
                <span class="text-stone-500">${tx.id}</span>
              </div>
            </div>
          </div>

          <div class="text-right flex-shrink-0 font-mono flex items-center gap-3">
            <div>
              <div class="font-extrabold text-xs sm:text-sm ${isPositive ? 'text-emerald-400' : 'text-stone-200'}">
                ${formattedAmt}
              </div>
              <div class="text-[10px] mt-0.5">
                <span class="px-1.5 py-0.5 rounded ${tx.status === 'Settled' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'}">
                  ${tx.status}
                </span>
              </div>
            </div>
            <span class="text-stone-500 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}">▼</span>
          </div>
        </div>

        <!-- Cryptographic Proof Drawer -->
        <div class="tx-drawer ${isOpen ? 'open' : ''}">
          <div class="mt-3 pt-3 border-t border-amber-900/30 bg-[#120b08]/80 p-3 rounded-xl space-y-2 font-mono text-[11px]">
            <div class="flex items-center justify-between flex-wrap gap-1">
              <span class="text-stone-500">Cryptographic Hash:</span>
              <div class="flex items-center gap-1.5">
                <span class="text-amber-300 font-bold text-[10px] truncate max-w-[200px] sm:max-w-none">${tx.hash}</span>
                <button class="btn-copy-hash px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] transition-colors" data-hash="${tx.hash}">
                  Copy
                </button>
              </div>
            </div>
            <div class="flex justify-between"><span class="text-stone-500">Protocol:</span><span class="text-stone-200">${tx.protocol}</span></div>
            <div class="flex justify-between"><span class="text-stone-500">Confirmations:</span><span class="text-emerald-400 font-bold">${tx.confirmations}</span></div>
            <div class="flex justify-between"><span class="text-stone-500">Network Fee:</span><span class="text-emerald-400 font-bold">$0.00 (Zero-Fee Relay)</span></div>
          </div>
        </div>
      `;

      wrapper.addEventListener('click', (e) => {
        if (e.target.closest('.btn-copy-hash')) return;
        openTxId = (openTxId === tx.id) ? null : tx.id;
        renderLedger();
      });

      container.appendChild(wrapper);
    });

    // Copy hash buttons
    container.querySelectorAll('.btn-copy-hash').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const hash = btn.getAttribute('data-hash');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(hash);
        }
        btn.textContent = 'Copied! ✓';
        btn.classList.add('text-emerald-400', 'border-emerald-500/50');
        showToast(`Copied hash: ${hash.slice(0, 10)}...`, '📋');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('text-emerald-400', 'border-emerald-500/50');
        }, 1500);
      });
    });
  }

  // Filter Buttons
  document.querySelectorAll('.tx-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tx-filter-btn').forEach(b => {
        b.classList.remove('bg-amber-500', 'text-stone-950', 'font-bold');
        b.classList.add('text-stone-400');
      });
      const target = e.currentTarget;
      target.classList.remove('text-stone-400');
      target.classList.add('bg-amber-500', 'text-stone-950', 'font-bold');

      currentTxFilter = target.getAttribute('data-filter');
      renderLedger();
    });
  });

  // Search input
  const searchInput = document.getElementById('tx-search-input');
  searchInput.addEventListener('input', (e) => {
    txSearchQuery = e.target.value.trim();
    renderLedger();
  });

  // Quick Deposit Action
  const btnQuickDeposit = document.getElementById('btn-quick-deposit');
  btnQuickDeposit?.addEventListener('click', () => {
    baseWealth.cash += 5000;
    baseWealth.total += 5000;

    const newTx = {
      id: `tx_${Math.random().toString(36).substring(2, 6)}`,
      recipient: 'Inbound Wire // Treasury Reserve',
      category: 'transfer',
      type: 'transfer',
      sourceCurrency: 'USD',
      amount: 5000.00,
      timestamp: 'Just now',
      status: 'Settled',
      icon: '💵',
      hash: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      protocol: 'Fedwire High-Priority RTGS',
      confirmations: 'Instant Finality'
    };
    transactions.unshift(newTx);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#10b981', '#f59e0b', '#ffffff']
    });

    updateAllCurrencyDisplays();
    showToast('+$5,000.00 Inbound wire credited to Cash & High-Yield!', '💵');
  });

  // -------------------------------------------------------------------
  // 7. LIVE MARKET WATCHLIST WITH DYNAMIC SPARKLINES
  // -------------------------------------------------------------------
  const marketTickers = [
    { symbol: 'BTC/USD', price: 64280.00, change: 3.2, history: [62100, 62800, 63400, 63100, 63900, 64280] },
    { symbol: 'ETH/USD', price: 3490.50, change: 2.1, history: [3380, 3410, 3425, 3460, 3470, 3490.5] },
    { symbol: 'SOL/USD', price: 152.80, change: 5.4, history: [142, 145, 148, 146, 150, 152.8] },
    { symbol: 'Gold (XAU)', price: 2380.40, change: 0.8, history: [2360, 2368, 2372, 2370, 2378, 2380.4] },
    { symbol: 'EUR/USD', price: 1.0842, change: -0.15, isForex: true, history: [1.086, 1.0855, 1.085, 1.0845, 1.0842] }
  ];

  function drawTickerSparkline(canvasId, history, isUp) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = 55;
    const h = 20;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = (max - min) || 1;
    const color = isUp ? '#10b981' : '#f43f5e';

    const points = history.map((val, idx) => ({
      x: (w / (history.length - 1)) * idx,
      y: 2 + (h - 4) - ((val - min) / range) * (h - 4)
    }));

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 1; i++) {
      ctx.lineTo(points[i + 1].x, points[i + 1].y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }

  function renderMarketWatchlist() {
    const container = document.getElementById('market-watchlist-container');
    container.innerHTML = '';

    marketTickers.forEach((m, idx) => {
      const isUp = m.change >= 0;
      const row = document.createElement('div');
      row.id = `ticker-row-${idx}`;
      row.className = 'flex items-center justify-between p-2.5 rounded-xl bg-[#120c08] border border-amber-900/30 hover:border-amber-500/40 transition-all cursor-pointer';
      row.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="font-bold text-stone-200 text-xs">${m.symbol}</span>
          <canvas id="ticker-spark-${idx}" class="w-[55px] h-[20px]"></canvas>
        </div>
        <div class="text-right">
          <span class="font-mono text-stone-100 font-bold block" id="ticker-price-${idx}">
            ${m.isForex ? m.price.toFixed(4) : '$' + m.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span class="text-[10px] font-mono ${isUp ? 'text-emerald-400' : 'text-rose-400'}" id="ticker-change-${idx}">
            ${isUp ? '+' : ''}${m.change.toFixed(2)}%
          </span>
        </div>
      `;
      row.addEventListener('click', () => {
        showToast(`${m.symbol}: 24h Vol $14.2B • High: $${(m.price * 1.03).toFixed(2)}`, '📈');
      });
      container.appendChild(row);
      drawTickerSparkline(`ticker-spark-${idx}`, m.history, isUp);
    });
  }

  // Random tick simulation every 2.5s with price flash
  setInterval(() => {
    const idx = Math.floor(Math.random() * marketTickers.length);
    const m = marketTickers[idx];
    const delta = (Math.random() - 0.48) * 0.005;
    m.price *= (1 + delta);
    m.change += (delta * 100);
    m.history.push(m.price);
    if (m.history.length > 8) m.history.shift();

    const priceEl = document.getElementById(`ticker-price-${idx}`);
    const changeEl = document.getElementById(`ticker-change-${idx}`);
    const rowEl = document.getElementById(`ticker-row-${idx}`);

    if (priceEl && changeEl && rowEl) {
      priceEl.textContent = m.isForex ? m.price.toFixed(4) : '$' + m.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      changeEl.textContent = `${m.change >= 0 ? '+' : ''}${m.change.toFixed(2)}%`;
      changeEl.className = `text-[10px] font-mono ${m.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`;

      rowEl.classList.add(delta >= 0 ? 'flash-green' : 'flash-red');
      setTimeout(() => {
        rowEl.classList.remove('flash-green', 'flash-red');
      }, 800);

      drawTickerSparkline(`ticker-spark-${idx}`, m.history, m.change >= 0);
    }
  }, 2200);

  // -------------------------------------------------------------------
  // 8. CRYPTOGRAPHIC KEY ROTATION ANIMATED TERMINAL
  // -------------------------------------------------------------------
  let sessionSecondsLeft = 899;
  const sessionCountdownEl = document.getElementById('session-countdown');
  const shieldExpiryEl = document.getElementById('shield-expiry-readout');

  setInterval(() => {
    sessionSecondsLeft = Math.max(0, sessionSecondsLeft - 1);
    const mins = Math.floor(sessionSecondsLeft / 60);
    const secs = sessionSecondsLeft % 60;
    const str = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (sessionCountdownEl) sessionCountdownEl.textContent = str;
    if (shieldExpiryEl) shieldExpiryEl.textContent = `${sessionSecondsLeft} seconds remaining`;
  }, 1000);

  const btnRotate = document.getElementById('btn-rotate-keys');
  const keyRotationBox = document.getElementById('key-rotation-box');
  const rotationProgressBar = document.getElementById('rotation-progress-bar');
  const rotationPct = document.getElementById('rotation-pct');
  const rotationLog = document.getElementById('rotation-log');
  const rotationTitle = document.getElementById('rotation-status-title');

  let isRotating = false;

  btnRotate?.addEventListener('click', () => {
    if (isRotating) return;
    isRotating = true;
    keyRotationBox.classList.remove('hidden');
    btnRotate.disabled = true;

    const stages = [
      { pct: 25, title: 'DERIVING CURVE25519...', log: '> [1/4] Destroying ephemeral session 0x8F9B...' },
      { pct: 55, title: 'HARVESTING ENTROPY...', log: '> [2/4] Generating 512-bit CSPRNG seed...' },
      { pct: 85, title: 'EXCHANGING ECDH P-384...', log: '> [3/4] Mutual HMAC verification with Zurich Enclave...' },
      { pct: 100, title: 'KEYS SYNCHRONIZED ✓', log: '> [4/4] AES-GCM-256 cipher updated. Zero-trust valid.' }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < stages.length) {
        const s = stages[step];
        rotationProgressBar.style.width = `${s.pct}%`;
        rotationPct.textContent = `${s.pct}%`;
        rotationTitle.textContent = s.title;
        const p = document.createElement('p');
        p.className = 'text-stone-300';
        p.textContent = s.log;
        rotationLog.appendChild(p);
        rotationLog.scrollTop = rotationLog.scrollHeight;
        step++;
      } else {
        clearInterval(interval);
        sessionSecondsLeft = 900;
        showToast('Cryptographic keys rotated & synchronized!', '🛡️');
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#f59e0b', '#10b981']
        });

        setTimeout(() => {
          keyRotationBox.classList.add('hidden');
          btnRotate.disabled = false;
          isRotating = false;
          rotationProgressBar.style.width = '0%';
        }, 2000);
      }
    }, 450);
  });

  // -------------------------------------------------------------------
  // 9. TRANSFER MODAL PRESETS & REAL-TIME FX PREVIEW
  // -------------------------------------------------------------------
  const modalTransfer = document.getElementById('modal-transfer');
  const btnOpenTransfer = document.getElementById('btn-open-transfer');
  const btnCloseTransfer = document.getElementById('btn-close-transfer');
  const btnCancelTransfer = document.getElementById('btn-cancel-transfer');
  const transferForm = document.getElementById('transfer-form');
  const transferAmountInput = document.getElementById('transfer-amount');
  const transferConvertedVal = document.getElementById('transfer-converted-val');

  function updateTransferFxPreview() {
    if (!transferAmountInput || !transferConvertedVal) return;
    const val = parseFloat(transferAmountInput.value) || 0;
    const usdVal = val / currencyRates[currentCurrency].rate;
    const btcVal = (usdVal / 64280).toFixed(4);
    const eurVal = (usdVal * currencyRates['EUR'].rate).toFixed(2);
    transferConvertedVal.textContent = `≈ €${eurVal} / ${btcVal} BTC`;
  }

  transferAmountInput?.addEventListener('input', updateTransferFxPreview);

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset');
      if (preset === 'max') {
        transferAmountInput.value = baseWealth.cash.toFixed(2);
      } else {
        transferAmountInput.value = preset;
      }
      updateTransferFxPreview();
    });
  });

  function openTransferModal() {
    modalTransfer.classList.remove('hidden');
    modalTransfer.classList.add('flex');
    updateTransferFxPreview();
  }

  function closeTransferModal() {
    modalTransfer.classList.add('hidden');
    modalTransfer.classList.remove('flex');
  }

  btnOpenTransfer?.addEventListener('click', openTransferModal);
  btnCloseTransfer?.addEventListener('click', closeTransferModal);
  btnCancelTransfer?.addEventListener('click', closeTransferModal);

  transferForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const recipient = document.getElementById('transfer-recipient').value.trim();
    const amountVal = parseFloat(transferAmountInput.value);

    if (isNaN(amountVal) || amountVal <= 0) return;

    const source = document.getElementById('transfer-source').value;
    if (source === 'cash') baseWealth.cash -= amountVal;
    else if (source === 'btc' || source === 'eth') baseWealth.crypto -= amountVal;
    else baseWealth.total -= amountVal;

    const newTx = {
      id: `tx_${Math.random().toString(36).substring(2, 6)}`,
      recipient: recipient,
      category: 'transfer',
      type: 'transfer',
      sourceCurrency: currentCurrency,
      amount: -amountVal,
      timestamp: 'Just now',
      status: 'Settled',
      icon: '↗',
      hash: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      protocol: 'Zero-Knowledge Encrypted Relay',
      confirmations: 'Instant Settlement'
    };
    transactions.unshift(newTx);

    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#ffffff']
    });

    closeTransferModal();
    transferForm.reset();
    updateAllCurrencyDisplays();
    showToast(`Transferred ${formatMoney(amountVal)} to ${recipient}!`, '↗');
  });

  // Security Shield Modal
  const modalShield = document.getElementById('modal-shield');
  const btnOpenShield = document.getElementById('btn-open-shield');
  const btnSecurityBadge = document.getElementById('btn-security-badge');
  const btnCloseShield = document.getElementById('btn-close-shield');
  const btnDoneShield = document.getElementById('btn-done-shield');

  function openShieldModal() {
    modalShield.classList.remove('hidden');
    modalShield.classList.add('flex');
  }

  function closeShieldModal() {
    modalShield.classList.add('hidden');
    modalShield.classList.remove('flex');
  }

  btnOpenShield?.addEventListener('click', openShieldModal);
  btnSecurityBadge?.addEventListener('click', openShieldModal);
  btnCloseShield?.addEventListener('click', closeShieldModal);
  btnDoneShield?.addEventListener('click', closeShieldModal);

  // -------------------------------------------------------------------
  // 10. INITIALIZATION & RESIZE OBSERVER
  // -------------------------------------------------------------------
  updateAllCurrencyDisplays();
  window.addEventListener('resize', () => {
    resizeChartCanvas();
    renderAllSparklines();
  });
  setTimeout(resizeChartCanvas, 50);
  setTimeout(resizeChartCanvas, 250);

  if (window.ResizeObserver && chartCanvas && chartCanvas.parentElement) {
    const ro = new ResizeObserver(() => {
      resizeChartCanvas();
      renderAllSparklines();
    });
    ro.observe(chartCanvas.parentElement);
  }

  showToast('FinFlow Wealth OS v2.4 initialized', '💎');
});
