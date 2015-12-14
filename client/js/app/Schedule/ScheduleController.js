'use strict';
(function (This) {
    This.Controller = function() {
        this.gridView = new This.GridView();
        this.editView = new This.EditView({collection: collections.events});
        this.$el = $('#container');

        this.showSchedule = function (weekStart) {
            this.$el.empty();
            this.gridView.delegateEvents();
            this.$el.append(this.gridView.render(weekStart).el);
        };

        this.editSchedule = function () {
            this.$el.empty();
            this.$el.append(this.editView.render().el);
        };

        cs.mediator.subscribe('editLocationSchedule', function (location) {
            this.$el.empty();
            this.editView = new This.EditView({location: location});
            this.$el.append(this.editView.render().el);
        }, {}, this);

        cs.mediator.subscribe('editGroupSchedule', function (group) {
            this.$el.empty();
            this.editView = new This.EditView({group: group});
            this.$el.append(this.editView.render().el);
        }, {}, this);

        cs.mediator.subscribe('addEvent', function (json) {
            this.editView.addEvent(json);
        }, {}, this);

        cs.mediator.subscribe('deleteEvent', function () {
            this.editView.deleteEvent();
        }, {}, this);

        return this;
    };
})(App.Schedule);