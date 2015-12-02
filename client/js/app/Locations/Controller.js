'use strict';
(function (This) {
    This.Controller = function() {
        this.collection = collections.locationsCollection;
        this.collectionView = new This.LocationCollectionView();
        this.el = $('.col-md-8');
		
		this.start = function () {
		    this.el.append((this.collectionView.render().el));
		};

		this.showAll = function () {
			this.el.html((this.collectionView.render().el));	
		};
		
		return this;
	};
})(App.Locations);