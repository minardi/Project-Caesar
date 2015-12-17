'use strict';
(function (This) {
    This.WeekView = Backbone.View.extend({
        tpl: templates.weekTpl,
        weekStart: moment().day('Monday'),
        
        events: {
            'click .nextPeriod': 'nextWeek',
            'click .prevPeriod': 'prevWeek',
            'click .week-month-switch': 'renderMonth'
        },

        render: function (group) {
            this.$el.empty().append(this.tpl({
                groupName: group || 'all groups',
                width: 8,
                start: this.weekStart,
                startTime: moment().hour(8).minute(0),
                endTime: moment().hour(20).minute(0)
            }));

            collections.events.forEach(remakeGrid.bind(this));

            function remakeGrid (item) {
                var eventID, i;

                eventID = moment(item.get('dateTime')).format('HH-mm-MM-DD-YYYY');
                this.$el.find('.' + eventID).attr('rowSpan', item.get('duration'))
                    .addClass('schedule-event')
                    .html(item.toString());
                    
                for (i = 1; i < item.get('duration'); i++) {
                    eventID = moment(item.get('dateTime')).add(i * 30, 'm').format('HH-mm-MM-DD-YYYY');
                    this.$el.find('.' + eventID).remove();
                }
            }

            return this;
        },

        renderMonth: function () {
            cs.mediator.publish('renderMonthSchedule');    
        },

        nextWeek: function () {
            cs.mediator.publish('nextWeek');
        },
        
        prevWeek: function () {
            cs.mediator.publish('prevWeek');
        }
    });
})(App);