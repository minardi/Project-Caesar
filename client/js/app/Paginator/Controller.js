'use strict';
(function (This) {
    This.Controller = function (params) {
        var filteredCollection,
            pageCollection = [];

        this.paginatorModel = new This.PaginatorModel(params); 

        this.set = function (attributes) {
            this.paginatorModel.set(attributes);
        };

        this.renderPaginator = function () {
            var paginatorView = new This.PaginatorView(),
                maxPage = Math.ceil(filteredCollection.length / this.paginatorModel.get('pageSize'));    

            return paginatorView.render(maxPage, this.paginatorModel.get('currentPage')).el;
        };

        this.renderSearcher = function () {
            var searcherView = new This.SearcherView();

            return searcherView.render(this.paginatorModel.get('searchString')).el;
        };

        this.filterCollection = function () {
            var startPosition,
                endPosition,
                i;

            pageCollection = [];
            filteredCollection = search(this.paginatorModel.get('collection'), this.paginatorModel.get('searchField'), this.paginatorModel.get('searchString'));                

            startPosition = this.paginatorModel.get('currentPage') * this.paginatorModel.get('pageSize');
            while (!filteredCollection.length && filteredCollection.length < startPosition) {
                startPosition = --this.paginatorModel.get('currentPage') * this.paginatorModel.get('pageSize');
            };

            endPosition = Math.min(startPosition + this.paginatorModel.get('pageSize'), filteredCollection.length);

            for(i = startPosition; i < endPosition; i ++){
                pageCollection.push(filteredCollection[i]);
            };

            return pageCollection;
        };

        function search (collection, searchField, searchString) {
            if (searchString == "") return collection.toArray();
     
            return collection.filter(function(model) {
                return model.get(searchField).toLowerCase().indexOf(searchString.toLowerCase()) >= 0;                
            });
        }

        return this;
    };
})(App.Paginator);