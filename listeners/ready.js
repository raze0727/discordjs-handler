const client = require("../modules/client");

client.on('ready', () => {
    client.logger.log(`Logged in as ${client.user.tag}`);
    client.application.commands.set(client.commands);
});