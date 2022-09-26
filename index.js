require('dotenv').config();
const fetch = require('node-fetch');
const { Client, MessageAttachment } = require('discord.js');
const client = new Client();

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('message', (message) => {
  if (message.content.startsWith('MM:') && message.content.endsWith('?')) {
    fetch('https://yesno.wtf/api')
      .then(res => res.json())
      .then(json => {
        const attachment = new MessageAttachment(json.image);
        message.channel.send(json.answer, attachment);
      });
  }
});