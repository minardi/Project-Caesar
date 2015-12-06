'use strict';
(function (This) {
    This.Controller = function() {
        var collection = collections.groups;
        var collectionView;
        var $el = $('.col-md-8');

        this.start = function () {
            setupMediator();
        };

        function setupMediator () {
            cs.mediator.subscribe('currentGroupsView', renderCurrentView, {}, this);
            cs.mediator.subscribe('futureGroupsView', renderFutureGroups, {}, this);
            cs.mediator.subscribe('finishedGroupsView', renderFinishedGroups, {}, this);
            cs.mediator.subscribe('showAll', showAll, {}, this);
            cs.mediator.subscribe('showInLocation', showInLocation, {}, this);
        };

        function showAll () {
            collection.fetch()
                .done(renderCurrentView.bind(this));
        };

        function showInLocation (location) {
            collection.fetch({data: {location: location}})
                .done(renderCurrentView.bind(this));
        };

        function renderCurrentView () {
            collectionView = new This.GroupCollectionView();
            $el.empty().append(collectionView.renderCurrentGroups().el);
        };

        function renderFutureGroups () {
            collectionView = new This.GroupCollectionView();
            $el.empty().append(collectionView.renderFutureGroups().el);
        };

        function renderFinishedGroups () {
            collectionView = new This.GroupCollectionView();
            $el.empty().append(collectionView.renderFinishedGroups().el);
        };

        return this;
    };
})(App.Groups);
