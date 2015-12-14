'use strict';
(function (This) {
    var FADE = 400;

    This.InformView = Backbone.View.extend({
        tagName: 'div',
        events: {
            'click .close': 'close',
            'click': 'stopPropagation'
        },
        className: 'message-wrap',

        set: function (message, tpl, type) {
            this.message = message;
            this.tpl = tpl;
            this.type = type;
        },

        render: function () {
            this.$el.html(this.tpl({message: this.message}));

            if (this.type === 'info') {
                this.$('.inform').fadeIn(FADE);
                
                $('html').one('click', this.close.bind(this));

                this.timeout = setTimeout(this.close.bind(this), 3000);
            } else if (this.type === 'warning') {
                this.$('.warning').fadeIn(FADE);
                $('html').one('click', this.close.bind(this));
            } else if (this.type === 'error') {
                this.$('.error').fadeIn(FADE);
                this.$('.darkback-error').one('click', this.close.bind(this));
            }

            return this;
        },

        close: function () {
            this.$el.fadeOut(FADE, function () {
                this.remove();
            });

            clearTimeout(this.timeout);
        },

        stopPropagation: function (event) {
            event.stopPropagation();
        }
    });
})(App.Messanger);