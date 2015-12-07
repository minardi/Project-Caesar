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
            var key,
                subscribers;

            subscribers = {
                'currentGroupsView': renderCurrentGroups,
                'futureGroupsView': renderFutureGroups,
                'finishedGroupsView': renderFinishedGroups,
                'showAll': showAllCurrentGroups,
                'showInLocation': showInLocation
            };

            for (key in subscribers) {
                cs.mediator.subscribe(key, subscribers[key], {}, this);
            }

            /*cs.mediator.subscribe('currentGroupsView', renderCurrentGroups, {}, this);
            cs.mediator.subscribe('futureGroupsView', renderFutureGroups, {}, this);
            cs.mediator.subscribe('finishedGroupsView', renderFinishedGroups, {}, this);
            cs.mediator.subscribe('showAll', showAllCurrentGroups, {}, this);
            cs.mediator.subscribe('showInLocation', showInLocation, {}, this);*/
        };

        function showAllCurrentGroups () {
            collection.fetch()
                .done(renderCurrentGroups.bind(this));
        };

        function showInLocation (location) {
            collection.fetch({data: {location: location}})
                .done(renderCurrentGroups.bind(this));
        };

        function renderCurrentGroups () {
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
