'use strict';
(function (This) {
    This.PaginatorModel = Backbone.Model.extend({
        defaults: function () {
            return {
                currentPage: 0,
                pageSize: 6,
                collection: null,
                searchField: '',
                searchString: ''
            };
        }
    });
})(App.Paginator);