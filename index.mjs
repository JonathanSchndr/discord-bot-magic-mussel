import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import fetch from 'node-fetch';

const token = process.env.DISCORD_BOT_TOKEN;
const id = process.env.DISCORD_SERVER_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Create the command and add a string parameter for the question
    const commands = [
        {
            name: 'magic',
            description: 'Asks the magic conch shell a yes/no question.',
            options: [
                {
                    name: 'question',
                    type: 3,
                    description: 'The question you want to ask.',
                    required: true,
                },
            ],
        },
    ];

    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log('Started refreshing application (/) commands.');

        // Replace <Your_Guild_ID> with the actual ID of your Discord server
        await rest.put(
            Routes.applicationGuildCommands(client.user.id, id),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'magic') {
        const question = interaction.options.getString('question');

        fetch('https://yesno.wtf/api')
            .then((response) => response.json())
            .then((response) => {
                interaction.reply({
                    content: `Question: ${question}\nAnswer: ${response.answer}`,
                    files: [response.image]
                });
            })
            .catch((error) => {
                console.error(error);
                interaction.reply('There was an error processing your request.');
            });
    }
});

client.login(token);