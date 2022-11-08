const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { connect } = require('mongoose');
const logger = require('./logger');

const config = require('../config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.commands = new Collection();
client.logger = logger;
client.config = config;
module.exports = client;

async function load() {
    //Load listeners
    const listeners = readdirSync('./listeners');
    listeners.forEach(listener => {
        if (!listener.endsWith('.js')) return;
        require(`../listeners/${listener}`);
    });
    logger.log(`Loaded ${listeners.length} listeners`);

    //Load commands
    const _commands = [];
    const categories = readdirSync('./commands');
    categories.forEach(category => {
        const commands = readdirSync(`./commands/${category}`);
        commands.forEach(command => {
            if (!command.endsWith('.js')) return;
            const file = require(`../commands/${category}/${command}`);
            if (file?.name && file?.description && file?.type && file?.run) {
                client.commands.set(file.name, file);
                _commands.push(file.name);
            }
        });
    });
    logger.log(`Loaded ${_commands.length} commands`);
    //Login
    client.login(config.token).catch(e => logger.error('Invalid token provided.'));

    if (config.uri) connect(config.uri, () => logger.log('Connected to database'));
    else logger.warn('No URI was provided.')
}

load();