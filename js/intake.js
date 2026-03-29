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

  // Collect all form data
  const formData = collectFormData();

  // TODO: POST formData to backend, trigger PDF generation
  // Save tools/pain points to localStorage for dashboard
  const formData = collectFormData();
  localStorage.setItem('mcai_tools', JSON.stringify(formData.painPoints));

  // Update user record with biz info
  const user = JSON.parse(localStorage.getItem('mcai_user') || '{}');
  user.bizName = user.bizName || formData.bizName;
  user.bizType = formData.bizType;
  user.painPoints = formData.painPoints;
  localStorage.setItem('mcai_user', JSON.stringify(user));

  // Pass plan from URL param to confirmation page
  const plan = new URLSearchParams(window.location.search).get('plan') || 'starter';
  setTimeout(function() {
    window.location.href = 'confirmation.html?plan=' + plan;
  }, 4000);
});

function showGenerating() {
  const overlay = document.createElement('div');
  overlay.className = 'generating-overlay show';
  overlay.innerHTML = `
    <div class="spinner"></div>
    <div class="generating-title">Building your custom AI plan…</div>
    <div class="generating-sub">Analyzing your business and selecting the best tools</div>
    <div class="generating-steps">
      <div class="gen-step active" id="gs1">✦ Reviewing your business type and challenges</div>
      <div class="gen-step" id="gs2">✦ Matching tools to your specific needs</div>
      <div class="gen-step" id="gs3">✦ Writing your step-by-step setup guides</div>
      <div class="gen-step" id="gs4">✦ Assembling your PDF report</div>
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
