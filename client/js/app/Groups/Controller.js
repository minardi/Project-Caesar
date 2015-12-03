'use strict';
(function (This) {
    This.Controller = function() {
        this.collection = collections.groups;
        this.collectionView = new This.GroupCollectionView();
        this.el = $('.content');
        
        function renderView() {
            this.el.children().first().replaceWith(this.collectionView.render().el);
        }
        
        this.start = function () {
            renderView.call(this);
        };
        
        this.showAll = function () {
            this.collection.fetch()
                .done(renderView.bind(this));
        };
        
        this.showInLocation = function (location) {
            this.collection.fetch({data: {location: location}})
                .done(renderView.bind(this));
        };
        
        return this;
    };
})(App.Groups);
