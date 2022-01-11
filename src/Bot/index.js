require('./requireds.js')

const { BOT_NOME, BOT_PREFIXO, API_TOKEN } = require('../config')

console.log('######### BOT #########\n')
console.log(`Bot Nome: ${BOT_NOME}`)

const Discord = require("discord.js");

const Events = require('./events.js');

const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();

const DiscordChannel = new Events(client, BOT_NOME, BOT_PREFIXO);
DiscordChannel.addEventListener();

client.login(API_TOKEN);