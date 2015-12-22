'use strict';
(function (This, Filter) {
    This.GroupCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'center-content',
        tpl: templates.groupCollectionTpl,
        myGroupsTpl: templates.myGroupsTpl,
        myLocationGroupsTpl: templates.myLocationGroupsTpl,
        currentLocation: '', 

        events: {
            'click .add-new-group': 'addGroup',
            'click #up-navig': 'renderUp',
            'click #down-navig': 'renderDown',
            'click #my-groups': 'switchMyGroups'
        },

        initialize: function (isMyGroupsShown, location) {
            this.isMyGroupsShown = isMyGroupsShown;
            if (location) {
                this.baseUrl = 'Groups/' + location + '/';
                this.currentLocation = location;
            } else {
                this.baseUrl = isMyGroupsShown ? 'Groups/my/' : 'Groups/';
            }

            this.currentView = 'renderCurrent';
            this.collection = collections.groups;
            this.listenTo(this.collection, 'add', this.renderCurrentGroups);
            this.listenTo(this.collection, 'destroy', this.renderAfterDestroy);
            this.filter = new Filter.Controller({
                'collection': this.collection,
                'pageSize': 9,
                'searchField': 'name',
                'viewName': 'groups'
            });

            cs.mediator.subscribe('groupsChangePage', this.changePage, {}, this);
            cs.mediator.subscribe('groupsPrevPage', this.prevPage, {}, this);
            cs.mediator.subscribe('groupsNextPage', this.nextPage, {}, this);
            cs.mediator.subscribe('groupsStartSearch', this.startSearch, {}, this);
        },

        renderUp: function () {
            if (this.currentView === 'renderCurrent') {
                cs.mediator.publish('futureGroups', this.baseUrl + 'future');
                this.renderFutureGroups();
            } else if (this.currentView === 'renderFinished') {
                cs.mediator.publish('currentGroups', this.baseUrl + 'current');
                this.renderCurrentGroups();
            }
        },

        renderDown: function () {
            if (this.currentView === 'renderCurrent') {
                cs.mediator.publish('finishedGroups', this.baseUrl + 'finished');
                this.renderFinishedGroups();
            } else if (this.currentView === 'renderFuture') {
                cs.mediator.publish('currentGroups', this.baseUrl + 'current');
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
                userRole = cs.currentUser.getRole(),
                userLocation = cs.currentUser.getLocation();
            
            this.filter.set({
                'collection': filtered,
                'currentPage': 0
            });
            this.currentView = mode;

            this.$el.html(this.tpl({
                userRole: userRole, 
                myGroupsCheckbox: this.myGroupsTpl({isMy: this.isMyGroupsShown}),
                myLocationGroupsCheckbox: this.myLocationGroupsTpl({
                    isMyLocation: this.currentLocation === userLocation['city'],
                    location: this.currentLocation
                })
            }));

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
            $modalWrap.find('.modal').modal({backdrop: 'static'});
        },

        getCurrentDate: function () {
            return moment().format();
        },
        
        changePage: function (currentPage) {
            this.filter.set({'currentPage': currentPage});
            this.renderAll(this.filter.getCollection());            
        },

        prevPage: function () {
            var currentPage = this.filter.get('currentPage');

            if (currentPage > 0) {
                this.filter.set({'currentPage': --currentPage});
                this.renderAll(this.filter.getCollection());                            
            }
        },

        nextPage: function () {
            var currentPage = this.filter.get('currentPage'),
                maxPage = this.filter.get('maxPage') - 1;
             
            if (currentPage < maxPage) {
                this.filter.set({'currentPage': ++currentPage});
                this.renderAll(this.filter.getCollection());                            
            }
        },

        startSearch: function (searchString) {
            this.filter.set({'searchString': searchString});
            this.filter.set({'currentPage': 0});
            this.renderAll(this.filter.getCollection());            
        },
        
        renderAfterDestroy: function () {
            this.filter.set({'currentPage':0});
            this.renderCurrentGroups();            
        },

        switchMyGroups: function () {
            cs.mediator.publish('currentGroups', this.isMyGroupsShown ? 'Groups' : 'Groups/my');
            if ($('#my-groups').is(':checked')) {
                cs.mediator.publish('showMy', 'current');
            } else {
                cs.mediator.publish('showAll');
            }
        }
    });
})(App.Groups, App.Filter);