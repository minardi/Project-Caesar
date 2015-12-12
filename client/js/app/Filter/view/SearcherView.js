'use strict';
(function (This) {
    This.SearcherView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-4 pull-right',
        tpl: templates.searcherTpl,

        events: {
            'keyup .searchField': 'startSearch',
            'click #searchclear': 'clearInput'
         },

        render: function (filter) {
            this.$el.html(this.tpl({'searchValue': filter.get('searchString')}));
            this.$('#searchclear').css('visibility', (filter.get('searchString').length) ? "visible" : "hidden");
            return this;
        },

        startSearch: function (e) {
            $(e.target.nextSibling).css('visibility', ($(e.target).val().length) ? "visible" : "hidden");
            cs.mediator.publish(this.model.get('viewName') + 'StartSearch', $(e.target).val());
        },

        clearInput: function (e) {
            $(e.target).css('visibility', 'hidden');
            $(e.target.previousSibling).val('');
            $(e.target.previousSibling).focus();
            cs.mediator.publish(this.model.get('viewName') + 'StartSearch', '');
        }      
    });
})(App.Filter);