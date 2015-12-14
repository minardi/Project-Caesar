'use strict';
(function (This) {
    var FADE = 400;

    This.ConfirmView = Backbone.View.extend({
        tagName: 'div',
        className: 'message-wrap hide-message',
        tpl: templates.confirmTpl,

        events: {
            'click .closeBtn': 'close',
            'click .okBtn': 'ok',
            'click .close': 'close'
        },

        set: function (message, okCallback, closeCallback) {
            this.message = message;
            this.okCallback = okCallback;
            this.closeCallback = closeCallback;
        },

        render: function () {
            this.$el.html(this.tpl({message: this.message}));
            this.$('.confirm').fadeIn(FADE);
        
            return this;
        },

        close: function () {
            this.closeCallback();
            this.$el.fadeOut(FADE, function () {
                this.remove();
            });
        },

        ok: function () {
            this.okCallback();
            this.$el.fadeOut(FADE, function () {
                this.remove();
            });
        }
    });
})(App.Messanger);