'use strict';
(function (This) {
    This.LocationView = Backbone.View.extend({
        tagName: 'div',
		className: 'col-md-4',
        tpl: templates.locationTpl,
		
		events: {},
		
        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        }		
    });
})(App.Locations);