'use strict';
(function (This) {
    This.LocationCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'locations row content-row',
        tpl: templates.locationCollectionTpl,

        events: {
            'click .location-item': 'selectItem'
        },

        initialize: function () {
            this.collection = collections.locations;
            cs.mediator.subscribe('RemoveLocationsView', this.removeView, {}, this);
        },

        render: function () {
            this.$el.empty().append(this.tpl());
//            this.$el.html(this.tpl());
            this.collection.forEach(this.renderOne, this);
			
            return this;
        },
		
        renderOne: function (location) {
            var locationView = new This.LocationView({model: location});
            this.$el.append(locationView.render().el);
        },

        removeView: function () {
//            this.remove();
        },

        selectItem: function (e) {
            $('.content-selected-item', this.$el).removeClass('content-selected-item')
                                                 .addClass('content-item');
            e.currentTarget.firstElementChild.classList.remove('content-item');
            e.currentTarget.firstElementChild.classList.add('content-selected-item');
/*
            $('.location-item', this.$el).removeClass('content-item')
                                         .removeClass('content-selected-item')
                                         .addClass(function () {
                                             return (this === e.this ? 'content-selected-item' : 'content-item');
                                         });
*/                                         
        }
    });
})(App.Locations);