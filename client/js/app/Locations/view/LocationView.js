'use strict';
(function (This) {
    This.LocationView = Backbone.View.extend({
        tagName: 'div',
		className: 'location-item col-md-4',
        tpl: templates.locationTpl,
		
		events: {
            'click': 'selectItem',
            'dblclick': 'routeToLocationGroups'
		},
		
        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },

        routeToLocationGroups: function () {
            cs.mediator.publish('ChangedMenu', 'Groups/' + this.model.get('city'));
            cs.mediator.publish('RemoveLocationsView');
        },

        selectItem: function () {
            $('.content-selected-item').removeClass('content-selected-item')
                                       .addClass('content-item');
            this.$('div').removeClass('content-item')
                         .addClass('content-selected-item');            
        }		
    });
})(App.Locations);