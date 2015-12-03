'use strict';
(function (This) {
    This.InformView = Backbone.View.extend({
        tagName: 'div',
        
        events: {
            'click .close': 'close'
        },

        set: function (message, tpl, type) {
            this.message = message;
            this.tpl = tpl;
            this.className = 'message-wrap hide-message ' + type + '-message';
        },

        render: function () {
            this.$el.html(this.tpl({message: this.message}));
            this.$el.fadeIn();

            //this.timeout = setTimeout(this.close.bind(this), 3000);

            return this;
        },

        close: function () {
            this.$el.fadeOut();

            clearTimeout(this.timeout);
        }

    });
})(App.Messanger);