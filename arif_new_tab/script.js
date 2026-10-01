const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const voiceButton = document.getElementById('voiceButton');
const lensButton = document.getElementById('lensButton');
const aiButton = document.getElementById('aiButton');
const addShortcut = document.getElementById('addShortcut');
const customizeButton = document.getElementById('customizeButton');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  // If it looks like a URL, open it directly. Otherwise search Google.
  const looksLikeUrl = /^(https?:\/\/|www\.|[\w-]+\.[a-z]{2,})(\/.*)?$/i.test(query);
  const url = looksLikeUrl
    ? (query.startsWith('http') ? query : `https://${query}`)
    : `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  window.location.href = url;
});

voiceButton.addEventListener('click', () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Voice search is not supported in this browser.');
    return;
  }

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new Recognition();
  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  recognition.onresult = (event) => {
    input.value = event.results[0][0].transcript;
    form.requestSubmit();
  };
  recognition.start();
});

lensButton.addEventListener('click', () => {
  window.open('https://lens.google.com/', '_blank');
});

aiButton.addEventListener('click', () => {
  const query = input.value.trim();
  const url = query
    ? `https://www.google.com/search?q=${encodeURIComponent(query)}&udm=50`
    : 'https://www.google.com/';
  window.location.href = url;
});

addShortcut.addEventListener('click', () => {
  const name = prompt('Shortcut name:');
  if (!name) return;

  const urlInput = prompt('Website URL:');
  if (!urlInput) return;

  let url = urlInput.trim();
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  const shortcut = document.createElement('a');
  shortcut.className = 'shortcut';
  shortcut.href = url;
  shortcut.target = '_blank';
  shortcut.innerHTML = `
    <div class="shortcut-icon">${name.charAt(0).toUpperCase()}</div>
    <span>${name}</span>
  `;

  addShortcut.before(shortcut);
});

customizeButton.addEventListener('click', () => {
  alert('This is your ARIF New Tab. You can edit style.css to change the background, logo size, colors, and layout.');
});
