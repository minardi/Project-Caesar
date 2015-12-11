'use strict';
(function (This)  {
    This.EventCollection = Backbone.Collection.extend({
        model: This.Event,
        url: '/events'
    });
})(App.Schedule);