'use strict';
(function (This) {
    This.ConfirmView = Backbone.View.extend({
        tagName: 'div',
        className: 'message-wrap hide-message',
        tpl: templates.confirmTpl,
        
        events: {
            'click .close': 'close',
            'click .close-btn': 'close',
            'click .confirm': 'confirm'
        },

        set: function (message, callback) {
            this.message = message;
            this.callback = callback;
        },

        render: function () {
            this.$el.html(this.tpl({message: this.message}));
            this.$el.fadeIn();


            return this;
        },

        close: function () {
            this.$el.fadeOut();

        },

        confirm: function () {
            this.callback();
            this.close();
        }

    });
})(App.Messanger);