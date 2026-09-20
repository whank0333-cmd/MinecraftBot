const mineflayer = require('mineflayer');
const express = require('express');

// Express server for Render health checks
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Aternos AFK Bot is active!');
});

app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});

// Bot Configuration
const botOptions = {
  host: 'KnoxSMPJava.aternos.me', // <-- Replace with DynIP
  port: 30502,                         // <-- Replace with 5-digit Port
  username: 'MrMiguel',
  auth: 'offline',
  checkTimeoutInterval: 90 * 1000      // Gives extra time for protocol handshakes
};

function createBot() {
  console.log('Connecting bot to Aternos server...');
  
  try {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
      console.log('SUCCESS: Bot has joined the Aternos server!');
      
      // Anti-AFK routine: rotate slightly every 30 seconds
      setInterval(() => {
        if (bot.entity) {
          bot.look(bot.entity.yaw + 0.5, bot.entity.pitch, true);
        }
      }, 30000);
    });

    bot.on('end', (reason) => {
      console.log(`Disconnected: ${reason}. Retrying in 20 seconds...`);
      setTimeout(createBot, 20000);
    });

    bot.on('error', (err) => {
      console.log('Bot connection error:', err.message);
    });

  } catch (err) {
    console.log('Failed to create bot:', err.message);
    setTimeout(createBot, 20000);
  }
}

createBot();
