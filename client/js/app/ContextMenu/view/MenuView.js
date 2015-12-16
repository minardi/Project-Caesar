'use strict';
(function (This) {
    var FADE = 400;

    This.MenuView = Backbone.View.extend({
        tagName: 'div',
        // events: {
        //     'click .close': 'close'
        // },
        className: 'menu-wrap',
        tpl: templates.contextMenuTpl,

        // set: function (message, tpl, type) {
        //     this.message = message;
        //     this.tpl = tpl;
        //     this.type = type;
        // },

        render: function () {
            this.$el.html(this.tpl());
            this.$el.fadeIn(FADE);

            return this;
        }
    });
})(App.ContextMenu);