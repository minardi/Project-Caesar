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
            var locationByID,
                wrongName = false,
                groups = [], 
                groupIDs = ['-'];

            locationByID = collections.locations.where({_id: name});
            if (locationByID.length) {
                scheduleFor = locationByID[0].get('city');
                groups = collections.groups.where({location: locationByID[0].get('city')});
            } else {
                scheduleFor = name;
                groups = collections.groups.where({'name': name});
                wrongName = !groups.length;
            }

            if (wrongName) {
                cs.mediator.publish('error404');
            } else {
                groups.forEach(function (item) {
                    groupIDs.push(item.get('_id'));
                });
                this.collection.fetch({data: {'groupID': groupIDs}});
            };
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