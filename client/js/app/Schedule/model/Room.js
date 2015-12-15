'use strict';
(function (This)  {
    This.Room = Backbone.Model.extend({
        urlRoot: '/rest/room',

        defaults: {
            name: '',
            office: null
        }

    });
})(App.Schedule);