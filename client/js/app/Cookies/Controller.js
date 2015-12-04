'use strict';
(function (This) {
    This.Controller = (function () {
        function Constructor () {
            cs.mediator.subscribe('logoutRequired', (function () {
                this.clearAll();
                window.location.href = '/';
            }).bind(this));
            
            return this;
        }
        
        Constructor.prototype.clearAll = function () {
            var visibleCookies = This.Processor.get(),
                cookieName;
                
            for (cookieName in visibleCookies) {
                This.Processor.remove(cookieName);
            }
        };
        
        Constructor.get = function (cookie) {
            console.log(This.Processor.get(cookie));
            return This.Processor.get(cookie);
        };
        
        return Constructor;
    })();
})(App.Cookies);