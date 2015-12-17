'use strict';
(function (This) {
    This.Controller = function() {
        var scheduleFor = '';

        this.collection = collections.events;
        this.weekView = new This.WeekView();
        this.monthView = new This.MonthView();
        this.$el = $('#container');

        _.extend(this, Backbone.Events);

        this.start = function () {
            this.listenTo(this.collection, 'sync', this.renderWeekGrid);

            cs.mediator.subscribe('nextWeek', function () {
                this.weekView.weekStart.add(7, 'd');
                this.renderWeekGrid();
            }, {}, this);
            
            cs.mediator.subscribe('prevWeek', function () {
                this.weekView.weekStart.subtract(7, 'd');
                this.renderWeekGrid();
            }, {}, this);

            cs.mediator.subscribe('nextMonth', function () {
                this.monthView.monthStart.add(1, 'M');
                this.renderMonthGrid();
            }, {}, this);
            
            cs.mediator.subscribe('prevMonth', function () {
                this.monthView.monthStart.subtract(1, 'M');
                this.renderMonthGrid();
            }, {}, this);

            cs.mediator.subscribe('renderMonthSchedule', this.renderMonthGrid, {}, this);
            cs.mediator.subscribe('renderWeekSchedule', this.renderWeekGrid, {}, this);
        };

        this.getCollection = function (name) {
            var groups = [], 
                groupIDs = [];

            scheduleFor = name;
            if (collections.locations.where({city: name}).length) {
                groups = collections.groups.where({location: name});
            } else {
                groups = collections.groups.where({'name': name});
            }

            groups.forEach(function (item) {
                groupIDs.push(item.get('_id'));
            });

            if (groupIDs.length) {
                this.collection.fetch({data: {'groupID': groupIDs}});    
            } else {
                cs.mediator.publish('error404');
            }            
        };

        this.renderWeekGrid = function () {
            this.$el.empty();
            this.weekView.delegateEvents();
            this.$el.append(this.weekView.render(scheduleFor).el);
        };

        this.renderMonthGrid = function () {
            this.$el.empty();
            this.monthView.delegateEvents();
            this.$el.append(this.monthView.render(scheduleFor).el);
        };
        
        return this;
    };
})(App);