const Discord = require("discord.js");

module.exports = {
    name: 'profile',
    category: "Perfil",
  run: async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setDescription(`Usuario. ${message.author.username}`)
    .setColor('#FFFFFF')
    .addField(`Usuário`, `${message.author.username}#${message.author.discriminator}`)
    .addField("ID", message.author.id)
    .addField("Criação", message.author.createdAt);

    message.channel.send(embed)
  }
}