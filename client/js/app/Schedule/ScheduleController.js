'use strict';
(function (This) {
    This.Controller = function() {
        this.gridView = new This.GridView();
        this.editView = new This.EditView({collection: collections.events});
        this.$el = $('#main-container');

        this.showSchedule = function (weekStart, group, inEdit) {
            this.$el.empty();
            this.gridView.delegateEvents();
            this.$el.append(this.gridView.render(weekStart, group, inEdit).el);
        };

        this.editSchedule = function (weekStart, group) {
            this.showSchedule(weekStart, group, true);
            this.$el.append(this.editView.render(group.replace('+', ' ')).el);
        };

        cs.mediator.subscribe('addEvent', function (json) {
            this.editView.addEvent(json);
        }, {}, this);

        cs.mediator.subscribe('deleteEvent', function () {
            this.editView.deleteEvent();
        }, {}, this);

        return this;
    };
})(App.Schedule);