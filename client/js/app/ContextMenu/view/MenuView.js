'use strict';
(function (This) {
    var FADE = 400;

    This.MenuView = Backbone.View.extend({
        tagName: 'div',
        events: {
            'click .edit': 'edit',
            'click .delete': 'delete'
        },
        className: 'menu-wrap',
        tpl: templates.contextMenuTpl,

        render: function () {
            this.$el.html(this.tpl());
            this.$el.fadeIn(FADE);

            return this;
        },

        edit: function () {
            cs.mediator.publish('editGroup', this.model);
            this.closeMenu();
        },

        delete: function () {
            cs.mediator.publish('deleteGroup', this.model);
            this.closeMenu();
        },

        closeMenu: function () {
            this.$('.context-menu').fadeOut(FADE);
        }
    });
})(App.ContextMenu);