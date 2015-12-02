'use strict';
(function (This) {
    This.InformationView = Backbone.View.extend({
        tagName: 'div',
        className: 'message-wrap hide-message',
        tpl: templates.informTpl,
        
        events: {
            'click .close': 'close'
        },

        set: function (message) {
            this.message = message;
        },

        render: function () {
            this.$el.html(this.tpl({message: this.message}));
            this.$el.fadeIn();

            this.timeout = setTimeout(this.close.bind(this), 3000);

            return this;
        },

        close: function () {
            this.$el.fadeOut();

            clearTimeout(this.timeout);
        }

    });
})(App.Notifications);