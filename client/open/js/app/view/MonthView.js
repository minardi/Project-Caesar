'use strict';
(function (This) {
    This.MonthView = Backbone.View.extend({
        tpl: templates.monthTpl,
        monthStart: moment().date(1),
        
        events: {
            'click .nextPeriod': 'nextMonth',
            'click .prevPeriod': 'prevMonth',
            'click .week-month-switch': 'renderWeek'
        },

        render: function (group) {
            this.$el.empty().append(this.tpl({
                groupName: group,
                startTime: moment().hour(8).minute(0),
                endTime: moment().hour(20).minute(0),
                start: this.monthStart,
                duration: this.monthStart.daysInMonth()
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

        nextMonth: function () {
            cs.mediator.publish('nextMonth');
        },
        
        prevMonth: function () {
            cs.mediator.publish('prevMonth');
        }
    });
})(App);