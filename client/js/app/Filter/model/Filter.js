'use strict';
(function (This) {
    This.Filter = Backbone.Model.extend({
        defaults: function () {
            return {
                collection: null,
                currentPage: 0,
                pageSize: 6,
                searchField: '',
                searchString: '',
                maxPage: 0,
                filteredCollection: [],
                viewName: ''
            };
        },

        filterCollection: function () {
            var currentCollection = this.get('collection'),
                pagedCollection = [],
                searchedCollection,
                startPosition,
                endPosition,
                i;
            
            if (this.get('searchString') == "") {
                searchedCollection = Array.isArray(currentCollection) ? currentCollection : currentCollection.toArray();
            } else {
                searchedCollection = currentCollection.filter(this.filterByAttribute.bind(this));                
            }
     
            this.set('maxPage', Math.ceil(searchedCollection.length / this.get('pageSize')));

            startPosition = this.get('currentPage') * this.get('pageSize');
            while (!searchedCollection.length && searchedCollection.length < startPosition) {
                startPosition = --this.get('currentPage') * this.get('pageSize');
            };

            endPosition = Math.min(startPosition + this.get('pageSize'), searchedCollection.length);

            for(i = startPosition; i < endPosition; i ++){
                pagedCollection.push(searchedCollection[i]);
            };
            this.set('filteredCollection', pagedCollection);
        },

        filterByAttribute: function (model) {
            return model.get(this.get('searchField')).toLowerCase().indexOf(this.get('searchString').toLowerCase()) >= 0;    
        }
    });
})(App.Filter);