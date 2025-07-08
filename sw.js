self.addEventListener('install', function(event) {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'daily-love-note') {
      event.waitUntil(sendLoveNotification());
    }
  });
  
  async function sendLoveNotification() {
    const now = new Date();
    const bday = new Date(now.getFullYear(), 7, 13); // 13 August
    const diff = Math.ceil((bday - now) / 86400000);
    const msg = diff > 0
      ? `I love you! Only ${diff} days to go 💖`
      : `🎉 Happy Birthday, my love!`;
  
    self.registration.showNotification('💌 From Your Jaan', {
      body: msg,
      icon: 'love.gif',
      badge: 'love.gif',
      vibrate: [200, 100, 200],
    });
  }
  
