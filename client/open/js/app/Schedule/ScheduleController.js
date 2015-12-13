'use strict';
(function (This) {
    This.Controller = function() {
        this.collection = collections.events;
        this.weekView = new This.WeekView();
        this.$el = $('#container');

        this.showSchedule = function (group) {
           this.collection.fetch()
                .done(this.renderEventsGrid.bind(this));
        };
        
        this.renderEventsGrid = function () {
            this.$el.empty();
            this.weekView.delegateEvents();
            this.$el.append(this.weekView.render().el);
        };
        
        cs.mediator.subscribe('nextWeek', function () {
            this.weekView.weekStart.add(7, 'd');
            this.renderEventsGrid();
        }, {}, this);
        
        cs.mediator.subscribe('prevWeek', function () {
            this.weekView.weekStart.subtract(7, 'd');
            this.renderEventsGrid();
        }, {}, this);

        return this;
    };
})(App.Schedule);