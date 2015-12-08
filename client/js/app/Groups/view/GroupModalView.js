'use strict';
(function (This) {
    This.GroupAddModalView = Backbone.View.extend({
        tagName: 'div',
        tpl: templates.groupModalAddTpl,

        events: {
            'click .add-new-group': 'addGroup',
            'click .add-teacher': 'addTeacherInput',
            'click .add-expert': 'addExpertInput'
        },

        render: function () {
            this.$el.html(this.tpl());

            this.$el.find('#startDate').datetimepicker({
                format: 'YYYY-MM-DD',
                defaultDate: '2015-10-25T01:32:21.196Z'
            });
            this.$el.find('#finishDate').datetimepicker({
                format: 'YYYY-MM-DD',
                defaultDate: '2016-01-25T01:32:21.196Z'
            });

            return this;
        },

        addGroup: function () {
            var newGroup = {
                    name: $('#groupAdd input[name="GroupName"]').val(),
                    direction: $('#groupAdd select[name="Direction"] option:selected').val(),
                    location: $('#groupAdd select[name="LocationName"] option:selected').val(),
                    startDate: $('#groupAdd #startDate').val(),
                    finishDate: $('#groupAdd #finishDate').val(),
                    status: $('#groupAdd select[name="StatusName"] option:selected').val(),
                    teachers: collectTeachers(),
                    experts: collectExperts()
                };

            function collectTeachers () {
                var teachers = $('#groupAdd input[name="teacher"]');
                var teachersValue = [];
                teachers.each(function () {
                    teachersValue.push($(this).val());
                });

                return teachersValue;
            };

            function collectExperts () {
                var experts = $('#groupAdd input[name="expert"]');
                var expertsValue = [];
                experts.each(function () {
                    expertsValue.push($(this).val());
                });

                return expertsValue;
            };

            this.collection.create(newGroup, {wait: true});
        },

        addTeacherInput: function () {
            this.$el.find('.teachers-block .input-group').append('<input type="text" \
                class="form-control" placeholder="Teacher" name="teacher">');
        },

        addExpertInput: function () {
            this.$el.find('.experts-block .input-group').append('<input type="text" \
                class="form-control" placeholder="Expert" name="expert">');
        }
    });

    This.GroupEditModalView = Backbone.View.extend({
        tagName: 'div',
        tpl: templates.groupModalEditTpl,

        events: {
            'click .edit-group': 'editGroup',
            'click .add-teacher': 'addTeacherInput',
            'click .add-expert': 'addExpertInput'
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            this.$el.find('#startDate').datetimepicker({
                format: 'YYYY-MM-DD',
                defaultDate: '2015-10-25T01:32:21.196Z'
            });
            this.$el.find('#finishDate').datetimepicker({
                format: 'YYYY-MM-DD',
                defaultDate: '2016-01-25T01:32:21.196Z'
            });

            return this;
        },

        editGroup: function () {
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

            function collectTeachers () {
                var teachers = $('#groupEdit input[name="teacher"]');
                var teachersValue = [];
                teachers.each(function () {
                    teachersValue.push($(this).val());
                });

                return teachersValue;
            };

            function collectExperts () {
                var experts = $('#groupEdit input[name="expert"]');
                var expertsValue = [];
                experts.each(function () {
                    expertsValue.push($(this).val());
                });

                return expertsValue;
            };

            this.model.save(newData, {wait: true});
        },

        addTeacherInput: function () {
            this.$el.find('.teachers-block .input-group').append('<input type="text" \
                class="form-control" placeholder="Teacher" name="teacher">');
        },

        addExpertInput: function () {
            this.$el.find('.experts-block .input-group').append('<input type="text" \
                class="form-control" placeholder="Expert" name="expert">');
        }
    });

    This.GroupDeleteModalView = Backbone.View.extend({
        tagName: 'div',
        tpl: templates.groupModalDeleteTpl,

        events: {
            'click .delete': 'deleteGroup'
        },

        render: function () {
            this.$el.html(this.tpl());

            return this;
        },

        deleteGroup: function () {
            this.model.destroy({wait: true});
        }
    });
})(App.Groups);