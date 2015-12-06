'use strict';
(function (This) {
    This.LocationCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'locations row content-row',
        tpl: templates.locationCollectionTpl,


        initialize: function () {
            this.collection = collections.locations;
            this.paginator = new App.Paginator.Controller({
                'collection': this.collection,
                'pageSize': 6,
                'searchField': 'city'
            });

            cs.mediator.subscribe('ChangePaginatorPage', this.changePage, {}, this);
            cs.mediator.subscribe('StartSearch', this.startSearch, {}, this);
            cs.mediator.subscribe('RemoveLocationsView', this.removeView, {}, this);
        },

        render: function () {
            var filteredCollection = this.paginator.filterCollection();

            this.$el.html(this.tpl());

            this.$el.append(this.paginator.renderSearcher());
            filteredCollection.forEach(this.renderOne, this);
			this.$el.append(this.paginator.renderPaginator());

            return this;
        },
		
        renderOne: function (location) {
            var locationView = new This.LocationView({model: location});
            this.$el.append(locationView.render().el);
        },

        changePage: function (currentPage) {
            this.paginator.set({'currentPage': currentPage});
            this.render();            
        },

        startSearch: function (searchString) {
            this.paginator.set({'searchString': searchString});
            this.paginator.set({'currentPage': 0});
            this.render();            
        },

        removeView: function () {
            this.remove();
        }
    });
})(App.Locations);