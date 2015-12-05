'use strict';
(function (This) {
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
            
            $('body').append(templates.groupModalDeleteTpl);
        },

        renderUp: function () {
            if (this.currentView === 'renderCurrent') {
                cs.mediator.publish('futureGroups');

                this.renderFutureGroups();
                this.currentView = 'renderFuture';
            } else if (this.currentView === 'renderFinished') {
                cs.mediator.publish('currentGroups');

                this.renderCurrentGroups();
                this.currentView = 'renderCurrent';
            }
        },

        renderDown: function () {
            if (this.currentView === 'renderCurrent') {
                cs.mediator.publish('finishedGroups');

                this.renderFinishedGroups();
                this.currentView = 'renderFinished';
            } else if (this.currentView === 'renderFuture') {
                cs.mediator.publish('currentGroups');

                this.renderCurrentGroups();
                this.currentView = 'renderCurrent';
            }
        },

        render: function () {
            this.$el.html(this.tpl());
            this.renderAll(this.collection);
            return this;
        },

        renderCurrentGroups: function () {
            var filtered = this.collection.filter(function(model) {
                return (model.get('startDate') < this.getCurrentDate() &&
                model.get('finishDate') > this.getCurrentDate());
            }, this);

            this.$el.html(this.tpl());
            this.renderAll(filtered);
            return this;
        },

        renderFinishedGroups: function () {
            var filtered = this.collection.filter(function(model) {
                var date = new Date();
                return model.get('finishDate') < this.getCurrentDate();
            }, this);

            this.$el.html(this.tpl());
            this.renderAll(filtered);
            return this;
        },

        renderFutureGroups: function () {
            var filtered = this.collection.filter(function(model) {
                return model.get('startDate') > this.getCurrentDate();
            }, this);

            this.$el.html(this.tpl());
            this.renderAll(filtered);
            return this;
        },

        renderAll: function (filtered) {
            filtered.forEach(this.renderOne, this);
        },

        renderOne: function (model) {
            var groupView = new This.GroupView({model: model});
            this.$('#main').append(groupView.render().el);
        },

        addGroup: function () {
            $('body').append(templates.groupModalAddTpl);

            var $groupAddModal = $('#groupAdd'),
                $groupAddBtn = $('.add-new-group');
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

                group.save({
                    wait: true,
                    success: function () {
                        console.log('success');
                    }, 
                    error: function () {
                        console.log('error');
                    }
                });

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
        }
    });
})(App.Groups);