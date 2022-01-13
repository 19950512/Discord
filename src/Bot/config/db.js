
var sqlite3 = require('sqlite3').verbose();

module.exports = class DB {

    constructor(database){
        if(database){
            this.db = new sqlite3.Database(`../Databases/${database}.sqlite3`)
        }
    }

    connect(name){
        console.log(`tentando conectar ao DB ${name}`);
        return new sqlite3.Database(`../Databases/${name}.sqlite3`, erro => {

            if(erro){
                console.error(erro.message)
            }

            console.log(`Conectou ao DB ${name}`)
        });
    }

    table(table_name, columns){
        console.log(`tentando criar a tabela "${table_name}" se não existir.`);

        let colunas = columns.join(', ')

        this.db.run(`CREATE TABLE IF NOT EXISTS ${table_name} (${colunas})`, erro => {

            if(erro){
                console.error(erro.message)
                return
            }

            console.log(`Coluna "${table_name}" criada com sucesso.`)
        });
    }
    
    insert(table_name, values){
        console.log(`Tentando inserir valores na tabela ${table_name}`);

        
        let colunasNome = ''
        let totalValues = 0;
        let listValues = [];
        for(let colunas in values){
            listValues.push(values[colunas]);
            totalValues += 1;
            colunasNome += `, ${colunas}`
        }
        let countValues = ',?'.repeat(totalValues)
        countValues = countValues.substring(1, countValues.length)

        colunasNome = colunasNome.substring(2, colunasNome.length)

        let query = `INSERT INTO ${table_name} (${colunasNome}) VALUES (${countValues})`

        let stmt = this.db.prepare(query);
        
        stmt.run(listValues, erro => {

            if(erro){
                console.error(erro.message)
                return
            }

            console.log(`Valor "${listValues.join(', ')}" inserido com sucesso na tabela "${table_name}".`)
        });

        stmt.finalize();
    }
    
    async select(query, callback){
        return await this.db.all(query, (erro, rows) => {

            if(erro){
                console.error(erro.message);
                return
            }

            if(typeof(callback) == 'function'){
                callback(rows)
            }
    
            this.close()
        });
    }
    
    close(){
        console.log("conexao fechada.");
        this.db.close();
    }
}