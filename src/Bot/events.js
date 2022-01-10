
'use strict';


const Private = require('./BusinessRules/Private.js');
const Soma = require('./BusinessRules/Soma.js');


// Aqui vai a regra de negócio do BOT. - Message
class Message {

    constructor(){
        this.private = new Private();
        this.soma = new Soma();
    }
};

module.exports = class Events extends Message {

    constructor(client, BOT_NOME, BOT_PREFIXO){
        super();
        this.client = client;
        this.BOT_NOME = BOT_NOME;
        this.BOT_PREFIXO = BOT_PREFIXO

        console.log(BOT_PREFIXO);
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

            this.private.send(message);
        });
    }
}