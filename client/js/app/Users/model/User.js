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
                },
                sessionID: params.sessionID || ''
            };
            
            this.getRole = function () {
                return attributes.role;
            };
            
            this.getName = function () {
                return attributes.name + ' ' + attributes.lastName;
            };
            
            this.getLocation = function () {
                return attributes.location;
            };
            
            this.getSessionID = function () {
                return attributes.sessionID;
            };
            
            this.hasRoleOf = function (role) {
                return (attributes.role === role);
            };
            
            this.isLocatedIn = function (location) {
                return ((atttributes.location.city === location) ||
                    (atttributes.location.country === location));
            };
            
            this.toJSON = function () {
                return {
                    name: this.getName(),
                    role: this.getRole(),
                    location: this.getLocation()
                };
            };
            
            return this;
        }
        
        return Constructor;
    })();
})(App.Users);
