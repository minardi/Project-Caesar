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
            this.model.trigger('editGroup');
            this.closeMenu();
        },

        delete: function () {
            this.model.trigger('deleteGroup');
            this.closeMenu();
        },

        closeMenu: function () {
            this.$('.context-menu').fadeOut(FADE);
        }
    });
})(App.ContextMenu);