'use strict';
(function (This) {
    This.Controller = App.Common.Controller.extend({

        initialize: function () {
           this.collection = this.get('collection'); 
           this.$el = $('.col-md-8');
        },

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
                'showInLocation': this.showInLocation
            };

            for (key in subscribers) {
                cs.mediator.subscribe(key, subscribers[key], {}, this);
            }
        },

        showAllCurrentGroups: function () {
            this.collection.fetch()
                .done(this.renderCurrentGroups);
        },

        showInLocation: function (location) {
            this.collection.fetch({data: {location: location}})
                .done(this.renderCurrentGroups);
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
    });
})(App.Groups);
