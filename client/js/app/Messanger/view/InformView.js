'use strict';
(function (This) {
    var FADE = 400;

    This.InformView = Backbone.View.extend({
        tagName: 'div',
        events: {
            'click .close': 'close',
            'blur .inform': 'close'
        },
        className: 'message-wrap',

        set: function (message, tpl, type) {
            this.message = message;
            this.tpl = tpl;
            this.type = type;
        },

        render: function () {
            this.$el.html(this.tpl({message: this.message}));

            if (this.type === 'error') {
                this.$el.find('.modal').modal({
                    backdrop: true,
                    show: true,
                    keyboard: true
                });
            } else {
                this.$el.fadeIn(FADE);

                this.$el.find('.modal').modal({
                    backdrop: false,
                    show: true,
                    keyboard: true
                });
            }

            if (this.type === 'info') {
                this.timeout = setTimeout(this.close.bind(this), 3000);
            } 

            return this;
        },

        close: function () {
            this.$el.fadeOut(FADE, function () {
                this.remove();
            });

            clearTimeout(this.timeout);
        }

    });
})(App.Messanger);