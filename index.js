const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Aternos AFK Bot is running 24/7!');
});

app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});

// --- Mineflayer Bot Configuration ---
const botOptions = {
  host: 'KnoxSMPJava.aternos.me', // <-- Your Aternos DynIP (without port)
  port: 30502,                    // <-- Your 5-digit Aternos Port
  username: 'null',
  auth: 'offline',                // Required for Cracked mode
  version: '1.20.1'               // <-- ADD THIS LINE! (Replace '1.20.1' with your exact Aternos server version e.g., '1.20.4', '1.21.1', etc.)
};

function createBot() {
  console.log('Connecting bot to Aternos server...');
  
  try {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
      console.log('SUCCESS: Bot has joined the server!');
      
      setInterval(() => {
        if (bot.entity) {
          bot.look(bot.entity.yaw + 0.5, bot.entity.pitch, true);
        }
      }, 30000);
    });

    bot.on('end', (reason) => {
      console.log(`Disconnected (${reason}). Reconnecting in 20 seconds...`);
      setTimeout(createBot, 20000);
    });

    bot.on('error', (err) => {
      console.log('Bot Error:', err.message);
    });

  } catch (err) {
    console.log('Failed to create bot instance:', err.message);
    setTimeout(createBot, 20000);
  }
}

createBot();
