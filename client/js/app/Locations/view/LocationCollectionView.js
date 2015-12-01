'use strict';
(function (This) {
    This.LocationCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'locations',
        tpl: templates.locationCollectionTpl,

        initialize: function () {
            this.collection = collections.locations;
            this.listenTo(this.collection, 'add', this.renderOne);
        },

        render: function () {
            this.$el.html(this.tpl());
            this.collection.forEach(this.renderOne, this);
			
            return this;
        },
		
        renderOne: function (model) {
            var locationView = new This.LocationView({model: model});
            this.$('.location-list').append(locationView.render().el);
        }
    });
})(App.Locations);