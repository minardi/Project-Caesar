'use strict';
(function (This) {
    This.EditView = Backbone.View.extend({
        tpl: templates.editViewTpl,
        roomsTpl: templates.roomsTpl,
        className: 'edit-panel',
        groupName: '',
        weekStart: '',
        events: {
            'click #offices .btn': 'changeRooms'
        },

        initialize: function () {
            this.listenTo(collections.events, 'add', this.rerender);
            this.listenTo(collections.events, 'remove', this.rerender);
        },

        render: function (groupName, weekStart, officeName) {
            this.groupName = groupName;
            this.weekStart = moment(weekStart, 'MM-DD-YYYY').day('Monday');

            this.$el.empty()
                .append(this.tpl(this.tplParameters(this.groupName, officeName)));

            return this;
        },

        addEvent: function (event) {
            var target = event.target,
                roomId = $('#rooms .active').data('roomId'),
                dateTimeStr = target.classList[target.classList.length - 1],
                dateTime = moment(dateTimeStr, 'HH-mm-MM-DD-YYYY').toISOString(),
                type = $('#event-type :selected').val(),
                groupId = collections.groups.findWhere({name: this.groupName}).id,
                eventJSON = {
                    type: type,
                    dateTime: dateTime,
                    groupID: groupId,
                    duration: 4,
                    room: roomId
                },
                newEvent = new This.Event(eventJSON);

            newEvent.save(null, {
                success: addToCollection.bind(this)
            });

            function addToCollection(model) {
                this.collection.add(model);
            }

        },

        deleteEvent: function (event) {
            var target = event.target,
                eventId = $(target).data('id'),
                eventToDelete = this.collection.findWhere({
                    _id: eventId,
                });

            eventToDelete.destroy({wait: true});
            this.collection.remove(eventToDelete);

            function isDateClass(className) {
                return /^(?:\d{2}-){4}\d{4}$/.test(className);
            }
        },

        rerender: function () {
                cs.mediator.publish('Schedule:rerender', this.weekStart, this.groupName.replace(' ', '+'));
        },

        setHandlers: function () {
            $('td').not('.schedule-event').click(this.addEvent.bind(this));
            $('td.schedule-event').dblclick(this.deleteEvent.bind(this));
        },

        changeRooms: function (e) {
            var officeName = $(e.currentTarget).find('span').html();
            cs.mediator.publish('rerender editControl', this.weekStart, this.groupName.replace(' ', '+'), officeName);
        },

        tplParameters: function (groupName, officeName) {
            var city = collections.groups.findWhere({name: groupName}).get('location'),
                locationId = collections.locations.findWhere({city: city}).id,
                offices = collections.offices.where({location: locationId}),
                officeId = officeName ? collections.offices.findWhere({name: officeName}).id : id(offices[0]),
                rooms = collections.rooms.where({office: officeId});

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