'use strict';
(function (This) {
    This.Controller = function() {
        this.collection = collections.groups;
        this.collectionView = new This.GroupCollectionView();
        this.el = $('.content');
        
        function renderView () {
            this.el.children().first().replaceWith(this.collectionView.renderGroups().el);
        }

        function renderCurrentView () {
            this.el.append(this.collectionView.renderCurrentGroups().el)
        }

        this.start = function () {
            renderCurrentView.call(this);

            var that = this;
            var currentView = 'renderCurrent';

            $('#up-navig').on('click', function () {
                if (currentView === 'renderCurrent') {
                    cs.mediator.publish('futureGroups');
                    that.collectionView.renderFutureGroups();
                    currentView = 'renderFuture';
                } else if (currentView === 'renderFinished') {
                    cs.mediator.publish('currentGroups');
                    that.collectionView.renderCurrentGroups();
                    currentView = 'renderCurrent';
                }
            });
            $('#down-navig').on('click', function () {
                if (currentView === 'renderCurrent') {
                    cs.mediator.publish('finishedGroups');
                    that.collectionView.renderFinishedGroups();
                    currentView = 'renderFinished';
                } else if (currentView === 'renderFuture') {
                    cs.mediator.publish('currentGroups');
                    that.collectionView.renderCurrentGroups();
                    currentView = 'renderCurrent';
                }
            });

            setupMediator();
        };

        this.showAll = function () {
            this.collection.fetch()
                .done(renderCurrentView.bind(this));
        };
        
        this.showInLocation = function (location) {
            this.collection.fetch({data: {location: location}})
                .done(renderCurrentView.bind(this));
        };

            function setupMediator () {
                cs.mediator.subscribe('currentGroupsView', showCurrentGroups);
                cs.mediator.subscribe('futureGroupsView', showFutureGroups);
                cs.mediator.subscribe('finishedGroupsView', showFinishedGroups);
            }

            function showCurrentGroups () {
                this.collectionView.renderCurrentGroups();
            }

            function showFutureGroups () {
                this.collectionView.renderFutureGroups();
            }

            function showFinishedGroups () {
                this.collectionView.renderFinishedGroups();
            }
        
        return this;
    };
})(App.Groups);
