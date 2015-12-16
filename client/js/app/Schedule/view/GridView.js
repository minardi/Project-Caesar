'use strict';
(function (This) {
    This.GridView = Backbone.View.extend({
        tpl: templates.gridTpl,
        weekStart: moment().day('Monday'),
        group: 'all',
        urlSuffix: '',

        events: {
            'click .nextButton': 'nextWeek',
            'click .prevButton': 'prevWeek',
            'click .dropdown-menu': 'handleMenu',
            'click #up-navig': 'toEdit',
            'click #down-navig': 'toSchedule'
        },

        initialize: function () {
            cs.mediator.subscribe('Schedule:rerender', this.rerender, {}, this);
        },

        render: function (weekStart, group, inEdit) {
            var events = collections.events.clone();
            
            if (weekStart) {
                this.weekStart = moment(weekStart, 'MM-DD-YYYY').day('Monday');
            }
            if (group) {
                this.group = group;
            }
            this.urlSuffix  = inEdit ? '/edit' : '';

            this.$el.empty().append(this.tpl({
                width: 8,
                height: 25,
                start: this.weekStart      
            }));
            
            if (group !== 'all') {
                events = events.filter(group.replace('+', ' '));
                this.$el.find('#groupDropdown').html(group.replace('+', ' ') + ' <span class="caret"></span>');
            }
            this.updateUpNavigation(group, inEdit);
            this.updateDownNavigation(inEdit);

            events.forEach((function (item) {
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

        rerender: function () {
            this.render(this.weekStart, this.group, this.urlSuffix !== '');
        },
        
        nextWeek: function () {
            cs.mediator.publish('scheduleRequired', 'Schedule/' + 
                this.weekStart.add(7, 'd').format('MM-DD-YYYY') + '/' + this.group + this.urlSuffix);
        },
        
        prevWeek: function () {
            cs.mediator.publish('scheduleRequired', 'Schedule/' + 
                this.weekStart.subtract(7, 'd').format('MM-DD-YYYY') + '/' + this.group + this.urlSuffix);
        },
        
        handleMenu: function (event) {
            var eventTrigger = event.originalEvent.target.innerText,
                path = (eventTrigger === 'All groups') ? 'all' : eventTrigger.replace(' ', '+');
            cs.mediator.publish('scheduleRequired', 'Schedule/' + 
                this.weekStart.format('MM-DD-YYYY') + '/' + path + this.urlSuffix);
        },

        toEdit: function (event) {
            if (this.group !== 'all') {
                cs.mediator.publish('scheduleRequired', 'Schedule/' + 
                    this.weekStart.format('MM-DD-YYYY') + '/' + this.group + '/edit');
            }
        },

        toSchedule: function (event) {
            if (this.urlSuffix !== '') {
                cs.mediator.publish('scheduleRequired', 'Schedule/' + 
                    this.weekStart.format('MM-DD-YYYY') + '/' + this.group);
            }
        },

        updateUpNavigation: function (group, inEdit) {
            if (group === 'all' || inEdit) {
                this.$el.find('#up-navig').addClass('location-nav');
            } else {
                this.$el.find('#up-navig').removeClass('location-nav');
            }
        },

        updateDownNavigation: function (inEdit) {
            if (!inEdit) {
                this.$el.find('#down-navig').addClass('location-nav');
            } else {
                this.$el.find('#down-navig').removeClass('location-nav');
            }
        }
    });
})(App.Schedule);