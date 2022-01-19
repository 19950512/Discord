const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

let versionAtual = process.version.replace('v', '').split('.')[0]

const versaoNecessaria = '14.17.1 >='

if(versionAtual < versaoNecessaria.split('.')[0]){
    console.log('Você precisa usar uma versão mais atual do NODE.')
    console.log(`Versão necessária: ${versaoNecessaria}`)
    console.log(`Sua versão: ${process.version}`)
    process.exit(1)
}

const checkModule = module => {
    try {
        require.resolve(module);
    } catch(erro) {
        console.error(`Você precisa instalar o ${module} ou use -> npm i`);
        process.exit(erro.code);
    }
}

checkModule('ytdl-core');
checkModule('ytsearcher');
checkModule('sqlite3');

try {
    require('./servidores.js')
} catch(erro) {
    console.error(`Você precisa criar o arquivo "servidores.js", use o "servidores.js.example"`);
    process.exit(erro.code);
}

if(!process.env.API_TOKEN) { 
    console.warn(`Você deve criar o arquivo ".env" de configuração do BOT, use o ".env.example""`);
    process.exit(1);
}