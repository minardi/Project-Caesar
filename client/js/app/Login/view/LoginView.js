'use strict';
(function (This) {
    This.LoginView = Backbone.View.extend({
        tagName: 'div',
		//className: '',
        tpl: templates.loginTpl,
		
		events: {
            'click #loginButton': 'tryLogin'
        },
		
        initialize: function () {
        },

        render: function () {
            this.$el.html(this.tpl({}));

            return this;
        },
        
        tryLogin: function () {
            cs.mediator.publish('tryLogin', {
                login: $('#login').val(),
                password: md5($('#password').val())
            });
        }
    });
})(App.Login);