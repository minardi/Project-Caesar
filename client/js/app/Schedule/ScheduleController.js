'use strict';
(function (This) {
    This.Controller = function() {
        this.gridView = new This.GridView();
        this.editView = new This.EditView({collection: collections.events});
        this.$el = $('#container');

        this.showSchedule = function () {
            this.$el.empty();
            this.gridView.delegateEvents();
            this.$el.append(this.gridView.render().el);
            //console.dir(collections.events);
        };

        this.editSchedule = function () {
            this.$el.empty();
            this.$el.append(this.editView.render().el);
        };
        
        cs.mediator.subscribe('nextWeek', function () {
            cs.subRouters['Schedule'].controller.gridView.weekStart.add(7, 'd');
            cs.subRouters['Schedule'].controller.showSchedule();
        }, this);
        
        cs.mediator.subscribe('prevWeek', function () {
            cs.subRouters['Schedule'].controller.gridView.weekStart.subtract(7, 'd');
            cs.subRouters['Schedule'].controller.showSchedule();
        }, this);

        cs.mediator.subscribe('addEvent', function (json) {
            this.editView.addEvent(json);
        }, {}, this);

        cs.mediator.subscribe('deleteEvent', function () {
            this.editView.deleteEvent();
        }, {}, this);

        return this;
    };
})(App.Schedule);