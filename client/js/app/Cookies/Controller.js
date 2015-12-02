'use strict';
(function (This) {
    This.Controller = (function () {
        function Constructor () {
            cs.mediator.subscribe('loginSuccess', function () {
                This.Processor.set('loggedIn', 'true');
            });
            
            return this;
        }
        
        Constructor.prototype.checkLogged = function () {
            var loggedIn = This.Processor.get('loggedIn');
            
            if (!loggedIn) {
                //cs.router.navigate('/login', {trigger: true});
                cs.mediator.publish('loginRequired');
            }
        }
        
        Constructor.prototype.clearAll = function () {
            var visibleCookies = Cookies.get(),
                cookieName;
                
            for (cookieName in visibleCookies) {
                Cookies.remove(cookieName);
            }
        }
        
        return Constructor;
    })();
})(App.Cookies);