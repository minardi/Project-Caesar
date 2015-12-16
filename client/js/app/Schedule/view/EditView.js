'use strict';
(function (This) {
    This.EditView = Backbone.View.extend({
        tpl: templates.editViewTpl,
        roomsTpl: templates.roomsTpl,
        className: 'edit-panel row',
        groupName: '',
        weekStart: '',

        initialize: function () {
        },

        render: function (groupName, weekStart) {
            this.groupName = groupName;
            this.weekStart = moment(weekStart, 'MM-DD-YYYY').day('Monday');

            this.$el.empty()
                .append(this.tpl(this.tplParameters(groupName)));

            $('td').not('.schedule-event').click(this.tryAddEvent.bind(this));
            $('td.schedule-event').dblclick(this.tryDeleteEvent.bind(this));
            return this;
        },

        tryAddEvent: function (event) {
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

            newEvent.save();
            if (newEvent.isValid() && newEvent.isNew()) {
                this.collection.add(newEvent);
                console.log('event added');
            }
            cs.mediator.publish('Schedule:rerender', this.weekStart, this.groupName.replace(' ', '+'));
        },

        tryDeleteEvent: function (event) {
            var target = event.target,
                dateTimeStr = _.find(target.classList, isDateClass),
                dateTime = moment(dateTimeStr, 'HH-mm-MM-DD-YYYY').toISOString(),
                groupId = collections.groups.findWhere({name: this.groupName}).id,
                eventToDelete = this.collection.findWhere({
                    dateTime: dateTime,
                    groupID: groupId
                });

            eventToDelete.destroy({wait: true});
            this.collection.remove(eventToDelete);

            cs.mediator.publish('Schedule:rerender', this.weekStart, this.groupName.replace(' ', '+'));
            function isDateClass(className) {
                return /^(?:\d{2}-){4}\d{4}$/.test(className);
            }
        },

        // loadRooms: function (){
        //     var officeName = this.$el.find('#offices .active span').text(),
        //         officeId = collections.offices.findWhere({name: officeName}).id;

        //     this.$el.find('#rooms').html(this.roomsTpl(collections.rooms.where({office: officeId})));
        // },
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