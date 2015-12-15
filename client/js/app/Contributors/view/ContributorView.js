'use strict';
(function (This) {
    This.ContributorView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        tpl: templates.contributorTpl,

        events: {
        },

        render: function () {
            this.$el.html(this.tpl(this.model));
            return this;
        }
    });
})(App.Contributors);