const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    BOT_NOME: process.env.BOT_NOME,
    DISCORD_API: process.env.DISCORD_API
}