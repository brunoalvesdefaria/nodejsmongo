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
			'click table tbody tr': 'selecionar',
			'click #btnEditarContato': 'editar',
			'click #btnExcluirContato': 'excluir',
			'click #confirmaExclusaoContato .btn-primary': 'confirmaExclusao'
		},

		initialize: function() {
		},

		render: function(template) {
			var view = this;
			$.ajax({
				url: '/service/contatos',
				cache: false,
				success: function(contatos) {
					template.render({
						contatos: contatos
					}, function(data, html) {
						view.$el.html(html);
					});
				}
			});
		},

		selecionar: function(event) {
			this.$el.find('table tr').removeClass('active');
			$(event.currentTarget).addClass('active');
			$('#btnEditarContato, #btnExcluirContato').removeAttr('disabled');
		},

		editar: function(event) {
			var id = this.$el.find('table tr.active').data('id'),
			path = 'contatos/editar/' + id;
			Backbone.history.navigate(path);
			Backbone.history.loadUrl(path);
		},

		excluir: function(event) {
			$('#confirmaExclusaoContato').modal();
		},

		confirmaExclusao: function(event) {
			var $tr = this.$el.find('table tbody tr.active'),
			id = $tr.data('id');
			$.get('/service/contatos/excluir/' + id, function(data, status, jqXhr) {
				$tr.remove();
				$('#confirmaExclusaoContato').modal('hide');
				$('#btnEditarContato, #btnExcluirContato').attr('disabled', 'disabled');
			});
		}

	});

	return ContatosView;

});