'use strict';
(function (This) {
    This.Controller = (function () {
        function Constructor () {
            var loggedIn = Cookies.get('loggedIn');

            if (loggedIn) {
                // todo
            } else {
                cs.router.navigate('/login', {trigger: true});                
            }
            return this;
        }
        
        function clear () {
            var visibleCookies = Cookies.get(),
                cookieName;
                
            for (cookieName in visibleCookies) {
                Cookies.remove(cookieName);
            }
        }
        
        return Constructor;
    })();
})(App.Cookies);