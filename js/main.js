// ── Modal ────────────────────────────────────────────────────
function openModal(type) {
  document.getElementById('authModal').classList.add('open');
  if (type === 'login') {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
  } else {
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
  }
}

function closeModal() {
  document.getElementById('authModal').classList.remove('open');
}

function switchToLogin() {
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function switchToSignup() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
}

// Close modal on overlay click
document.getElementById('authModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// ── Auth Handlers (placeholder — wire to backend later) ──────
function handleSignup() {
  // Collect form values
  const bizName   = document.querySelector('#signupForm input[type="text"]:nth-of-type(1)') || {};
  const name      = document.querySelector('#signupForm input[type="text"]:nth-of-type(2)') || {};
  const email     = document.querySelector('#signupForm input[type="email"]') || {};

  // Save minimal user data to localStorage for dashboard
  const userData = {
    bizName:  (bizName.value || '').trim(),
    name:     (name.value || '').trim(),
    email:    (email.value || '').trim(),
    plan:     window._selectedPlan || 'starter',
    signedUpAt: new Date().toISOString(),
  };
  localStorage.setItem('mcai_user', JSON.stringify(userData));

  // TODO: connect to backend / Supabase for real auth
  const plan = window._selectedPlan || 'starter';
  closeModal();
  window.location.href = 'checkout.html?plan=' + plan;
}

function handleLogin() {
  // TODO: connect to backend / Supabase for real auth
  // For now: if user data exists in localStorage, send to dashboard
  const user = JSON.parse(localStorage.getItem('mcai_user') || '{}');
  closeModal();
  if (user.email) {
    window.location.href = 'dashboard.html?plan=' + (user.plan || 'starter');
  } else {
    window.location.href = 'checkout.html';
  }
}

// ── FAQ Accordion ────────────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(function(q) {
  q.addEventListener('click', function() {
    const item = this.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ── Smooth scroll for nav links ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
