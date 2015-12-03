'use strict';
(function (This) {
    This.Controller = (function () {
        function Constructor () {
            cs.mediator.subscribe('logoutRequired', (function () {
                this.clearAll();
                //alert('Logged out');
                window.location.href = '/';
            }).bind(this));
            
            return this;
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