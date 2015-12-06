'use strict';
(function (This) {
    This.PaginatorView = Backbone.View.extend({
        tagName: 'div',
        className: 'paginator col-md-12',
        tpl: templates.paginatorTpl,

        events: {
            'click .pageEl': 'changePage'
        },

        initialize: function () {
        },

        render: function (maxPage, currentPage) {
            this.$el.html(this.tpl({
                'maxPage': maxPage,
                'currentPage': currentPage
            }));

            return this;
        },

        changePage: function (e) {
            cs.mediator.publish('ChangePaginatorPage', e.currentTarget.value-1);
        }		
    });
})(App.Paginator);