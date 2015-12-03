'use strict';
(function (This) {
    This.LoginSuccessView = Backbone.View.extend({
        tagName: 'div',
		//className: '',
        tpl: templates.loginSuccessTpl,
		
		events: {
            'click #logoutButton': 'logout'
        },
		
        initialize: function (params) {
            this.model = params.model;
        },

        render: function (params) {
            if (params.model) {
                this.model = params.model;
            }
            this.$el.html(this.tpl(this.model));

            return this;
        },
        
        logout: function () {
            cs.mediator.publish('logoutRequired');
        }
    });
})(App.Login);