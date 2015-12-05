'use strict';
(function (This) {
    This.LocationCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'locations row content-row',
        tpl: templates.locationCollectionTpl,

        initialize: function () {
            this.collection = collections.locations;
            cs.mediator.subscribe('RemoveLocationsView', this.removeView, {}, this);
        },

        render: function () {
            this.$el.html(this.tpl());
            this.collection.forEach(this.renderOne, this);
			
            return this;
        },
		
        renderOne: function (location) {
            var locationView = new This.LocationView({model: location});
            this.$el.append(locationView.render().el);
        },

        removeView: function () {
            this.remove();
        },

        selectItem: function (e) {
            $('.content-selected-item', this.$el).removeClass('content-selected-item')
                                                 .addClass('content-item');
            e.currentTarget.firstElementChild.classList.remove('content-item');
            e.currentTarget.firstElementChild.classList.add('content-selected-item');
        }
    });
})(App.Locations);