'use strict';
(function (This) {
    This.Controller = function() {
        this.collection = collections.locations;
        this.collectionView = new This.LocationCollectionView();
        this.$el = $('#main-container');

        this.showAll = function () {
            this.$el.empty().append(this.collectionView.render().el);
        };

        return this;
    };
})(App.Locations);