'use strict';
(function (This) {
    This.EditView = Backbone.View.extend({
        tpl: templates.editViewTpl,
        roomsTpl: templates.roomsTpl,
        className: 'edit-panel',
        events: {
            'change #offices': 'loadRooms',
            'click .dropdown-menu': 'handleMenu'
        },
        render: function (groupName) {
            this.$el.empty()
                .append(this.tpl(this.tplParameters(groupName)));

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
        }, 

        loadRooms: function (){
            var officeName = this.$el.find('#offices :selected').val(),
                officeId = collections.offices.findWhere({name: officeName}).id;
            this.$el.find('#rooms').html(this.roomsTpl(collections.rooms.where({office: officeId})));
        },

        tplParameters: function (groupName) {
            var city = collections.groups.findWhere({name: groupName}).get('location'),
                locationId = collections.locations.findWhere({city: city}).id,
                offices = collections.offices.where({location: locationId}),
                rooms = collections.rooms.where({office: id(offices[0])});

            function id(office) {
                return office ? office.id : null;
            }

            return {
                types: Object.keys(This.EventTypes),
                offices: offices,
                rooms: rooms
            };
        }

    });
})(App.Schedule);