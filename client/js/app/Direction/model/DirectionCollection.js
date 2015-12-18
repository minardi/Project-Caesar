'use strict';
(function (This)  {
    This.DirectionCollection = Backbone.Collection.extend({
        model: This.Direction,
        url: '/rest/directions'
    });
})(App.Direction);