define([
	'backbone',
	'jquery'
], function(
	Backbone,
	$
) {

	var HomeView = Backbone.View.extend({

		el: $('#body-content'),

		initialize: function() {
		},

		render: function(template) {
			var view = this;
			template.render({}, function(data, html) {
				view.$el.html(html);
			});
		}

	});

	return HomeView;
});