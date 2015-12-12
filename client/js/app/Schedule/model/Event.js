'use strict';
(function (This)  {
    This.Event = Backbone.Model.extend({
        defaults: {
            dateTime: new Date(),
            type: This.EventTypes.PRACTICS,
            groupID: '',
            duration: 0
        },
        initialize: function (params) {
            var key;
            for (key in params) {
                if (key in Object.keys(this)) {
                    this[key] = params[key];
                }
            }
        },
        toString: function () {
            var groupName = ':(',
                group = collections.groups.get(this.get('groupID'));
            
            if (group) {
                groupName = group.get('name');
            }
            
            return this.get('type') + ' ' + groupName;
        }
    });
})(App.Schedule);