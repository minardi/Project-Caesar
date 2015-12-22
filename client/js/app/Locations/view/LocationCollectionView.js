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
            cs.mediator.subscribe('locationsPrevPage', this.prevPage, {}, this);
            cs.mediator.subscribe('locationsNextPage', this.nextPage, {}, this);
            cs.mediator.subscribe('locationsStartSearch', this.startSearch, {}, this);
            cs.mediator.subscribe('RemoveLocationsView', this.removeView, {}, this);
        },

        render: function () {
            this.$el.html(this.tpl());
            this.$('.searcher').append(this.filter.renderSearcher());
            
            collections.groups.fetch({success: function () {
                    this.renderAll(this.filter.getCollection());
                }.bind(this)
            });

            this.$('#my-location').on('click', this.routeToMyLocation.bind(this));
            this.$('#my-groups').on('click', this.routeToMyGroups.bind(this));

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

        prevPage: function () {
            var currentPage = this.filter.get('currentPage');

            if (currentPage > 0) {
                this.filter.set({'currentPage': --currentPage});
                this.renderAll(this.filter.getCollection());                            
            }
        },

        nextPage: function () {
            var currentPage = this.filter.get('currentPage'),
                maxPage = this.filter.get('maxPage') - 1;
             
            if (currentPage < maxPage) {
                this.filter.set({'currentPage': ++currentPage});
                this.renderAll(this.filter.getCollection());                            
            }
        },

        startSearch: function (searchString) {

            this.filter.set({'searchString': searchString});
            this.filter.set({'currentPage': 0});
            this.renderAll(this.filter.getCollection());            
        },

        removeView: function () {
            this.remove();
        },

        routeToMyLocation: function () {
            var userLocation = cs.currentUser.getLocation();

            cs.mediator.publish('SelectedMenu', 'Groups/' + userLocation['city']);
            this.remove();
        },

        routeToMyGroups: function () {
            cs.mediator.publish('SelectedMenu', 'Groups/my');
            this.remove();
        }
    });
})(App.Locations, App.Filter);