'use strict';
(function (This) {
    This.Controller = function() {
        this.gridView = new This.GridView();
        this.$el = $('#container');
        this.currentWeek = moment().week();

        this.showSchedule = function (week) {
            this.$el.empty();
            this.gridView.delegateEvents();
            this.$el.append(this.gridView.render(week || this.currentWeek).el);
        };
        
        cs.mediator.subscribe('nextWeek', function () {
            cs.subRouters['Schedule'].controller.currentWeek++;
            cs.subRouters['Schedule'].controller.showSchedule();
        }, this);
        
        cs.mediator.subscribe('prevWeek', function () {
            cs.subRouters['Schedule'].controller.currentWeek--;
            cs.subRouters['Schedule'].controller.showSchedule();
        }, this);

        return this;
    };
})(App.Schedule);