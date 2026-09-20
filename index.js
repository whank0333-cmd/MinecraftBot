const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('AFK Bot active');
});

app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});

const botOptions = {
  host: 'KnoxSMPJava.aternos.me', // Your Aternos DynIP
  port: 30502,                         // Your 5-digit Aternos Port
  username: 'the',
  auth: 'offline',
  checkTimeoutInterval: 120000         // Extended timeout for handshaking
};

function createBot() {
  console.log('Attempting connection to 26.3 server...');
  
  try {
    const bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
      console.log('SUCCESS: Bot joined the 26.3 server!');
      
      setInterval(() => {
        if (bot.entity) {
          bot.look(bot.entity.yaw + 0.5, bot.entity.pitch, true);
        }
      }, 30000);
    });

    bot.on('end', (reason) => {
      console.log(`Disconnected (${reason}). Reconnecting...`);
      setTimeout(createBot, 20000);
    });

    bot.on('error', (err) => {
      console.log('Protocol Error:', err.message);
    });

  } catch (err) {
    console.log('Fatal error:', err.message);
    setTimeout(createBot, 20000);
  }
}

createBot();
