'use strict';
(function (This) {
    This.GroupView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-4',
        tpl: templates.groupTpl,

        events: {
            'click .edit-group': 'editGroup',
            'click .content-item .close': 'deleteGroup'
        },
        
        initialize: function () {
            this.listenTo(this.model, 'sync', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },
        
        showStudents: function () {
            alert(this.model.get('students').join());
        },

        editGroup: function () {
            var tpl = _.template(templates.groupModalEditTpl);
            $('body').append(tpl(this.model.toJSON()));

            var $groupEditModal = $('#groupEdit'),
                $groupEditBtn = $('.edit-group'),
                thisModel = this.model;

            $groupEditModal.modal('show');
            $groupEditModal.on('hidden.bs.modal', function () {
                $groupEditModal.remove();
                $groupEditBtn.off('click', editGroup);
            });
            $groupEditBtn.on('click', editGroup);

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
                var teacherSelect = $('#groupEdit .teachers-block input');
                $('.add-teacher').on('click', function () {
                    teacherSelect.clone().appendTo('.teachers-block .input-group');
                });
            };
            function addAdditionalExpert () {
                var expertSelect = $('#groupEdit .experts-block input');
                $('.add-expert').on('click', function () {
                    expertSelect.clone().appendTo('.experts-block .input-group');
                });
            };
            function editGroup () {
                var newData = {
                    name: $('#groupEdit input[name="GroupName"]').val(),
                    direction: $('#groupEdit select[name="Direction"] option:selected').val(),
                    location: $('#groupEdit select[name="LocationName"] option:selected').val(),
                    startDate: $('#groupEdit #startDate').val(),
                    finishDate: $('#groupEdit #finishDate').val(),
                    status: $('#groupEdit select[name="StatusName"] option:selected').val(),
                    teachers: collectTeachers(),
                    experts: collectExperts()
                };

                thisModel.save(newData, {wait: true});

                $groupEditModal.modal('hide');

                function collectTeachers () {
                    var teachers = $('#groupEdit input[name="teacher"]');
                    var teachersValue = [];
                    teachers.each(function () {
                        teachersValue.push($(this).val());
                    });
                    return teachersValue;
                };
                function collectExperts () {
                    var experts = $('#groupEdit input[name="experts"]');
                    var expertsValue = [];
                    experts.each(function () {
                        expertsValue.push($(this).val());
                    });
                    return expertsValue;
                };
            };
        },

        deleteGroup: function () {
            var thisGroup = this.model;
            $('#groupDelete').modal('show');
            $('#groupDelete .delete').on('click', destroyGroup);
            
            function destroyGroup () {
                thisGroup.destroy({wait: true});
                $('#groupDelete').modal('hide');
                $('#groupDelete .delete').off('click', destroyGroup);
            };
        }
    });
})(App.Groups);