'use strict';
(function (This) {
    This.LocationCollection = Backbone.Collection.extend({
        model: This.Location,
        url: '/dbLocations',

        search: function (searchString) {
            var pattern = new RegExp(searchString,"gi");

            if (searchString == "") return this.toArray();
     
            return this.filter(function(model) {
                return pattern.test(model.get("city"));
            });
        }
    });
})(App.Locations);