const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    BOT_NOME: process.env.BOT_NOME,
    BOT_PREFIXO: process.env.BOT_PREFIXO,
    API_TOKEN: process.env.API_TOKEN,
    API_KEY_GOOGLE: process.env.API_KEY_GOOGLE,
}