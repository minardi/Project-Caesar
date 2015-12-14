'use strict';
(function (This) {
    This.PaginatorView = Backbone.View.extend({
        tagName: 'div',
        className: 'paginator col-md-12',
        tpl: templates.paginatorTpl,

        events: {
            'click .pageEl': 'changePage',
            'click .prev': 'prevPage',
            'click .next': 'nextPage'
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
        },

        prevPage: function () {
            cs.mediator.publish(this.model.get('viewName') + 'PrevPage');
        },
        
        nextPage: function () {
            cs.mediator.publish(this.model.get('viewName') + 'NextPage');
        }        
    });
})(App.Filter);