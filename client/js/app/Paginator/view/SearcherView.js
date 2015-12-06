'use strict';
(function (This) {
    This.SearcherView = Backbone.View.extend({
        tagName: 'div',
        className: 'searcher col-md-12',
        tpl: templates.searcherTpl,

        events: {
            'keyup .searchField': 'startSearch',
            'focus .searchField': 'setFocus'
        },

        initialize: function () {
//            $('.searchField').on('focus', this.setFocus);
        },

        render: function (searchValue) {
            this.$el.html(this.tpl({'searchValue': searchValue}));

            return this;
        },

        startSearch: function (e) {
            cs.mediator.publish('StartSearch', $(e.target).val());
        },

        seFocus: function (e) {
            $(e.target).val() = $(e.target).val();
        }
    });
})(App.Paginator);