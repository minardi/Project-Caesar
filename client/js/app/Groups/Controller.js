'use strict';
(function (This) {
    This.Controller = function() {
        this.collection = collections.groups;
        this.collectionView = new This.GroupCollectionView();
        this.el = $('#main');
		
		this.start = function () {
		    this.el.append((this.collectionView.render().el));
		};
		
		return this;
	};
})(App.Groups);
