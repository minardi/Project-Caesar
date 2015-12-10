'use strict';
(function (This) {
    This.CreateEditGroupView = Backbone.View.extend({
        initialize: function (options) {
            this.model = this.model || new App.Groups.Group();
            this.tpl = options.tpl,
            Backbone.Validation.bind(this, {invalid: this.showErr});
        },
        tagName: 'div',

        events: {
            'click .submit': 'submit',
            'click .add-teacher': 'addTeacherInput',
            'click .add-expert': 'addExpertInput'
        },

        showErr: function (view, attr, error, selector) {
            console.log('err');
        },

        render: function () {
            this.$el.html(this.tpl());

            this.$el.find('#startDate').datetimepicker({
                format: 'YYYY-MM-DD',
                defaultDate: moment().format()
            });
            this.$el.find('#finishDate').datetimepicker({
                format: 'YYYY-MM-DD',
                defaultDate: moment().add(120, 'days').format()
            });

            return this;
        },

        submit: function () {
            var groupData = {
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

            this.model.save(groupData, {wait: true});
            if (this.model.isNew()) {
                console.log('new model');
                this.collection.add(this.model);
            }
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
})(App.Groups);