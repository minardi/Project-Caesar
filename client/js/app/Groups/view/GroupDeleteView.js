'use strict';
(function (This) {
    This.GroupDeleteView = Backbone.View.extend({
        tagName: 'div',
        tpl: templates.groupDeleteTpl,

        events: {
            'click .delete': 'deleteGroup'
        },

        render: function () {
            this.$el.html(this.tpl());

            return this;
        },

        deleteGroup: function () {
            this.model.destroy({wait: true});
            this.$el.find('.modal').modal('hide');
        }
    });
})(App.Groups);