'use strict';
(function (This)  {
    This.Office = Backbone.Model.extend({
        urlRoot: '/rest/office',

        defaults: {
            name: '',
            location: null
        }

    });
})(App.Schedule);