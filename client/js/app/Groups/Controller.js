 'use strict';
(function (This) {
    This.Controller = Backbone.Controller.extend({

        start: function () {
            this.collectionView = new This.GroupCollectionView();

            this.setupMediator({
               'currentGroupsView': this.renderCurrentGroups,
               'futureGroupsView': this.renderCurrentGroups,
               'finishedGroupsView': this.renderCurrentGroups,
               'showAll': this.showAllCurrentGroups,
               'showInLocation': this.showInLocation,
               'showMy': this.showMy
            });
            
            this.collectionViewEl = $('#container');
        },

        showAllCurrentGroups: function () {
            var self = this;
            this.collection.fetch({reset: true})
                .done(function () {
                    self.renderCurrentGroups({namespace: 'currentGroupsView'}, false);
                });
        },

        showInLocation: function (location) {
            this.collection.fetch({data: {location: location}})
                .done(this.renderCurrentGroups.bind(this, {namespace: 'currentGroupsView'}));
        },

        renderCurrentGroups: function (event, isMy) {
            this.collectionView = new This.GroupCollectionView();
            var behavior = {
                    'currentGroupsView': this.collectionView.renderCurrentGroups,
                    'futureGroupsView': this.collectionView.renderFutureGroups,
                    'finishedGroupsView': this.collectionView.renderFinishedGroups
                },  
                method = event.namespace;

            this.collectionViewEl
                .empty()
                .append(behavior[method].call(this.collectionView, isMy).el);
        },

        showMy: function () {
            var teacherName = cs.currentUser.getName(),
            filtered = collections.groups.filter(function (group) {
                return group.get('teachers').indexOf(teacherName) != -1;
            });
            collections.groups.reset(filtered);
            this.renderCurrentGroups({namespace: 'currentGroupsView'}, true);
        }
    });
})(App.Groups);
