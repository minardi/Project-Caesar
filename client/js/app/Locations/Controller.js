'use strict';
(function (This) {
    This.Controller = function() {
        this.collectionView = new This.LocationCollectionView();
        this.$el = $('#main-container');

        this.showAll = function () {
            this.$el.empty();
            this.collectionView.delegateEvents();
            this.$el.append(this.collectionView.render().el);
        };

        return this;
    };
})(App.Locations);