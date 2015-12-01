'use strict';
(function (This) {
    This.Controller = function() {
        this.el = $('#main');
		
		this.start = function () {
		    $('#main').append(((new This.LoginView()).render().el));
		};
		
		return this;
	};
})(App.Login);