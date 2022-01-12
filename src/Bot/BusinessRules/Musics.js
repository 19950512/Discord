const queue = new Map();

const ytdl = require('ytdl-core');

const { YTSearcher } = require('ytsearcher');

const { API_KEY_GOOGLE } = require('../../config')

const searcher = new YTSearcher({
    key: API_KEY_GOOGLE,
    revealed: true
})

module.exports = {
    name: 'music',
    category: "Musicas",
    run: async (client, message, args) => {

        const serverQueue = queue.get(message.guild.id)

        const command = args[0] ?? ''
        const search = args.splice(1, args.length).join(' ')

        let autor = message.author.id;
        const voiceChannel = message.member.voice.channel

        let execute = async (message, serverQueue) => {

            if(!voiceChannel){
                return message.channel.send(`<@${autor}>, eu só falo com você depois que você entrar no **Voice** para adicionar músicas.`)
            }
            
            let result = await searcher.search(search, {type: "video"}).then().catch(e => {
                
                if(e.message.includes('quotaExceeded')){
                    message.channel.send(`Google API - Excedeu a cota.`)
                    return
                }

                message.channel.send(`Deu ruim ...`)
                message.channel.send(e.message)
                return
            });
            
            if(!result){
                console.log('Algo deu errado.');
                return
            }

            const songInfo = await ytdl.getInfo(result.first.url)

            let song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            }

            if(!serverQueue){
              
                const queueConstructor = {
                    txtChannel: message.channel,
                    vChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 100,
                    playing: true
                }

                queue.set(message.guild.id, queueConstructor)

                queueConstructor.songs.push(song);

                try{

                    let connection = await voiceChannel.join()
                    queueConstructor.connection = connection

                    play(message.guild, queueConstructor.songs[0])
                
                } catch (error) {
                    console.log(`Error: ${error}`)
                    queue.delete(message.guild.id)
                    return message.channel.send('Não foi possível tocar a música... :confounded:')
                }
            }else{

                serverQueue.songs.push(song)
                message.channel.send(`A música **${song.title}** foi adicionada. ${song.url}`)
            }

        }

        let play = (guild, song) => {

            const serverQueue = queue.get(guild.id)
            
            if(!song){
                serverQueue.vChannel.leave();
                queue.delete(guild.id)
                return
            }


            const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on('finish', f => {
                serverQueue.songs.shift()

                if(serverQueue.songs[0]){
                    play(guild, serverQueue.songs[0])
                    serverQueue.txtChannel.send(`Agora irá tocar ${serverQueue.songs[0].url}`)
                }
                
                serverQueue.txtChannel.send(`@everyone, acabou as músicas.. Com base nas músicas anteriores, deseja ouvir outras? `)
            })

        }

        let stop = async (message, serverQueue, voiceChannel) => {

            if(!message.member.voice.channel){
                return message.channel.send(`<@${autor}>, eu só falo com você depois que você entrar no **Voice**.`)
            }
            
            if(!serverQueue){
                return message.channel.send(`<@${autor}>, você quer parar algo que está parado? :face_with_raised_eyebrow:`)
            }

            serverQueue.songs = []
            serverQueue.connection.dispatcher.end();
        }

        let skip = (message, serverQueue) => {

            if(!message.member.voice.channel){
                return message.channel.send(`<@${autor}>, eu só falo com você depois que você entrar no **Voice**.`)
            }
            
            if(!serverQueue){
                return message.channel.send(`<@${autor}>, não há mais músicas para tocar.`)
            }

            if(!serverQueue.connection.dispatcher){
                return message.channel.send(`<@${autor}>, você precisa **continuar** a música.`)
            }

            serverQueue.connection.dispatcher.end();
        }

        switch(command){
            case 'play':
                execute(message, serverQueue)
                break
            case 'stop':
                stop(message, serverQueue, voiceChannel)
                break
            case 'skip':
                skip(message, serverQueue)
                break
        }
    }
}