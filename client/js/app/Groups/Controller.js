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
            
            this.collectionViewEl = $('.col-md-8');
        },

        showAllCurrentGroups: function () {
            this.collection.fetch()
                .done(this.renderCurrentGroups.call(this, {namespace: 'currentGroupsView'}, false));
        },

        showInLocation: function (location) {
            this.collection.fetch({data: {location: location}})
                .done(this.renderCurrentGroups.call(this, {namespace: 'currentGroupsView'}));
        },

        renderCurrentGroups: function (event, isMy) {
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
            collections.groups.set(filtered);
            this.renderCurrentGroups({namespace: 'currentGroupsView'}, true);
        }
    });
})(App.Groups);
