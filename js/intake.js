// ── Checkbox card selection ───────────────────────────────
document.querySelectorAll('.check-card').forEach(function(card) {
  card.addEventListener('click', function() {
    this.classList.toggle('selected');
    const cb = this.querySelector('input[type="checkbox"]');
    cb.checked = !cb.checked;
    handlePainPoints();
  });
});

// ── Follow-up question config ─────────────────────────────
const followups = {
  scheduling: {
    title: '📅 Scheduling & Bookings',
    questions: [
      { id: 'sched_channel', label: 'How do customers currently book with you?', type: 'select',
        options: ['Phone call', 'Walk-in', 'Email', 'Website form', 'Social media DM', 'Other'] },
      { id: 'sched_type', label: 'What type of appointments do you schedule?', type: 'text',
        placeholder: 'e.g. service calls, consultations, haircuts…' },
      { id: 'sched_volume', label: 'How many bookings per week on average?', type: 'select',
        options: ['Less than 10', '10–30', '30–60', '60–100', '100+'] },
    ]
  },
  textsched: {
    title: '📲 Text Message Scheduling',
    questions: [
      { id: 'txt_platform', label: 'Do you currently use any texting tools for your business?', type: 'text',
        placeholder: 'e.g. Google Voice, OpenPhone, personal cell, nothing yet…' },
      { id: 'txt_goal', label: 'What do you want customers to be able to do via text?', type: 'select',
        options: ['Book an appointment', 'Get a quote', 'Ask questions / get answers', 'Receive reminders', 'All of the above'] },
      { id: 'txt_volume', label: 'How many customer text conversations per week?', type: 'select',
        options: ['Less than 10', '10–30', '30–60', '60+', "I don't know yet"] },
    ]
  },
  accounting: {
    title: '📊 Accounting & Invoicing',
    questions: [
      { id: 'acc_current', label: 'How do you currently handle your books?', type: 'select',
        options: ['Manually / spreadsheets', 'Accountant or bookkeeper', 'QuickBooks', 'Other software', "I don't really track it"] },
      { id: 'acc_pain', label: 'What\'s the biggest accounting headache?', type: 'select',
        options: ['Sending invoices', 'Tracking expenses', 'Chasing unpaid invoices', 'Tax prep', 'Payroll', 'All of it'] },
      { id: 'acc_volume', label: 'How many invoices do you send per month?', type: 'select',
        options: ['Less than 10', '10–50', '50–200', '200+'] },
    ]
  },
  customer: {
    title: '💬 Customer Service & Chat',
    questions: [
      { id: 'cs_channel', label: 'Where do most customer questions come in?', type: 'select',
        options: ['Phone', 'Email', 'Website', 'Facebook/Instagram', 'Walk-in', 'Multiple channels'] },
      { id: 'cs_faq', label: 'What are the top 3 questions customers ask most?', type: 'textarea',
        placeholder: 'e.g. "What are your hours?", "How much does it cost?", "Do you have availability this week?"' },
      { id: 'cs_response', label: 'How long does it usually take you to respond to customers?', type: 'select',
        options: ['Within minutes', 'Within a few hours', 'Same day', 'Next day or longer'] },
    ]
  },
  marketing: {
    title: '📣 Marketing & Social Media',
    questions: [
      { id: 'mkt_channels', label: 'Which platforms do you use for marketing?', type: 'text',
        placeholder: 'e.g. Instagram, Facebook, email newsletter, Google…' },
      { id: 'mkt_freq', label: 'How often do you currently post or send marketing?', type: 'select',
        options: ['Rarely / never', 'A few times a month', 'Weekly', 'Multiple times a week'] },
      { id: 'mkt_goal', label: 'Main marketing goal?', type: 'select',
        options: ['Get more new customers', 'Keep existing customers coming back', 'Build brand awareness', 'Promote specific offers or events'] },
    ]
  },
  inventory: {
    title: '📦 Inventory Management',
    questions: [
      { id: 'inv_current', label: 'How do you currently track inventory?', type: 'select',
        options: ['Manually / paper', 'Spreadsheets', 'POS system', 'Inventory software', "I don't track it"] },
      { id: 'inv_size', label: 'How many unique products/SKUs do you carry?', type: 'select',
        options: ['Less than 50', '50–200', '200–1000', '1000+'] },
      { id: 'inv_pain', label: 'Biggest inventory problem?', type: 'select',
        options: ['Running out of stock', 'Overstocking', 'Manual reorder process', 'Syncing with online store', 'Shrinkage / theft tracking'] },
    ]
  },
  hr: {
    title: '👥 HR & Staff Scheduling',
    questions: [
      { id: 'hr_staff', label: 'How many staff do you schedule?', type: 'select',
        options: ['2–5', '6–15', '16–30', '30+'] },
      { id: 'hr_current', label: 'How do you currently build schedules?', type: 'select',
        options: ['Group chat / text', 'Spreadsheet', 'Scheduling app', 'Paper', 'Other'] },
      { id: 'hr_pain', label: 'Biggest scheduling headache?', type: 'select',
        options: ['Last-minute callouts', 'Shift swaps', 'Tracking hours / payroll', 'Communication with staff', 'All of it'] },
    ]
  },
  other: {
    title: '⚙️ Something Else',
    questions: [
      { id: 'other_desc', label: 'Describe what you\'re looking to automate or improve:', type: 'textarea',
        placeholder: 'Tell us what's taking up your time or what you wish could run on autopilot…' },
    ]
  }
};

// ── Render follow-up questions ────────────────────────────
function handlePainPoints() {
  const selected = Array.from(document.querySelectorAll('.check-card.selected'))
    .map(c => c.getAttribute('data-value'));

  const container = document.getElementById('followupQuestions');
  const step3 = document.getElementById('step3');

  if (selected.length === 0) {
    step3.style.display = 'none';
    return;
  }

  step3.style.display = 'block';
  container.innerHTML = '';

  selected.forEach(function(key) {
    if (!followups[key]) return;
    const group = followups[key];
    const div = document.createElement('div');
    div.className = 'followup-group';

    let html = `<h4>${group.title}</h4>`;
    group.questions.forEach(function(q) {
      html += `<div class="form-group">
        <label class="form-label">${q.label}</label>`;

      if (q.type === 'select') {
        html += `<select class="form-input" id="${q.id}">
          <option value="">Select…</option>
          ${q.options.map(o => `<option value="${o}">${o}</option>`).join('')}
        </select>`;
      } else if (q.type === 'textarea') {
        html += `<textarea class="form-input form-textarea" id="${q.id}" rows="3" placeholder="${q.placeholder || ''}"></textarea>`;
      } else {
        html += `<input type="text" class="form-input" id="${q.id}" placeholder="${q.placeholder || ''}" />`;
      }

      html += `</div>`;
    });

    div.innerHTML = html;
    container.appendChild(div);
  });
}

// ── Handle biz type selection ─────────────────────────────
function handleBizType() {
  // Could pre-select relevant pain points based on industry
  const type = document.getElementById('bizType').value;
  const suggestions = {
    restaurant:   ['scheduling', 'customer', 'marketing', 'inventory'],
    retail:       ['inventory', 'marketing', 'customer'],
    contractor:   ['scheduling', 'textsched', 'accounting'],
    salon:        ['scheduling', 'textsched', 'marketing', 'customer'],
    healthcare:   ['scheduling', 'textsched', 'accounting', 'customer'],
    realestate:   ['scheduling', 'textsched', 'marketing', 'customer'],
    accounting:   ['accounting', 'customer', 'marketing'],
    legal:        ['scheduling', 'accounting', 'customer'],
  };

  if (suggestions[type]) {
    // Soft-suggest: highlight relevant checkboxes but don't force-select
    document.querySelectorAll('.check-card').forEach(function(card) {
      card.classList.remove('suggested');
    });
    suggestions[type].forEach(function(val) {
      const card = document.querySelector(`.check-card[data-value="${val}"]`);
      if (card) card.classList.add('suggested');
    });
  }
}

// ── Estimate engine (inline — runs in browser) ────────────
function computeIntakeEstimate(fd) {
  var sizeMap = { 'solo': '1', '2-5': '2-5', '2–5': '2-5', '6-20': '6-15', '21-50': '16-30' };
  var size = sizeMap[fd.employees] || '1';

  var toolCount = (fd.currentTools || '').split(/[,;\s\/|]+/).filter(function(t) { return t.trim().length > 1; }).length;
  var ppCount   = Array.isArray(fd.painPoints) ? fd.painPoints.length : 0;

  // Base tier
  var tierName, basePrice;
  if (size === '1')     { tierName = 'Quick Launch';     basePrice = 1000;  }
  else if (size === '2-5')  { tierName = 'Full Mastery';  basePrice = 2500;  }
  else if (size === '6-15') { tierName = 'Team Foundation'; basePrice = 5000;  }
  else                      { tierName = 'Corporate Mastery'; basePrice = 10000; }

  // Complexity flags
  var flags = [];
  if (toolCount >= 3) flags.push('Multi-tool stack (' + toolCount + ' tools) — integration complexity');
  if (ppCount >= 4)   flags.push('Broad scope (' + ppCount + ' pain point areas) — phased rollout recommended');

  // Adjusted price — bump one tier if highly complex
  var adjustedPrice = basePrice;
  var tierOrder = [1000, 2500, 5000, 10000];
  if (flags.length >= 2) {
    var idx = tierOrder.indexOf(basePrice);
    if (idx >= 0 && idx < tierOrder.length - 1) adjustedPrice = tierOrder[idx + 1];
  }

  var priceDisplay = adjustedPrice > basePrice
    ? ('$' + basePrice.toLocaleString('en-US') + '–$' + adjustedPrice.toLocaleString('en-US'))
    : ('$' + adjustedPrice.toLocaleString('en-US'));

  // Retainer
  var retainerName, retainerPrice, retainerReason;
  if (size === '1') {
    retainerName = 'The Pilot'; retainerPrice = '$200/mo';
    retainerReason = 'Biweekly check-ins to maintain momentum';
  } else if (size === '2-5') {
    retainerName = 'The Accelerator'; retainerPrice = '$400/mo';
    retainerReason = 'Weekly support during team rollout';
  } else {
    retainerName = 'Team Mastery'; retainerPrice = '$1,000/mo';
    retainerReason = 'Ongoing team support and monthly strategy sessions';
  }

  // Timeline
  var timeline = size === '1' ? '2–3 weeks'
    : size === '2-5' ? '3–5 weeks'
    : size === '6-15' ? '4–6 weeks'
    : '8–12 weeks';

  // Scope
  var ppLabels = {
    scheduling: 'Scheduling and booking automation', textsched: 'Text-based scheduling system',
    accounting: 'Invoice and expense automation', customer: 'AI customer service / chatbot',
    marketing: 'Marketing automation and content', inventory: 'Inventory tracking and reorder automation',
    hr: 'Staff scheduling and HR workflow automation', other: 'Custom workflow automation (per description)',
  };
  var scope = [];
  if (size === '1') {
    scope.push('1:1 AI strategy session and workflow audit');
    scope.push('Custom AI setup for primary workflow');
    scope.push('Tool configuration (up to 2 tools) and SOPs');
  } else if (size === '2-5') {
    scope.push('Deep-dive workflow audit and full AI implementation');
    scope.push('Multi-tool integration and automation buildout');
    scope.push('Custom GPT/agent setup with hand-off documentation');
  } else if (size === '6-15') {
    scope.push('Company-wide workflow mapping and opportunity scoring');
    scope.push('Team AI rollout with manager and staff training');
    scope.push('30-day post-launch support window');
  } else {
    scope.push('Enterprise AI readiness assessment and phased rollout');
    scope.push('Cross-department automation and training program');
    scope.push('90-day implementation roadmap with milestones');
  }
  if (Array.isArray(fd.painPoints)) {
    fd.painPoints.forEach(function(pp) { if (ppLabels[pp]) scope.push(ppLabels[pp]); });
  }

  var reviewNote = flags.length > 0
    ? 'Complexity flags present — review scope before finalizing: ' + flags.join('; ')
    : 'No major flags — standard engagement.';

  return {
    tierName: tierName, priceDisplay: priceDisplay, timeline: timeline,
    retainerName: retainerName, retainerPrice: retainerPrice, retainerReason: retainerReason,
    flags: flags, scope: scope, reviewNote: reviewNote,
    summary: (fd.bizName || 'This client') + ' is a good fit for the ' + tierName + ' package. '
      + 'They operate a ' + (fd.bizType || 'business') + ' with key needs around: '
      + (Array.isArray(fd.painPoints) ? fd.painPoints.join(', ') : 'workflow automation') + '. '
      + (flags.length ? 'Complexity flags noted — review before sending.' : 'Straightforward scope.'),
  };
}

function buildEstimateHtml(est) {
  var flagsHtml = est.flags.length
    ? est.flags.map(function(f) { return '<li>' + f + '</li>'; }).join('')
    : '<li>None</li>';
  var scopeHtml = est.scope.map(function(s) { return '<li>' + s + '</li>'; }).join('');
  return [
    '<hr style="margin:32px 0;border-color:#ccc;">',
    '<h2 style="color:#1a1a1a;">&#8212;&#8212; ESTIMATE FOR REVIEW &#8212;&#8212;</h2>',
    '<p style="color:#c0392b;font-size:0.9rem;font-weight:bold;">For Nainoa\'s review only — do not forward to client.</p>',
    '<table style="border-collapse:collapse;width:100%;font-family:sans-serif;margin-bottom:16px;">',
    '<tr><td style="padding:8px;font-weight:bold;background:#f0f4ff;width:200px;">Recommended Tier</td><td style="padding:8px;">' + est.tierName + ' — ' + est.priceDisplay + '</td></tr>',
    '<tr><td style="padding:8px;font-weight:bold;background:#f0f4ff;">Retainer Recommendation</td><td style="padding:8px;">' + est.retainerName + ' — ' + est.retainerPrice + ' (' + est.retainerReason + ')</td></tr>',
    '<tr><td style="padding:8px;font-weight:bold;background:#f0f4ff;">Estimated Timeline</td><td style="padding:8px;">' + est.timeline + '</td></tr>',
    '</table>',
    '<h3 style="color:#1a1a1a;">Complexity Flags</h3><ul>' + flagsHtml + '</ul>',
    '<h3 style="color:#1a1a1a;">Scope</h3><ul>' + scopeHtml + '</ul>',
    '<h3 style="color:#1a1a1a;">Summary</h3><p>' + est.summary + '</p>',
    '<h3 style="color:#c0392b;">Review Note</h3><p>' + est.reviewNote + '</p>',
    '<hr style="margin:32px 0;border-color:#ccc;">',
    '<p style="color:#888;font-size:0.85rem;">&#8212;&#8212; END ESTIMATE &#8212;&#8212;</p>',
  ].join('');
}

// ── Form submission ───────────────────────────────────────
document.getElementById('intakeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Basic validation
  const required = ['bizName', 'ownerName', 'bizType', 'description'];
  let valid = true;
  required.forEach(function(id) {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#c0392b';
      valid = false;
    } else {
      el.style.borderColor = '';
    }
  });

  const selected = document.querySelectorAll('.check-card.selected');
  if (selected.length === 0) {
    document.getElementById('painPoints').style.outline = '2px solid #c0392b';
    valid = false;
  } else {
    document.getElementById('painPoints').style.outline = '';
  }

  if (!valid) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Show generating overlay
  showGenerating();

  // Collect and save form data
  const formData = collectFormData();
  localStorage.setItem('mcai_tools', JSON.stringify(formData.painPoints));

  const user = JSON.parse(localStorage.getItem('mcai_user') || '{}');
  user.bizName = user.bizName || formData.bizName;
  user.bizType = formData.bizType;
  user.painPoints = formData.painPoints;
  localStorage.setItem('mcai_user', JSON.stringify(user));

  const plan = new URLSearchParams(window.location.search).get('plan') || 'starter';

  // POST to backend — fire and forget
  const payload = Object.assign({}, formData, {
    email:     user.email || '',
    ownerName: user.name  || formData.ownerName || '',
    plan:      plan,
  });

  // Compute estimate for Nainoa's review
  var intakeEstimate = computeIntakeEstimate(payload);

  // Send intake form via secure backend API
  const BACKEND_URL = 'https://mycustomai-backend-1.onrender.com'; // Update this when deployed
  
  // Add estimate to payload for backend processing
  payload.estimate = intakeEstimate;
  
  fetch(BACKEND_URL + '/api/intake-submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Intake form submitted successfully');
      if (data.redirectUrl) {
        setTimeout(function() {
          window.location.href = data.redirectUrl;
        }, 2000);
      }
    } else {
      console.warn('Backend error:', data.error);
      // Still redirect on backend failure - user experience first
      setTimeout(function() {
        window.location.href = 'confirmation.html?plan=' + plan;
      }, 3000);
    }
  })
  .catch(function(err) {
    console.warn('Backend request failed:', err.message);
    // Graceful degradation - still redirect user
    setTimeout(function() {
      window.location.href = 'confirmation.html?plan=' + plan;
    }, 3000);
  });

  setTimeout(function() {
    window.location.href = 'confirmation.html?plan=' + plan;
  }, 4000);
});

function showGenerating() {
  const overlay = document.createElement('div');
  overlay.className = 'generating-overlay show';
  overlay.innerHTML = `
    <div class="spinner"></div>
    <div class="generating-title">Submitting your buildout request…</div>
    <div class="generating-sub">We'll review your request and reach out within 24 hours</div>
    <div class="generating-steps">
      <div class="gen-step active" id="gs1">✦ Saving your business details</div>
      <div class="gen-step" id="gs2">✦ Sending your request to our team</div>
      <div class="gen-step" id="gs3">✦ Preparing your account setup checklist</div>
      <div class="gen-step" id="gs4">✦ Almost done</div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Animate steps
  const steps = ['gs1', 'gs2', 'gs3', 'gs4'];
  steps.forEach(function(id, i) {
    setTimeout(function() {
      if (i > 0) document.getElementById(steps[i-1]).className = 'gen-step done';
      document.getElementById(id).className = 'gen-step active';
    }, i * 900);
  });
}

function collectFormData() {
  const painPoints = Array.from(document.querySelectorAll('.check-card.selected'))
    .map(c => c.getAttribute('data-value'));

  return {
    bizName:      document.getElementById('bizName').value,
    ownerName:    document.getElementById('ownerName').value,
    bizType:      document.getElementById('bizType').value,
    employees:    document.getElementById('employees').value,
    budget:       document.getElementById('budget').value,
    currentTools: document.getElementById('currentTools').value,
    painPoints:   painPoints,
    description:  document.getElementById('description').value,
    extra:        document.getElementById('extra').value,
  };
}
