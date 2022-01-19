
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

    table(table_name, columns, callback){
        console.log(`tentando criar a tabela "${table_name}" se não existir.`);

        let colunas = columns.join(', ')

        return this.db.run(`CREATE TABLE IF NOT EXISTS ${table_name} (${colunas})`, erro => {

            let created = true
            if(erro){
                console.error(erro.message)
                created = false
            }

            if(created){
                console.log(`Coluna "${table_name}" existente.`)
            }
            
            if(typeof(callback) == 'function'){
                callback(created)
            }
        });
    }
    
    insert(table_name, values, callback){
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

        let stmt = this.db.prepare(query, erro => {

            if(erro){
                if(erro.message.includes('has no column named')){
                    let coluna = erro.message.split(' ')
                    coluna = coluna[coluna.length - 1]
                    console.log(`Ops, não existe essa coluna "${coluna}" na tabela "${table_name}".`)
                    return
                }
                if(erro.message.includes('no such table:')){
                    console.log(`Ops, parece que não existe a tabela "${table_name}".`)
                    return
                }

                console.log(`Ops, ocorreu um erro desconhecido na tabela "${table_name}".`)
                return
            }
        });
            
        stmt.run(listValues, erro => {

            let inserted = true
            if(erro){
                inserted = false
            }

            if(inserted){
                console.log(`Valor "${listValues.join(', ')}" inserido com sucesso na tabela "${table_name}".`)
            }

            if(typeof(callback) == 'function'){
                callback(inserted)
            }
        });

        stmt.finalize();
    }
    
    select(query, callback){
        return this.db.all(query, (erro, rows) => {

            if(erro){
                console.error(erro.message);
                return
            }

            if(typeof(callback) == 'function'){
                callback(rows)
            }
    
            //this.close()
        });
    }
    
    close(){
        console.log("conexao fechada.");
        this.db.close();
    }
}