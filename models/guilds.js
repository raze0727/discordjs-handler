const { model, Schema } = require('mongoose');

module.exports = model('guilds',
    new Schema({
        guildID: String,
        channelID: String
    })
)