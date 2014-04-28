var Mongoose = require('Mongoose');

var db = Mongoose.connection;

var Tarefa;

db.on('error', console.error);
db.once('open', function() {
	console.log('Conectado ao MongoDB!')
});

var tarefaSchema = new Mongoose.Schema({
	titulo: String,
	descricao: String,
	concluida: Boolean
});

Tarefa = Mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;

Mongoose.connect('mongodb://localhost/nodejsmongo');