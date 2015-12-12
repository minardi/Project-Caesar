'use strict';
(function (This) {
    This.PaginatorView = Backbone.View.extend({
        tagName: 'div',
        className: 'paginator col-md-12',
        tpl: templates.paginatorTpl,

        events: {
            'click .pageEl': 'changePage'
        },

        render: function (filter) {
            this.$el.html(this.tpl({
                'maxPage': filter.get('maxPage'),
                'currentPage': filter.get('currentPage')
            }));

            return this;
        },

        changePage: function (e) {
            cs.mediator.publish(this.model.get('viewName') + 'ChangePage', e.currentTarget.value-1);
        }        
    });
})(App.Filter);