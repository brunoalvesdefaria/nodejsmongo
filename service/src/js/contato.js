var Mongoose = require('Mongoose');

var db = Mongoose.connection;

var Contato;

db.on('error', console.error);
db.once('open', function() {
	console.log('Conectado ao MongoDB!')
});

var contatoSchema = new Mongoose.Schema({
	nome: String,
	email: String,
	telefone: String
});

Contato = Mongoose.model('Contato', contatoSchema);

module.exports = Contato;

Mongoose.connect('mongodb://localhost/nodejsmongo');