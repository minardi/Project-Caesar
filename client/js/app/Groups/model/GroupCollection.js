'use strict';
(function (This) {
    This.GroupCollection = Backbone.Collection.extend({
        model: This.Group,
        url: '/rest/groups',
        contain: function (id) {
            var result = false;
            this.forEach(function (item) {
                if (item.get('_id') === id) {
                    result = true;
                }
            });
            return result;
        }
    });
})(App.Groups);
