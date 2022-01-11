const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("LISTA DE COMANDOS");
table.setHeading("COMANDO", "STATUS DO CARREGAMENTO");

module.exports = (client) => {
    readdirSync("./BusinessRules/").forEach(file => {
    
        if(!file.endsWith(".js")) return
        let pull = require(`./BusinessRules/${file}`);

        if (pull.name) {
            client.commands.set(pull.name, pull);
            table.addRow(file, '✅');
        } else {
            table.addRow(file, `❌  -> está faltando o nome do comando.`);
        }

        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    });
    
    console.log(table.toString());
}