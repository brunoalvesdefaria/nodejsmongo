define([
	'backbone',
	'jquery'
], function(
	Backbone,
	$
) {

	var ContatosView = Backbone.View.extend({

		el: $('#body-content'),

		events: {
			'click #btnSalvarContato': 'salvar'
		},

		initialize: function() {
		},

		render: function(template, params) {
			var view = this;
			var renderer = function(contato) {
				template.render(contato, function(data, html) {
					view.$el.html(html);
				});
			};
			if(params[0] !== null) {
				$.ajax({
					url: '/service/contatos/id/' + params[0],
					cache: false,
					success: renderer
				});
			}
			else {
				renderer();
			}
		},

		salvar: function(event) {
			var data = this.$el.find('form').serialize();
			$.get('/service/contatos/salvar', data, function(data, status, jqXhr) {
				Backbone.history.navigate('contatos');
				Backbone.history.loadUrl('contatos');
			});
			event.preventDefault();
		}

	});

	return ContatosView;

});