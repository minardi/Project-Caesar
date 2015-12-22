'use strict';
(function (This) {
    var FADE = 400;

    This.InformView = Backbone.View.extend({
        tagName: 'div',
        events: {
            'click': 'close'
        },
        className: 'message-wrap',

        set: function (message, tpl, type) {
            this.message = message;
            this.tpl = tpl;
            this.type = type;
        },

        render: function () {
            var self = this;

            this.$el.html(this.tpl({message: this.message}));

            if (this.type === 'info') {
                this.$('.inform').fadeIn(FADE);
                
                this.timeout = setTimeout(this.close.bind(this), 5000);
            } else if (this.type === 'warning') {
                this.$('.warning').fadeIn(FADE);

            } else if (this.type === 'error') {
                this.$('.error').fadeIn(FADE);

            }

            $(document).on('keydown', this.escHandler.bind(this));

            return this;
        },

        escHandler: function (e) {
            if (e.keyCode === 27) {
                this.close();
            }
        },

        close: function () {
            this.$el.fadeOut(FADE, function () {
                this.remove();
            });

            clearTimeout(this.timeout);

            $(document).off('keydown', this.escHandler.bind(this));
        }
    });
})(App.Messenger);