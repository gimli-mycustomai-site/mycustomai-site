
// ── Email Capture ─────────────────────────────────────────────
// BACKEND_URL: wire this to Google Apps Script web app URL once auth is ready
const EMAIL_CAPTURE_ENDPOINT = 'PENDING_GOOGLE_APPS_SCRIPT_URL';

function handleEmailCapture(e) {
  e.preventDefault();
  const email = document.getElementById('captureEmail').value.trim();
  const msg   = document.getElementById('emailCaptureMsg');
  const btn   = e.target.querySelector('.email-capture-btn');

  if (!email) return;

  // If backend not wired yet, store locally and show success
  if (EMAIL_CAPTURE_ENDPOINT === 'PENDING_GOOGLE_APPS_SCRIPT_URL') {
    // Store in localStorage as a queue until backend is ready
    const queue = JSON.parse(localStorage.getItem('mcai_email_queue') || '[]');
    if (!queue.includes(email)) queue.push(email);
    localStorage.setItem('mcai_email_queue', JSON.stringify(queue));
    msg.style.display = 'block';
    msg.style.color = '#22c55e';
    msg.textContent = "You're in. We'll be in touch with the good stuff only.";
    btn.disabled = true;
    btn.textContent = 'Done ✓';
    return;
  }

  // Once backend is wired — POST to Google Apps Script
  btn.disabled = true;
  btn.textContent = 'Sending...';
  fetch(EMAIL_CAPTURE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, source: 'homepage', timestamp: new Date().toISOString() })
  })
  .then(r => r.json())
  .then(() => {
    msg.style.display = 'block';
    msg.style.color = '#22c55e';
    msg.textContent = "You're in. We'll be in touch with the good stuff only.";
    btn.textContent = 'Done ✓';
  })
  .catch(() => {
    msg.style.display = 'block';
    msg.style.color = '#ef4444';
    msg.textContent = 'Something went wrong. Try again.';
    btn.disabled = false;
    btn.textContent = 'Get Access';
  });
}

File unchanged since last read. The content from the earlier read_file result in this conversation is still current — refer to that instead of re-reading.