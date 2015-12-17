'use strict';
(function (This) {
    This.Controller = Backbone.Controller.extend({
        start: function (wrap, model) {
            this.contextMenuWrap = wrap;
            this.model = model;
        },

        addMenu: function () {
            var menu = new This.MenuView({
                model: this.model
            });

            this.contextMenuWrap.append(menu.render().el);
        }
    });
})(App.ContextMenu);