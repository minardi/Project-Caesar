 'use strict';
(function (This) {
    This.Controller = Backbone.Controller.extend({
        start: function () {
            this.setupMediator();
        },

        setupMediator: function () {
            var key,
                subscribers;

            subscribers = {
               'currentGroupsView': this.renderCurrentGroups,
               'futureGroupsView': this.renderFutureGroups,
               'finishedGroupsView': this.renderFinishedGroups,
               'showAll': this.showAllCurrentGroups,
               'showInLocation': this.showInLocation,
               'showMy': this.showMy
            };

            for (key in subscribers) {
                cs.mediator.subscribe(key, subscribers[key], {}, this);
            }
        },

        showAllCurrentGroups: function () {
            this.collection.fetch()
                .done(this.renderCurrentGroups.bind(this));
        },

        showInLocation: function (location) {
            this.collection.fetch({data: {location: location}})
                .done(this.renderCurrentGroups.bind(this));
        },

        renderCurrentGroups: function () {
            this.collectionView = new This.GroupCollectionView();
            this.$el.empty().append(this.collectionView.renderCurrentGroups().el);
        },

        renderFutureGroups: function () {
            this.collectionView = new This.GroupCollectionView();
            this.$el.empty().append(this.collectionView.renderFutureGroups().el);
        },

        renderFinishedGroups: function () {
            this.collectionView = new This.GroupCollectionView();
            this.$el.empty().append(this.collectionView.renderFinishedGroups().el);
        },

        showMy: function () {
            var teacherName = cs.currentUser.getName();
            collections.groups = collections.groups.filter(function (group) {
                return group.get('teachers').indexOf(teacherName) != -1;
            });
            this.renderCurrentGroups();
        }
    });
})(App.Groups);
