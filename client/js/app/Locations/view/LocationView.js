'use strict';
(function (This) {
    This.LocationView = Backbone.View.extend({
        tagName: 'div',
		className: '',
        tpl: templates.locationTpl,
		
		events: {},
		
        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        }		
    });
})(App.Locations);