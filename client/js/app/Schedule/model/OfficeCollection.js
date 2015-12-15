'use strict';
(function (This)  {
    This.OfficeCollection = Backbone.Collection.extend({
        model: This.Office,
        url: '/rest/offices',
        inLocation: function (locationId) {
            return this.filter(function (office) {
                return (office.get('location') == locationId);
            });
        }
    });
})(App.Schedule);
