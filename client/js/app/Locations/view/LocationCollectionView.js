'use strict';
(function (This) {
    This.LocationCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'locations row content-row',
        tpl: templates.locationCollectionTpl,

        initialize: function () {
            this.collection = collections.locations;
        },

        render: function () {
            this.$el.html(this.tpl());
            this.collection.forEach(this.renderOne, this);
			
            return this;
        },
		
        renderOne: function (location) {
            var locationView = new This.LocationView({model: location});
            this.$el.append(locationView.render().el);
        }
    });
})(App.Locations);