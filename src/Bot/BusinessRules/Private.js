module.exports = class Private {
    send(message){
        if(message.channel.type == 'dm'){
            message.author.send(`<@${message.author.id}> san eu não posso falar com você. \n:point_right: :point_left:`).catch(error => {return;}) 
        }
    }
}