const BDAY = new Date(new Date().getFullYear(), 7, 13); // 13 August
const cdElem = document.getElementById('countdown');
const audio = document.getElementById('birthday-audio');

function updateCountdown() {
  const now = new Date();
  let birthday = new Date(BDAY);

  if (now > birthday) {
    birthday.setFullYear(birthday.getFullYear() + 1); // next year
  }

  const diff = birthday - now;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  cdElem.textContent = `${d}d ${h}h ${m}m ${s}s left!`;

  // When time is up
  if (d === 0 && h === 0 && m === 0 && s === 0) {
    showBirthdaySurprise();
  }
}

function showBirthdaySurprise() {
    document.querySelector('.container').innerHTML = `
      <h1>🎉 Happy Birthday! 🎉</h1>
      <img src="surprise.gif" alt="Surprise GIF" class="gif">
      <p>I love you so much ❤️</p>
  
      <button id="show-letter-btn">💌 Read Your Birthday Letter</button>
  
      <div id="love-letter" class="letter-box" style="display: none;">
        <h2>💌 A Letter for You 💌</h2>
        <p>Dear Meghna ,</p>
        <p>
          As I write this, there's a smile on my face and a thousand emotions in my heart.
          Another year has passed, and here we are — celebrating you, the most beautiful person in my life.
        </p>
        <p>
          You’re not just the girl I love, you’re the one who makes my world brighter every single day.
          This little website is just a small way of showing how much you mean to me.
        </p>
        <p>
          I know I say “I love you” often — maybe even every day — but today, I want to say it like it’s the first time:  
          <strong>I love you. Truly, madly, deeply.</strong>
        </p>
        <p>
          Happy Birthday, my jaan. This heart beats for you, today and always. 💖
        </p>
        <p style="text-align: right;">Forever yours,<br><strong>aayush</strong></p>
      </div>
    `;
  
    // Handle audio
    audio.play();
  
    // Show letter when button is clicked
    document.getElementById('show-letter-btn').addEventListener('click', () => {
      document.getElementById('love-letter').style.display = 'block';
      document.getElementById('show-letter-btn').style.display = 'none';
    });
  }
  
  
// Keep updating every second
setInterval(updateCountdown, 1000);

// Initial run
updateCountdown();

function showImage(event, index) {
    const reader = new FileReader();
    reader.onload = function () {
      const img = document.getElementById('img' + index);
      img.src = reader.result;
  
      // Save image to local storage
      localStorage.setItem('img' + index, reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  
  function saveCaption(index) {
    const caption = document.getElementById('caption' + index).value;
    localStorage.setItem('caption' + index, caption);
  }
  
  function loadGallery() {
    for (let i = 0; i < 8; i++) {
      const imgData = localStorage.getItem('img' + i);
      const captionData = localStorage.getItem('caption' + i);
  
      if (imgData) {
        document.getElementById('img' + i).src = imgData;
      }
  
      if (captionData) {
        document.getElementById('caption' + i).value = captionData;
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
  });
  if ('serviceWorker' in navigator && 'PeriodicSyncManager' in window) {
    navigator.serviceWorker.ready.then(registration => {
      registration.periodicSync.register('daily-love-note', {
        minInterval: 24 * 60 * 60 * 1000, // 1 day
      });
    });
  }
  // Download all images she uploaded
document.getElementById('downloadImages').addEventListener('click', () => {
    for (let i = 0; i < 8; i++) {
      const imgData = localStorage.getItem('img' + i);
      if (imgData) {
        const a = document.createElement('a');
        a.href = imgData;
        a.download = `her_photo_${i + 1}.png`;
        a.click();
      }
    }
  });
  
  
  
