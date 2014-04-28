define([
	'backbone',
	'jquery'
], function(
	Backbone,
	$
) {

	var tarefasView = Backbone.View.extend({

		el: $('#body-content'),

		events: {
			'click #btnSalvarTarefa': 'salvar'
		},

		initialize: function() {
		},

		render: function(template, params) {
			var view = this;
			var renderer = function(tarefa) {
				template.render(tarefa, function(data, html) {
					view.$el.html(html);
				});
			};
			if(params[0] !== null) {
				$.ajax({
					url: '/service/tarefas/id/' + params[0],
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
			$.get('/service/tarefas/salvar', data, function(data, status, jqXhr) {
				Backbone.history.navigate('tarefas');
				Backbone.history.loadUrl('tarefas');
			});
			event.preventDefault();
		}

	});

	return tarefasView;

});