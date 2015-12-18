'use strict';
(function (This) {
    This.GroupContributorView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        tpl: templates.groupContributorTpl,

        events: {
            'click .js-group': 'renderJSGroup',
            'click .qc-group': 'renderQCGroup'
        },

        renderJSGroup: function () {
            cs.mediator.publish('ShowJSGroup');
        },

        renderQCGroup: function () {
            cs.mediator.publish('ShowQCGroup');
        },

        render: function () {
            this.$el.html(this.tpl());
            return this;
        }
    });
})(App.Contributors);