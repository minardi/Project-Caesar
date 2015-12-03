'use strict';
(function (This) {
    This.LocationView = Backbone.View.extend({
        tagName: 'div',
		className: 'col-md-4',
        tpl: templates.locationTpl,
		
		events: {
			'click .content-item': 'routeToLocationGroups'
		},
		
        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },

        routeToLocationGroups: function () {
            cs.mediator.publish('RouteToLocationGroups', this.model.city);
            console.log(this.model.get('city'));
        }		
    });
})(App.Locations);