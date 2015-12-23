'use strict';
(function (This) {
    This.Controller = function() {
        this.gridView = new This.GridView();
        this.editView = new This.EditView({collection: collections.events});
        this.$el = $('#main-container');
        this.$editContainer = $('.notifications');

        this.showSchedule = function (weekStart, group, inEdit) {
            this.$el.empty();
            this.gridView.delegateEvents();
            this.$el.append(this.gridView.render(weekStart, group, inEdit).el);
        };

        this.editSchedule = function (weekStart, group) {
            this.showSchedule(weekStart, group, true);
            this.rerenderEdit(weekStart, group);
            this.editView.setHandlers();
        };

        this.rerender = function(weekStart, group) {
            this.showSchedule(weekStart, group, true);
            this.editView.setHandlers();
        };

        this.rerenderEdit = function(weekStart, group, officeName) {
            this.$editContainer.empty();
            this.editView.delegateEvents();
            this.$editContainer.append(this.editView.render(group.replace('+', ' '), weekStart, officeName).el);
        };

        cs.mediator.subscribe('Schedule:rerender', this.rerender, {}, this);
        cs.mediator.subscribe('rerender editControl', this.rerenderEdit, {}, this);

        return this;
    };
})(App.Schedule);