"use strict";
require('../requireds')

const SQLite = require('./db')

const Util = require('../Util/Math')

const databaseName = 'game'

const db = new SQLite(databaseName);

// Conectar a um DB
//let conectar = db.connect('musicas')

// INICIO criar tabelas

// pessoas
/* db.table('pessoas', [
    'nome TEXT', 'idade INTEGER'
], created => {
    console.log(`A tabela existe? ${created}`)
});


// players
db.table('players', [
    'nome TEXT', 'idade INTEGER'
], created => {
    console.log(`A tabela existe? ${created}`)
}); */

// FIM criar tabelas










// INICIO Inserir Linhas
// Insert Pessoas
/* db.insert('pessoas', {
    nome: 'Rita', idade: Util.random(12, 18)
}, created => {
    console.log(`Inseriu? ${created}`)
});

// Insert Players
db.insert('players', {
    nome: `Morgana-${Util.random(18, 35)}`, idade: Util.random(18, 35)
}, created => {
    console.log(`Inseriu? ${created}`)
}); */
// FIM Inserir Linhas








// INICIO consultas
/* db.select(`SELECT * FROM pessoas`, resultados => console.log(resultados));

db.select(`SELECT * FROM players`, resultados => console.log(resultados));

db.select(`SELECT count(nome) AS total FROM pessoas WHERE nome = 'Rita'`, resultados => {
    console.log(` A um total de: ${resultados[0]['total']} Ritas.`)}
); */
// FIM consultas


console.log('Fim do test')