'use strict';
(function (This) {
    This.ContributorView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-4',
        tpl: templates.contributorTpl,

        events: {
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));
            return this;
        }
    });
})(App.Contributors);