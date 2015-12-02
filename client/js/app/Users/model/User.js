'use strict';
(function (This) {
    This.User = (function () {       
        function Constructor (params) {
            var attributes = {
                name: params.name || '',
                lastName: params.lastName || '',
                role: params.role || This.Roles.GUEST,
                location: {
                    city: params.city || '',
                    country: params.country || ''
                }
            };
            
            this.getRole = function () {
                return role;
            };
            
            return this;
        }
        
        return Constructor;
    })();
})(App.Users);