var express = require('express');
var router = express.Router();
var http = require('http');
var httpProxy = require('http-proxy');
var proxy = new httpProxy.RoutingProxy();

/* GET root */
router.get('/', function(req, res) {
	res.render('routed/home');
});

/* GET home */
router.get('/home', function(req, res) {
	res.render('routed/home');
});

/* GET contatos */
router.get('/contatos', function(req, res) {
	http.get('http://127.0.0.1/service/contatos', function(httpRes) {
		httpRes.on('data', function(contatos) {
			res.render('routed/contatos/lista', {
				contatos: JSON.parse(contatos.toString())
			});
		});
	});
});

/* GET contatos/novo */
router.get('/contatos/novo', function(req, res) {
	res.render('routed/contatos/form');
});

/* GET contatos/editar/:id */
router.get('/contatos/editar/:id', function(req, res) {
	http.get('http://127.0.0.1/service/contatos/id/' + req.params.id, function(httpRes) {
		httpRes.on('data', function(contato) {
			res.render('routed/contatos/form', JSON.parse(contato.toString()));
		});
	});
});

/* GET tarefas */
router.get('/tarefas', function(req, res) {
	http.get('http://127.0.0.1/service/tarefas', function(httpRes) {
		httpRes.on('data', function(tarefas) {
			res.render('routed/tarefas/lista', {
				tarefas: JSON.parse(tarefas.toString())
			});
		});
	});
});

/* GET tarefas/novo */
router.get('/tarefas/novo', function(req, res) {
	res.render('routed/tarefas/form');
});

/* GET tarefas/editar/:id */
router.get('/tarefas/editar/:id', function(req, res) {
	http.get('http://127.0.0.1/service/tarefas/id/' + req.params.id, function(httpRes) {
		httpRes.on('data', function(tarefa) {
			res.render('routed/tarefas/form', JSON.parse(tarefa.toString()));
		});
	});
});

var serviceProxy = function(req, res) {
	req.url = req.url.replace('/service', '');
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);
	proxy.proxyRequest(req, res, {
		host: '127.0.0.1',
		port: 8080
	});
};

/* GET service */
router.get('/service/*', serviceProxy);

/* POST service */
router.post('/service/*', serviceProxy);

module.exports = router;
