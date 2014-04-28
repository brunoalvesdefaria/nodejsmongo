var express = require('express');
var router = express.Router();
var Contato = require('../src/js/contato');
var Tarefa = require('../src/js/tarefa');

/* GET home page. */
router.get('/', function(req, res) {
	res.send('ok');
});

/* GET contatos */
router.get('/contatos', function(req, res) {
	Contato.find({}, function(erro, contatos) {
		res.send(contatos);
	});
});

/* GET contatos/id/:id */
router.get('/contatos/id/:id', function(req, res) {
	Contato.findById(req.params.id, function(erro, contato) {
		res.send(contato);
	});
});

/* TODO: POST|DELETE contatos/excluir/:id */
router.get('/contatos/excluir/:id', function(req, res) {
	Contato.findByIdAndRemove(req.params.id, function(erro, contato) {
		res.send(erro === null ? true : erro);
	});
});

/* TODO: POST|PUT contatos/salvar */
router.get('/contatos/salvar', function(req, res) {
	if(typeof req.query._id === 'undefined') {
		var novoContato = new Contato({
			nome: req.query.nome,
			email: req.query.email,
			telefone: req.query.telefone
		});
		novoContato.save(function(erro, contato) {
			res.send(erro === null ? true : erro);
		});
	}
	else {
		var update = {
			nome: req.query.nome,
			email: req.query.email,
			telefone: req.query.telefone
		};
		Contato.findByIdAndUpdate(req.query._id, update, function(erro, contato) {
			res.send(erro === null ? true : erro);
		});
	}
});

/* GET tarefas */
router.get('/tarefas', function(req, res) {
	Tarefa.find({}, function(erro, tarefas) {
		res.send(tarefas);
	});
});

/* GET tarefas/id/:id */
router.get('/tarefas/id/:id', function(req, res) {
	Tarefa.findById(req.params.id, function(erro, tarefas) {
		res.send(tarefas);
	});
});

/* TODO: POST|DELETE tarefas/excluir/:id */
router.get('/tarefas/excluir/:id', function(req, res) {
	Tarefa.findByIdAndRemove(req.params.id, function(erro, tarefa) {
		res.send(erro === null ? true : erro);
	});
});

/* TODO: POST|PUT tarefas/salvar */
router.get('/tarefas/salvar', function(req, res) {
	if(typeof req.query._id === 'undefined') {
		var novaTarefa = new Tarefa({
			titulo: req.query.titulo,
			descricao: req.query.descricao
		});
		novaTarefa.save(function(erro, tarefa) {
			res.send(erro === null ? true : erro);
		});
	}
	else {
		var update = {
			titulo: req.query.titulo,
			descricao: req.query.descricao
		};
		Tarefa.findByIdAndUpdate(req.query._id, update, function(erro, tarefa) {
			res.send(erro === null ? true : erro);
		});
	}
});

module.exports = router;
