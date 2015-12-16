'use strict';
(function (This) {
    This.MonthView = Backbone.View.extend({
        tpl: templates.monthTpl,
        weekStart: moment().day('Monday'),
        
        events: {
            'click .week-month-switch': 'renderWeek'
        },

        render: function (group) {
            var startDate, finishDate;

            if (group) {
                startDate = moment(new Date(group.get('startDate')));
                finishDate = moment(new Date(group.get('finishDate')));
            };

            this.$el.empty().append(this.tpl({
                groupName: group ? group.get('name') : 'all groups',
                startTime: moment().hour(8).minute(0),
                endTime: moment().hour(21).minute(0),
                start: group ? startDate : moment().date(1),
                duration: group ? finishDate.diff(startDate, 'days') + 1 : moment().daysInMonth()
            }));

            collections.events.forEach(remakeGrid.bind(this));

            function remakeGrid (item) {
                var eventID, i;

                eventID = moment(item.get('dateTime')).format('HH-mm-MM-DD-YYYY');
                this.$el.find('.' + eventID).attr('colSpan', item.get('duration'))
                    .addClass('schedule-event')
                    .html(item.toString());
                    
                for (i = 1; i < item.get('duration'); i++) {
                    eventID = moment(item.get('dateTime')).add(i * 30, 'm').format('HH-mm-MM-DD-YYYY');
                    this.$el.find('.' + eventID).remove();
                }
            }

            return this;
        },

        renderWeek: function () {
            cs.mediator.publish('renderWeekSchedule');    
        },
    });
})(App);