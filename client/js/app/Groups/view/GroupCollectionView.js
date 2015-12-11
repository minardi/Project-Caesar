'use strict';
(function (This, Filter) {
    This.GroupCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'center-content',
        tpl: templates.groupCollectionTpl,

        events: {
            'click .add-new-group': 'addGroup',
            'click #up-navig': 'renderUp',
            'click #down-navig': 'renderDown'
        },

        initialize: function () {
            this.currentView = 'renderCurrent';
            this.collection = collections.groups;
            this.listenTo(this.collection, 'add', this.renderCurrentGroups);
            this.listenTo(this.collection, 'destroy', this.renderAfterDestroy);
            this.filter = new Filter.Controller({
                'collection': this.collection,
                'pageSize': 6,
                'searchField': 'name',
                'viewName': 'groups'
            });

            cs.mediator.subscribe('groupsChangePage', this.changePage, {}, this);
            cs.mediator.subscribe('groupsStartSearch', this.startSearch, {}, this);
        },

        renderUp: function () {
            if (this.currentView === 'renderCurrent') {
                cs.mediator.publish('futureGroups', 'Groups/future');
                this.renderFutureGroups();
            } else if (this.currentView === 'renderFinished') {
                cs.mediator.publish('currentGroups', 'Groups/current');
                this.renderCurrentGroups();
            }
        },

        renderDown: function () {
            if (this.currentView === 'renderCurrent') {
                cs.mediator.publish('finishedGroups', 'Groups/finished');
                this.renderFinishedGroups();
            } else if (this.currentView === 'renderFuture') {
                cs.mediator.publish('currentGroups', 'Groups/current');
                this.renderCurrentGroups();
            }
        },

        render: function () {
            var userRole = cs.currentUser.getRole();

            this.$el.html(this.tpl({userRole: userRole}));
            this.$('.searcher').append(this.filter.renderSearcher());
            this.renderAll(this.filter.getCollection());
            return this;
        },

        renderFilterGroups: function (mode, filter) {
            var filtered = this.collection.filter(filter, this),
                userRole = cs.currentUser.getRole();
            
            this.filter.set({
                'collection': filtered,
                'currentPage': 0
            });
            this.currentView = mode;

            this.$el.html(this.tpl({userRole: userRole}));
            this.$('.searcher').append(this.filter.renderSearcher());
            this.renderAll(this.filter.getCollection());
            return this;
        },

        renderCurrentGroups: function () {
            return this.renderFilterGroups('renderCurrent', function(model) {
                return (model.get('startDate') < this.getCurrentDate() &&
                model.get('finishDate') > this.getCurrentDate());
            });
        },

        renderFinishedGroups: function () {
            return this.renderFilterGroups('renderFinished', function(model) {
                return model.get('finishDate') < this.getCurrentDate();
            });
        },

        renderFutureGroups: function () {
            return this.renderFilterGroups('renderFuture', function(model) {
                return model.get('startDate') > this.getCurrentDate();
            });
        },

        renderAll: function (filtered) {
            this.$('#main').empty();
            filtered.forEach(this.renderOne, this);
            this.$('nav').html(this.filter.renderPaginator());
        },

        renderOne: function (model) {
            var groupView = new This.GroupView({model: model});
            this.$('#main').append(groupView.render().el);
        },

        addGroup: function () {
            var groupAddView = new This.GroupAddEditView({
                    collection: this.collection, 
                    tpl: templates.groupAddTpl
                }),
                $modalWrap = $('.modal-wrap');

            $modalWrap.html(groupAddView.render().el);
            $modalWrap.find('.modal').modal('show');
        },

        getCurrentDate: function () {
            var currentDate = new Date();
            return currentDate.toISOString();
        },
        
        changePage: function (currentPage) {
            this.filter.set({'currentPage': currentPage});
            this.renderAll(this.filter.getCollection());            
        },

        startSearch: function (searchString) {
            this.filter.set({'searchString': searchString});
            this.filter.set({'currentPage': 0});
            this.renderAll(this.filter.getCollection());            
        },
        
        renderAfterDestroy: function () {
            this.filter.set({'currentPage':0});
            this.renderCurrentGroups();            
        }
    });
})(App.Groups, App.Filter);