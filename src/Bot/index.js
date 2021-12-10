const { BOT_NOME, API_TOKEN } = require('../config')

console.log('######### BOT #########\n')
console.log(`Bot Nome: ${BOT_NOME}`)

const Discord = require("discord.js");

const Events = require('./events.js');

const client = new Discord.Client();

const DiscordChannel = new Events(client, BOT_NOME);
DiscordChannel.addEventListener();

client.login(API_TOKEN);