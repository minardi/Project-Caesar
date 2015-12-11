'use strict';
(function (This) {
    This.GroupAddEditView = Backbone.View.extend({
        initialize: function (options) {
            this.model = this.model || new This.Group();
            this.tpl = options.tpl;

            Backbone.Validation.bind(this);

            this.model.bind('validated:valid', function () {
                this.$el.find('.modal').modal('hide');
            }, this);

            this.model.bind('validated:invalid', function (model, errors) {
                console.log(errors);
            });
        },

        events: {
            'click .submit': 'submit',
            'click .add-teacher': 'addTeacherInput',
            'click .add-expert': 'addExpertInput'
        },

        render: function () {
            var COURSE_DURATION = 120;

            this.model.set({locations: collections.locations});
            this.$el.html(this.tpl(this.model.toJSON()));

            this.$el.find('#startDate').datetimepicker({
                format: 'YYYY-MM-DD',
                defaultDate: moment().format()
            });
            this.$el.find('#finishDate').datetimepicker({
                format: 'YYYY-MM-DD',
                defaultDate: moment().add(COURSE_DURATION, 'days').format()
            });

            return this;
        },

        submit: function () {
            var attributes = {
                    name: this.$el.find('input[name="GroupName"]').val(),
                    direction: this.$el.find('select[name="Direction"] option:selected').val(),
                    location: this.$el.find('select[name="LocationName"] option:selected').val(),
                    startDate: this.$el.find('#startDate').val(),
                    finishDate: this.$el.find('#finishDate').val(),
                    status: this.$el.find('select[name="StatusName"] option:selected').val(),
                    teachers: collectTeachersExperts('teacher'),
                    experts: collectTeachersExperts('expert')
                };

            function collectTeachersExperts (fieldName) {
                return $('input[name=' + fieldName + ']').map(function () { 
                    return $(this).val();
                }).get();
            }

            this.model.unset('locations');
            this.model.save(attributes);

            if (this.model.isValid() && this.model.isNew()) {
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