const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    BOT_NOME: process.env.BOT_NOME,
    API_TOKEN: process.env.API_TOKEN
}