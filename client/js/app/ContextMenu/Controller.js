'use strict';
(function (This) {
    This.Controller = Backbone.Controller.extend({
        start: function () {
            this.contextMenuWrap = $('.context-menu-wrap');
        },

        showMenu: function () {
            var menu = new This.MenuView();

            this.contextMenuWrap.append(menu.render().el);
        }
    });
})(App.ContextMenu);