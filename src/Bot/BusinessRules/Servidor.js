/* LISTA DE SERVIDORES QUE O BOT PODERÁ INTERAGIR */
const servidores = require('../servidores').servidores || []

/* CARREGA TODOS OS CARGOS DO BOT */
const ListaCargos = require('../cargos')

const cargosAutorizados = [ListaCargos.cargos.teste];

module.exports = {
    name: 'servidor',
    category: "Server",
    run: async (client, message, args) => {

        let servidorAtual;

        for(let servidor in servidores){

            if(client.guilds.cache.has(servidores[servidor].id)){
                servidorAtual = client.guilds.cache.get(servidores[servidor].id)
            }
        }

	    let membro = servidorAtual.members.cache.get(message.author.id)

        for(let cargoId in cargosAutorizados){

            if(membro._roles.indexOf(cargosAutorizados[cargoId]) < 0){
                message.channel.send(`<@${membro.id}>, você não ter pemissão para executar esse comando.`);
                return
            }
        }

        let channelsInformacoesVos = '';
        let channelsInformacoesTexto = '';

        message.guild.channels.cache.map((f, index) => {
            if(message.guild.channels.cache.get(index).type == 'voice'){
                channelsInformacoesVos += message.guild.channels.cache.get(index).name + "\n";
            }
            if(message.guild.channels.cache.get(index).type == 'text'){
                channelsInformacoesTexto += message.guild.channels.cache.get(index).name + "\n";
            }
        })
        

        let informacoes = `
Nome: **${servidorAtual.name}**
Dono: ${servidorAtual.members.cache.get(servidorAtual.ownerID)}
Membros: **${servidorAtual.memberCount}**/${servidorAtual.maximumMembers.toLocaleString('pt-BR')}
Canal de Vóz:
**${channelsInformacoesVos}**
Canal de Texto:
**${channelsInformacoesTexto}**
        `

        message.channel.send(informacoes);
    }
}