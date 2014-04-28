define([
	'backbone',
	'jquery'
], function(
	Backbone,
	$
) {

	var GlobalRouter = Backbone.Router.extend({

		firstLoad: true,

		$menus: $('#body-header .navbar-nav li'),

		views: {},

		routeMap: [
			{
				route: 'home',
				name: 'home',
				view: '/js/backbone/view/home.js',
				template: 'rdust!public/home'
			},
			{
				route: 'contatos',
				name: 'contatosLista',
				view: '/js/backbone/view/contatos/lista.js',
				template: 'rdust!public/contatos/lista'
			},
			{
				route: 'contatos/novo',
				name: 'contatosForm',
				view: '/js/backbone/view/contatos/form.js',
				template: 'rdust!public/contatos/form'
			},
			{
				route: 'contatos/editar/:id',
				name: 'contatosForm',
				view: '/js/backbone/view/contatos/form.js',
				template: 'rdust!public/contatos/form'
			},
			{
				route: 'tarefas',
				name: 'tarefas',
				view: '/js/backbone/view/tarefas/lista.js',
				template: 'rdust!public/tarefas/lista'
			},
			{
				route: 'tarefas/novo',
				name: 'tarefasForm',
				view: '/js/backbone/view/tarefas/form.js',
				template: 'rdust!public/tarefas/form'
			},
			{
				route: 'tarefas/editar/:id',
				name: 'tarefasForm',
				view: '/js/backbone/view/tarefas/form.js',
				template: 'rdust!public/tarefas/form'
			}
		],

		// Setup
		initialize: function() {
			var appRoot = '/';

			this.bindEvents(appRoot);

			for(var i=0; i<this.routeMap.length; i++) {
				var map = this.routeMap[i];
				this.route(map.route, map.name, this.simpleRoute(map));
			}

			Backbone.history.start({pushState: true, root: appRoot});
		},

		bindEvents: function(appRoot) {
			$(document).on('click', 'a[href]:not([data-bypass])', function(event) {
				var root = window.location.protocol + "//" + window.location.host + appRoot,
				href = {
					prop: $(this).prop("href"),
					attr: $(this).attr("href")
				};
				if (href.prop.slice(0, root.length) === root) {
					event.preventDefault();
					Backbone.history.navigate(href.attr, true);
				}
			});
		},

		simpleRoute: function(map) {
			var globalRouter = this;
			return function(args) {
				var params = arguments;
				require([
					map.view,
					map.template
				], function(
					View,
					template
				) {
					if(!globalRouter.views[map.name]) {
						globalRouter.views[map.name] = new View();
					}
					if(globalRouter.firstLoad) {
						globalRouter.firstLoad = false;
					}
					else {
						globalRouter.views[map.name].render(template, params);
					}
				});
			};
		},

		routes: {
			'': 'index'
		},

		route: function(route, name, callback) {
			var globalRouter = this;
			return Backbone.Router.prototype.route.call(this, route, name, function() {
				this.trigger.apply(this, ['beforeroute'].concat(_.toArray(arguments)));
				if (!callback) callback = this[name];
				if (callback) callback.apply(this, arguments);
				globalRouter.afterRoute(route);
			});
		},

		afterRoute: function(route) {
			this.$menus.removeClass('active');
			this.$menus.children('a[href="#' + route + '"]').parent().addClass('active');
		},

		index: function() {
			this.firstLoad = false;
		}

	});

	return GlobalRouter;

});
