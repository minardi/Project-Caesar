'use strict';
(function (This) {
    This.Controller = function() {
        this.collection = collections.groups;
        this.collectionView = new This.GroupCollectionView();
        this.el = $('.content');
		
		this.start = function () {
		    this.el.append((this.collectionView.render().el));
		};
		
		this.showGroupsInLocation = function (location) {
			var el = this.el;
			$.ajax({
			  url: '/groups/' + location,
			}).done((function(data) {
				var groupsInLocation = new App.Groups.GroupCollection(data);
				this.el.children().first().replaceWith((this.collectionView.render(groupsInLocation).el));	
			}).bind(this));
		};
		
		return this;
		
		function appendGroupElement(data) {
		}

	};
})(App.Groups);
