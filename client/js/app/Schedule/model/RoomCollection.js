'use strict';
(function (This)  {
    This.RoomCollection = Backbone.Collection.extend({
        model: This.Room,
        url: '/rest/rooms',
        inOffice: function (officeId) {
            return this.filter(function (room) {
                return (room.get('office') == officeId);
            });
        }

    });
})(App.Schedule);
