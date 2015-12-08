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
            this.listenTo(this.collection, 'add', this.renderOne);
            this.filter = new Filter.Controller({
                'collection': this.collection,
                'pageSize': 6,
                'searchField': 'name',
                'viewName': 'groups'
            });

            cs.mediator.subscribe('groupsChangePage', this.changePage, {}, this);
            cs.mediator.subscribe('groupsStartSearch', this.startSearch, {}, this);
            
            $('body').append(templates.groupModalDeleteTpl);
        },

        renderUp: function () {
            if (this.currentView === 'renderCurrent') {
                cs.mediator.publish('futureGroups');
                this.renderFutureGroups();
            } else if (this.currentView === 'renderFinished') {
                cs.mediator.publish('currentGroups');
                this.renderCurrentGroups();
            }
        },

        renderDown: function () {
            if (this.currentView === 'renderCurrent') {
                cs.mediator.publish('finishedGroups');
                this.renderFinishedGroups();
            } else if (this.currentView === 'renderFuture') {
                cs.mediator.publish('currentGroups');
                this.renderCurrentGroups();
            }
        },

        render: function () {
            this.$el.html(this.tpl());
            this.$('.searcher').append(this.filter.renderSearcher());
            this.renderAll(this.filter.getCollection());
            return this;
        },

        renderFilterGroups: function (mode, filter) {
            var filtered = this.collection.filter(filter, this);
            
            this.filter.set({'collection': filtered});
            this.currentView = mode;

            this.$el.html(this.tpl());
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
            $('body').append(templates.groupModalAddTpl);

            var $groupAddModal = $('#groupAdd'),
                $groupAddBtn = $('.add-new-group'),
                thisCollection = this.collection;

            $groupAddModal.modal('show');
            $groupAddModal.on('hidden.bs.modal', function () {
                $groupAddModal.remove();
                $groupAddBtn.off('click', submitNewGroup);
            });
            $groupAddBtn.on('click', submitNewGroup);

            startDataPickers();
            addAdditionalTeacher();
            addAdditionalExpert();

            function startDataPickers () {
                $('#startDate').datetimepicker({
                    format: 'YYYY-MM-DD',
                    defaultDate: '2015-10-25T01:32:21.196Z'
                });
                $('#finishDate').datetimepicker({
                    format: 'YYYY-MM-DD',
                    defaultDate: '2016-01-25T01:32:21.196Z'
                });
            };
            function addAdditionalTeacher () {
                var teacherSelect = $('#groupAdd .teachers-block input');
                $('.add-teacher').on('click', function () {
                    teacherSelect.clone().appendTo('.teachers-block .input-group');
                });
            };
            function addAdditionalExpert () {
                var expertSelect = $('#groupAdd .experts-block input');
                $('.add-expert').on('click', function () {
                    expertSelect.clone().appendTo('.experts-block .input-group');
                });
            };
            function submitNewGroup () {
                var group = new App.Groups.Group({
                    id: _.uniqueId('newGroup_'),
                    name: $('#groupAdd input[name="GroupName"]').val(),
                    direction: $('#groupAdd select[name="Direction"] option:selected').val(),
                    location: $('#groupAdd select[name="LocationName"] option:selected').val(),
                    startDate: $('#groupAdd #startDate').val(),
                    finishDate: $('#groupAdd #finishDate').val(),
                    status: $('#groupAdd select[name="StatusName"] option:selected').val(),
                    teachers: collectTeachers(),
                    experts: collectExperts(),
                });

                thisCollection.create(group.toJSON(), {wait: true});

                $groupAddModal.modal('hide');

                function collectTeachers () {
                    var teachers = $('#groupAdd input[name="teacher"]');
                    var teachersValue = [];
                    teachers.each(function () {
                        teachersValue.push($(this).val());
                    });
                    return teachersValue;
                };
                function collectExperts () {
                    var experts = $('#groupAdd input[name="experts"]');
                    var expertsValue = [];
                    experts.each(function () {
                        expertsValue.push($(this).val());
                    });
                    return expertsValue;
                };
            };
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
        
    });
})(App.Groups, App.Filter);