'use strict';
(function (This) {
    This.GridView = Backbone.View.extend({
        tpl: templates.gridTpl,
        weekStart: moment().day('Monday'),
        
        events: {
            'click #nextButton': 'nextWeek',
            'click #prevButton': 'prevWeek'
        },

        render: function () {
            this.$el.empty().append(this.tpl({
                width: 8,
                height: 25,
                start: this.weekStart      
            }));
            collections.events.forEach((function (item) {
                var eventID = moment(item.get('dateTime')).format('HH-mm-MM-DD-YYYY');
                this.$el.find('.' + eventID).html(item.toString());
            }).bind(this));
            //this.$el.find('.08-00-12-07-2015').html('wow');
            
            return this;
        },
        
        nextWeek: function () {
            cs.mediator.publish('nextWeek');
        },
        
        prevWeek: function () {
            cs.mediator.publish('prevWeek');
        }
    });
})(App.Schedule);