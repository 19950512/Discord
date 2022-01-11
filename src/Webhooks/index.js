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

const Discord = require('discord.js');
const canais = require('./canais.json');

const { BOT_NOME, DISCORD_API } = require('../config')

var argumentos = process.argv.slice(2);

if(argumentos[0] == '--data'){

	let data = argumentos[1]
	let buff = new Buffer.from(data, 'base64');
	let text = buff.toString('ascii');

	data = JSON.parse(text)
	let tipo_canal = 'texto'

	for(let indice_bot in canais[tipo_canal]){

		if(canais[tipo_canal][indice_bot]['bot_id'] == data['bot_id']){

			let bot = canais[tipo_canal][indice_bot]

			const webhook = new Discord.WebhookClient(bot['webhook_id'], bot['webhook_token']);

			let files = []
			if(data['files']){
				for(let file in data['files']){
					var attachment = Buffer.from(data['files'][file]['attachment'], "utf-8");
					var name = data['files'][file]['name']

					files.push({attachment, name})
				}
			}

			webhook.send(data['mensagem'], {
				avatarURL: bot['avatar_url'],
				username: bot['username'],
				files,
				embeds: data['embeds']
			})
			.then(f => {
				console.log('Mensagem enviada.')
				process.exit(1)
			})
			.catch(console.error);
			return
		}
	}
}