
'use strict';


// Aqui vai a regra de negócio do BOT. - Message
class Message {

    constructor(){
    }
};

module.exports = class Events extends Message {

    constructor(client, BOT_NOME, BOT_PREFIXO){
        super();
        this.client = client;
        this.BOT_NOME = BOT_NOME;
        this.BOT_PREFIXO = BOT_PREFIXO

        require(`./commands`)(this.client);
    }

    addEventListener(){

        this.client.on("ready", async () => {
            console.log(`O bot foi iniciado, com ${this.client.users.cache.size} usuários e em ${this.client.guilds.cache.size} servidores.`);
            this.client.user.setActivity(this.BOT_NOME, { type: 'PLAYING' });
        });

        this.client.on("message", async message => {

            // Se for Bot, ignora, pois um bot não fala com outro, será?
            if(message.author.bot){
                return;
            };

            if(message.channel.type == 'dm'){
                message.author.send(`<@${message.author.id}> san eu não posso falar com você. \n:point_right: :point_left:`).catch(error => {return;}) 
            }

            const args = message.content.slice(this.BOT_PREFIXO.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();

            if(cmd.length === 0) return;

            let BusinessRules;

            // Se existir esse comando nas regras de negócio
            if(this.client.commands.has(cmd)){
                BusinessRules = this.client.commands.get(cmd)
            }

            try {
                BusinessRules.run(this.client, message, args);
            } catch (e) {
            
            }
        });
    }
}