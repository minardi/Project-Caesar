'use strict';
(function (This) {
    This.GridView = Backbone.View.extend({
        tpl: templates.gridTpl,
        weekStart: moment().day('Monday'),
        
        events: {
            'click #nextButton': 'nextWeek',
            'click #prevButton': 'prevWeek'
        },

        render: function (weekStart) {
            if (weekStart) {
                this.weekStart = moment(weekStart);
            }
            this.$el.empty().append(this.tpl({
                width: 8,
                height: 25,
                start: this.weekStart      
            }));
            
            collections.events.forEach((function (item) {
                var eventID, i;
                for (i = 0; i < item.get('duration'); i++) {
                    eventID = moment(item.get('dateTime')).add(i * 30, 'm').format('HH-mm-MM-DD-YYYY');
                    this.$el.find('.' + eventID).addClass('schedule-event');
                }
                eventID = moment(item.get('dateTime')).format('HH-mm-MM-DD-YYYY');
                this.$el.find('.' + eventID).html($('<div></div>').html(item.toString()).addClass('schedule-info'));
            }).bind(this));
            
            return this;
        },
        
        nextWeek: function () {
            cs.mediator.publish('scheduleRequired', 'Schedule/' + this.weekStart.add(7, 'd').format('MM-DD-YYYY'));
        },
        
        prevWeek: function () {
            cs.mediator.publish('scheduleRequired', 'Schedule/' + this.weekStart.subtract(7, 'd').format('MM-DD-YYYY'));
        }
    });
})(App.Schedule);