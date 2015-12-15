'use strict';
(function (This) {
    This.EditView = Backbone.View.extend({
        tpl: templates.editViewTpl,
        class: 'container',
        initialize: function (options) {
            this.location = options.location;
            this.group = options.group;
        },
        render: function () {
            var parameters = {
                    types: Object.keys(This.EventTypes),
                    offices: collections.offices,
                    rooms: collections.rooms
                },
                locationId,
                officesInLocation,
                roomsInOffice;

            locationId = this.location ? 
                this.location.id :
                collections.locations.findByCity(this.group.location);

            officesInLocation = collections.offices.inLocation(locationId);
            if (officesInLocation.length === 0) {
                officesInLocation = null;
            }
            roomsInOffice = officesInLocation ?
                collections.rooms.inOffice(officesInLocation[0].id) : null;

            parameters['groups'] = (this.group ? null : collections.groups);
            parameters['offices'] = officesInLocation;
            parameters['rooms'] = roomsInOffice;

            this.$el.empty().append(this.tpl(parameters));

            return this;
        },
        addEvent: function (eventJSON) {
            var newEvent,
                groupId = collections.groups.models[0].get('_id');

            eventJSON['groupID'] = groupId;
            newEvent = new This.Event(eventJSON);   
            newEvent.save();

            if (newEvent.isValid() && newEvent.isNew()) {
                this.collection.add(newEvent);
            }

        },
        deleteEvent: function() {
            this.collection.last().destroy({wait: true});
        }
    });
})(App.Schedule);