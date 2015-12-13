'use strict';
(function (This) {
    This.Controller = function() {
        this.collection = collections.events;
        this.weekView = new This.WeekView();
        this.monthView = new This.MonthView();
        this.$el = $('#container');

        this.showWeekSchedule = function (group) {
           this.collection.fetch()
                .done(this.renderWeekGrid.bind(this));
        };
        
        this.renderWeekGrid = function () {
            this.$el.empty();
            this.weekView.delegateEvents();
            this.$el.append(this.weekView.render().el);
        };
        
        this.showMonthSchedule = function (group) {
           this.collection.fetch()
                .done(this.renderMonthGrid.bind(this));
        };
        
        this.renderMonthGrid = function () {
            this.$el.empty();
            this.monthView.delegateEvents();
            this.$el.append(this.monthView.render().el);
        };

        cs.mediator.subscribe('nextWeek', function () {
            this.weekView.weekStart.add(7, 'd');
            this.renderWeekGrid();
        }, {}, this);
        
        cs.mediator.subscribe('prevWeek', function () {
            this.weekView.weekStart.subtract(7, 'd');
            this.renderWeekGrid();
        }, {}, this);

        cs.mediator.subscribe('renderMonthSchedule', this.showMonthSchedule, {}, this);
        cs.mediator.subscribe('renderWeekSchedule', this.showWeekSchedule, {}, this);
        
        return this;
    };
})(App.Schedule);