"use strict";

const db = require('./db')

const Util = require('../Util/Math')

const operacao = new db('game');


// Conectar a um DB
//let conectar = operacao.connect('musicas')

// criar tabelas
/* let tabela = operacao.table('pessoas', [
    'nome TEXT', 'idade INTEGER'
]);
console.log(tabela) */
let tabela = operacao.table('players', [
    'nome TEXT', 'idade INTEGER'
]);
console.log(tabela)

// Inserir Linhas
/* let linhas = operacao.insert('pessoas', {
    nome: 'Rita', idade: Util.random()
}) 
console.log(linhas) */

let linhas = operacao.insert('players', {
    nome: 'Morgana', idade: Util.random()
}) 
console.log(linhas)

// Ver as linhas
/* let pessoas = async callback => await operacao.select(`SELECT * FROM pessoas`, callback);

pessoas(resultados => console.log(resultados)) */

let players = async callback => await operacao.select(`SELECT * FROM players`, callback);

players(resultados => console.log(resultados))

/* 
let countpessoas = async callback => await operacao.select(`SELECT count(nome) AS total FROM pessoas WHERE nome = 'Rita'`, callback);

countpessoas(resultados => console.log(resultados)) */