'use strict';
(function (This)  {
    This.EventCollection = Backbone.Collection.extend({
        model: This.Event,
        url: '/rest/events',
        filter: function (groupName) {
            var filtered = new App.Schedule.EventCollection(),
                groupID = collections.groups.findWhere({
                    name: groupName
                }).id;

            this.forEach(function (item) {
                if (item.get('groupID') === groupID) {
                    filtered.push(item);
                }
            });
            
            return filtered;
        }
    });
})(App.Schedule);