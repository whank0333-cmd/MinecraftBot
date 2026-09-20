const mineflayer = require('mineflayer');
const express = require('express');

// Express server for Render health checks
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Aternos AFK Bot is running!');
});

app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});

// Bot Configuration
const botOptions = {
  host: 'KnoxSMPJava.aternos.me', // <-- Your Aternos DynIP (without port)
  port: 30502,                         // <-- Your 5-digit Aternos Port
  username: 'the',
  auth: 'offline',                     // Required for Cracked servers
  version: '1.20.4',                   // FORCES 1.20.4 packet protocol (ViaVersion translates this to 26.3)
  checkTimeoutInterval: 90 * 1000
};

function createBot() {
  console.log('Connecting bot to Aternos server...');
  
  try {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
      console.log('SUCCESS: Bot joined the Aternos server!');
      
      setInterval(() => {
        if (bot.entity) {
          bot.look(bot.entity.yaw + 0.5, bot.entity.pitch, true);
        }
      }, 30000);
    });

    bot.on('end', (reason) => {
      console.log(`Disconnected (${reason}). Retrying in 20 seconds...`);
      setTimeout(createBot, 20000);
    });

    bot.on('error', (err) => {
      console.log('Bot connection error:', err.message);
    });

  } catch (err) {
    console.log('Creation failed:', err.message);
    setTimeout(createBot, 20000);
  }
}

createBot();
