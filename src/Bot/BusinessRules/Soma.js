module.exports = class Soma {
    soma(message){
        message.author.send(`qual o valor?`).catch(error => {return;}) 
    }
}