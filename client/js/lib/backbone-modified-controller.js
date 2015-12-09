'use strict';

(function (This) {
    This.Controller = Backbone.Model.extend({
        parentMethod: function () {
            console.log('Follow the white rabbit');
        }
    }); 
})(App.Common);
