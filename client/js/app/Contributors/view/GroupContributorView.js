'use strict';
(function (This) {
    This.GroupContributorView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        tpl: templates.groupContributorTpl,

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));
            return this;
        }
    });
})(App.Contributors);