'use strict';
(function (This) {
    This.Controller = function (params) {

        this.filter = new This.Filter(params); 

        this.set = function (attributes) {
            this.filter.set(attributes);
        };

        this.renderPaginator = function () {
            var paginatorView = new This.PaginatorView({model: this.filter});
                    
            return paginatorView.render(this.filter).el;
        };

        this.renderSearcher = function () {
            var searcherView = new This.SearcherView({model: this.filter});

            return searcherView.render(this.filter).el;
        };

        this.getCollection = function () {
            this.filter.filterCollection();
            
            return this.filter.get('filteredCollection');
        }

        return this;
    };
})(App.Filter);