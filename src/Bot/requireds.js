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
        console.log(require.resolve(module));
    } catch(e) {
        console.error(`Você precisa instalar o ${module} ou use -> npm i`);
        process.exit(e.code);
    }
}

checkModule('ytdl-core');
checkModule('ytsearcher');
checkModule('sqlite3');