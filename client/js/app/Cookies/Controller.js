'use strict';
(function (This) {
    This.Controller = (function () {
        function Constructor () {
            cs.mediator.subscribe('loginSuccessed', function () {
                This.Processor.set('loggedIn', 'true');
                This.Processor.set('sessionID', cs.currentUser.getSessionID());
            });
            cs.mediator.subscribe('logoutRequired', (function () {
                this.clearAll();
                alert('Logged out');
            }).bind(this));
            
            return this;
        }
        
        Constructor.prototype.checkLogged = function () {
            var loggedIn = This.Processor.get('loggedIn'),
                sessionID = This.Processor.get('sessionID');
            
            if (!loggedIn) {
                //cs.router.navigate('/login', {trigger: true});
                cs.mediator.publish('loginRequired');
            } else {
                cs.mediator.publish('continueSessionRequired', {
                    'sessionID': sessionID
                });
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