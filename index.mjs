import * as dotenv from "dotenv";
import discord from "discord.js";

dotenv.config();

const token = process.env.DISCORD_BOT_TOKEN;
const {Client, GatewayIntentBits} = discord;

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
];

const client = new Client({intents});
client.login(token);

client.on("messageCreate", (message) => {
    if (! message.content.startsWith("MM:") || ! message.content.endsWith("?")) {
        return;
    }

    fetch("https://yesno.wtf/api")
        .then((response) => response.json())
        .then((response) => {
            message.reply({
                content: response.answer,
                files: [response.image]
            });
    });
});
