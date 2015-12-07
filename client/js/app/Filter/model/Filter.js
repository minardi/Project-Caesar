'use strict';
(function (This) {
    This.Filter = Backbone.Model.extend({
        defaults: function () {
            return {
                currentPage: 0,
                pageSize: 6,
                collection: null,
                filteredCollection: [],
                searchField: '',
                searchString: '',
                maxPage: 0
            };
        },

        filterCollection: function () {
            var pagedCollection = [],
                searchedCollection,
                startPosition,
                endPosition,
                i;

            if (this.get('searchString') == "") {
                searchedCollection = this.get('collection').toArray();
            } else {
                searchedCollection = this.get('collection').filter(this.filterByAttribute.bind(this));                
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