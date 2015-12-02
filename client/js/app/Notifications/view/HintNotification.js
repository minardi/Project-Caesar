'use strict';
(function (This) {
    This.HintNotification = Backbone.View.extend({
        tagName: 'div',
        className: 'tooltip-wrapper hide-message',
        tpl: templates.hintTpl,

        set: function (message, element) {
            this.message = message;
            this.element = element;
        },

        render: function () {
            var offset = this.element.offset();

            this.$el.html(this.tpl({message: this.message}));
            this.$el.fadeIn(100);

            this.$el.css({
                top: offset.top + 20 + 'px',
                left: offset.left + 'px'
            });

            return this;
        }
    });
})(App.Notifications);