
'use strict';

// Aqui vai a regra de negócio do BOT. - Message
class Message {

    // Response Private MSG
    private(message){
        if(message.channel.type == 'dm'){
            message.author.send(`<@${message.author.id}> san eu não posso falar com você. \n:point_right: :point_left:`).catch(error => {return;}) 
        }
    }
};

module.exports = class Events extends Message {

    constructor(client, BOT_NOME){
        super();
        this.client = client;
        this.BOT_NOME = BOT_NOME;
    }

    addEventListener(){

        this.client.on("ready", async () => {
            console.log(`O bot foi iniciado, com ${this.client.users.cache.size} usuários e em ${this.client.guilds.cache.size} servidores.`);
            this.client.user.setActivity(this.BOT_NOME, { type: 'PLAYING' });
        });
        
        this.client.on("message", async message => {
            this.private(message);
        });
    }
}