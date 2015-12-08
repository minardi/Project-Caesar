'use strict';
(function (This) {
    This.SearcherView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-4 pull-right',
        tpl: templates.searcherTpl,

        events: {
            'keyup .searchField': 'startSearch'
         },

        render: function (filter) {
            this.$el.html(this.tpl({'searchValue': filter.get('searchString')}));

            return this;
        },

        startSearch: function (e) {
            cs.mediator.publish(this.model.get('viewName') + 'StartSearch', $(e.target).val());
        }
    });
})(App.Filter);