define([
	'backbone',
	'jquery'
], function(
	Backbone,
	$
) {

	var TarefasView = Backbone.View.extend({

		el: $('#body-content'),

		events: {
			'click .lista-tarefas .item': 'selecionar',
			'click .lista-tarefas .item h3': 'alternar',
			'click #btnEditarTarefa': 'editar',
			'click #btnExcluirTarefa': 'excluir',
			'click #confirmaExclusaoTarefa .btn-primary': 'confirmaExclusao'
		},

		initialize: function() {
		},

		render: function(template) {
			var view = this;
			$.ajax({
				url: '/service/tarefas',
				cache: false,
				success: function(tarefas) {
					template.render({
						tarefas: tarefas
					}, function(data, html) {
						view.$el.html(html);
					});
				}
			});
		},

		alternar: function(event) {
			$(event.currentTarget).closest('.item').toggleClass('done');
		},

		selecionar: function(event) {
			this.$el.find('.lista-tarefas .item').removeClass('active');
			$(event.currentTarget).addClass('active');
			$('#btnEditarTarefa, #btnExcluirTarefa').removeAttr('disabled');
		},

		editar: function(event) {
			var id = this.$el.find('.lista-tarefas .item.active').data('id'),
			path = 'tarefas/editar/' + id;
			Backbone.history.navigate(path);
			Backbone.history.loadUrl(path);
		},

		excluir: function(event) {
			$('#confirmaExclusaoTarefa').modal();
		},

		confirmaExclusao: function(event) {
			var $item = this.$el.find('.lista-tarefas .item.active'),
			id = $item.data('id');
			$.get('/service/tarefas/excluir/' + id, function(data, status, jqXhr) {
				$item.parent().remove();
				$('#confirmaExclusaoTarefa').modal('hide');
				$('#btnEditarTarefa, #btnExcluirTarefa').attr('disabled', 'disabled');
			});
		}

	});

	return TarefasView;

});