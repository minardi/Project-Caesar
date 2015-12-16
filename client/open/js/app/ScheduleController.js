'use strict';
(function (This) {
    This.Controller = function() {
        _.extend(this, Backbone.Events);

        this.collection = collections.events;
        this.weekView = new This.WeekView();
        this.monthView = new This.MonthView();
        this.$el = $('#container');
        this.group = null;

        this.start = function () {
            this.listenTo(this.collection, 'sync', this.renderWeekGrid);
        };

        this.getCollection = function (groupName) {
            var groupID;
            if (groupName) {
                groupID = collections.groups.filter(function (group) {
                    return group.get('name') === groupName;
                }.bind(this));
                if (groupID.length > 0) {
                    this.group = groupID[0];
                    this.collection.fetch({data: {'groupID': this.group.get('_id')}});
                } else {
                     this.collection.fetch({data: {'groupID': ''}});                   
                }
            } else {
               this.collection.fetch();
            }
        };

        this.renderWeekGrid = function () {
            this.$el.empty();
            this.weekView.delegateEvents();
            this.$el.append(this.weekView.render(this.group).el);
        };

        this.renderMonthGrid = function () {
            this.$el.empty();
            this.monthView.delegateEvents();
            this.$el.append(this.monthView.render(this.group).el);
        };

        cs.mediator.subscribe('nextWeek', function () {
            this.weekView.weekStart.add(7, 'd');
            this.renderWeekGrid();
        }, {}, this);
        
        cs.mediator.subscribe('prevWeek', function () {
            this.weekView.weekStart.subtract(7, 'd');
            this.renderWeekGrid();
        }, {}, this);

        cs.mediator.subscribe('renderMonthSchedule', this.renderMonthGrid, {}, this);
        cs.mediator.subscribe('renderWeekSchedule', this.renderWeekGrid, {}, this);
        
        return this;
    };
})(App);