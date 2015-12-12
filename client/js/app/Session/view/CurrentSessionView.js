'use strict';
(function (This) {
    This.CurrentSessionView = Backbone.View.extend({
        tagName: 'div',
        className: 'user-info',
        tpl: templates.currentSessionTpl,
        
        events: {
            'click #logoutButton': 'logout'
        },
        
        initialize: function (params) {
            this.model = params.model;
        },

        render: function () {
            this.$el.html(this.tpl(this.model));

            return this;
        },
        
        logout: function () {
            cs.mediator.publish('logoutRequired');
        }
    });
})(App.Session);