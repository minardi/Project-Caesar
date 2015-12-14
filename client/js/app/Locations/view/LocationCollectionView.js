'use strict';
(function (This, Filter) {
    This.LocationCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'center-content',
        tpl: templates.locationCollectionTpl,


        initialize: function () {
            this.collection = collections.locations;
            this.filter = new Filter.Controller({
                'collection': this.collection,
                'pageSize': 9,
                'searchField': 'city',
                'viewName': 'locations'
            });

            cs.mediator.subscribe('locationsChangePage', this.changePage, {}, this);
            cs.mediator.subscribe('locationsStartSearch', this.startSearch, {}, this);
            cs.mediator.subscribe('RemoveLocationsView', this.removeView, {}, this);
        },

        render: function () {
            this.$el.html(this.tpl());
            this.$('.searcher').append(this.filter.renderSearcher());
            this.renderAll(this.filter.getCollection());

            return this;
        },
        
        renderAll: function (collection) {
            this.$('.locations-list').empty();
            collection.forEach(this.renderOne, this);
            this.$('nav').html(this.filter.renderPaginator());
        },

        renderOne: function (location) {
            var locationView = new This.LocationView({model: location});
            this.$('.locations-list').append(locationView.render().el);
        },

        changePage: function (currentPage) {
            this.filter.set({'currentPage': currentPage});
            this.renderAll(this.filter.getCollection());            
        },

        startSearch: function (searchString) {
            this.filter.set({'searchString': searchString});
            this.filter.set({'currentPage': 0});
            this.renderAll(this.filter.getCollection());            
        },

        removeView: function () {
            this.remove();
        }
    });
})(App.Locations, App.Filter);