'use strict';
(function (This) {
    This.Controller = function() {
        this.collection = collections.groups;
        this.$el = $('.col-md-8');

        this.start = function () {
            //renderCurrentView.call(this);
            setupMediator();
        };

        function setupMediator () {
            cs.mediator.subscribe('currentGroupsView', renderCurrentView, {}, this);
            cs.mediator.subscribe('futureGroupsView', renderFutureGroups, {}, this);
            cs.mediator.subscribe('finishedGroupsView', renderFinishedGroups, {}, this);
        };

        this.showAll = function (){
            this.collection.fetch()
                .done(renderCurrentView.bind(this));
        };

        this.showInLocation = function (location) {
            this.collection.fetch({data: {location: location}})
                .done(renderCurrentView.bind(this));
        };

        function renderCurrentView () {
            this.collectionView = new This.GroupCollectionView();
            this.$el.empty().append(this.collectionView.renderCurrentGroups().el)
        };

        function renderFutureGroups () {
            this.$el.empty().append(this.collectionView.renderFutureGroups().el)
        };

        function renderFinishedGroups () {
            this.$el.empty().append(this.collectionView.renderFinishedGroups().el)
        };

        function renderView () {
            this.$el.children().first().replaceWith(this.collectionView.render().el);
        };

        return this;
    };
})(App.Groups);
