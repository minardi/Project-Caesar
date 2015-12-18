'use strict';
(function (This)  {
    This.Direction = Backbone.Model.extend({
        defaults: {
            directionName: '',
            technologies: ''
        },
    });
})(App.Direction);