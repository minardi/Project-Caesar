'use strict';
(function (This) {
    This.LocationView = Backbone.View.extend({
        tagName: 'div',
		className: 'location-item col-md-4',
        tpl: templates.locationTpl,
		
		events: {
			'dblclick': 'routeToLocationGroups'
		},
		
        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },

        routeToLocationGroups: function (e) {
            cs.mediator.publish('RouteToLocationGroups', 'Groups/' + this.model.get('city'));
            cs.mediator.publish('RemoveLocationsView');
            e.preventDefault();
        }		
    });
})(App.Locations);