'use strict'


/*
# ARQUIVO canais.json

{
    "texto": [
        {
            "canal": "geral",
            "bot_id": 1,
            "username": "BOT X",
            "avatar_url":"https://dominio.com/url/da/imagem.jpg",
            "webhook_id":"SEU_ID_WEBHOOK",
            "webhook_token":"SEU_TOKEN_WEBHOOK"
        },
        {
            "canal": "logs",
            "bot_id": 2,
            "username": "BOT Y",
            "avatar_url":"https://dominio.com/url/da/imagem.jpg",
            "webhook_id":"SEU_ID_WEBHOOK",
            "webhook_token":"SEU_TOKEN_WEBHOOK"
        }
    ]
}

*/


const { BOT_NOME } = require('../config')

const canais = require('./canais.json')

console.log('######### Webhooks #########\n')
console.log(`Bot Nome: ${BOT_NOME}`)

var argumentos = process.argv.slice(2);

if(argumentos[0] == '--data'){

	let data = argumentos[1]
	let buff = new Buffer(data, 'base64');
	let text = buff.toString('ascii');

	console.log(`${data} to ${text}`);
}