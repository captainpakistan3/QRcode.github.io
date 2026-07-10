const linkInput = document.getElementById('linkInput');
const generateBtn = document.getElementById('generateBtn');
const qrResult = document.getElementById('qrResult');
const downloadBtn = document.getElementById('downloadBtn');
const welcomeScreen = document.getElementById('welcomeScreen');
const enterBtn = document.getElementById('enterBtn');

let qrcode = null;

// Welcome screen: button dabane par fade ho jaye
enterBtn.addEventListener('click', () => {
  welcomeScreen.classList.add('fade-out');
});

generateBtn.addEventListener('click', generateQR);
linkInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') generateQR();
});

function generateQR() {
  const link = linkInput.value.trim();

  if (!link) {
    alert('Pehle koi link daalein!');
    return;
  }

  // Purana QR clear karo
  qrResult.innerHTML = '';

  // Naya QR code bnao
  qrcode = new QRCode(qrResult, {
    text: link,
    width: 200,
    height: 200,
    colorDark: '#333333',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  downloadBtn.classList.remove('hidden');
}

downloadBtn.addEventListener('click', () => {
  // Library canvas ya img banati hai, dono handle karte hain
  setTimeout(() => {
    const canvas = qrResult.querySelector('canvas');
    const img = qrResult.querySelector('img');

    const dataUrl = canvas ? canvas.toDataURL('image/png') : img.src;

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'qrcode.png';
    a.click();
  }, 100);
});