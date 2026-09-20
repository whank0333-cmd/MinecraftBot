const mineflayer = require('mineflayer');

// Configuration
const botOptions = {
  host: 'KnoxSMPJava.aternos.me', // <-- Your Aternos DynIP (without the port)
  port: 30502,                    // <-- Your Aternos 5-digit port number
  username: 'AFK_Bot',            // <-- Bot username in-game
  auth: 'offline'                 // Set to 'offline' for Cracked servers
};

function createBot() {
  console.log('Connecting to Aternos server...');
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot successfully joined and active!');
    
    // Anti-AFK routine: rotate slightly every 30 seconds
    setInterval(() => {
      bot.look(bot.entity.yaw + 0.5, bot.entity.pitch, true);
    }, 30000);
  });

  bot.on('end', (reason) => {
    console.log(`Disconnected (${reason}). Reconnecting in 15 seconds...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Bot Error:', err);
  });
}

createBot();
