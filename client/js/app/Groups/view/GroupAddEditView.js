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
            'click .add-expert': 'addExpertInput'
        },

        render: function () {
            var group = this;

            getTeachers();
            initRenderInfo();
            initDatapicers();

            function initRenderInfo () {
                var groupJsonInfo;

                groupJsonInfo = group.model.toJSON();
                groupJsonInfo.locations = collections.locations;
                groupJsonInfo.allTeachers = collections.teachers;

                group.$el.html(group.tpl(groupJsonInfo));
            }
            
            function initDatapicers () {
                var COURSE_DURATION = 120;

                group.$el.find('#startDate').datetimepicker({
                format: 'YYYY-MM-DD',
                defaultDate: moment().format()
                });
                group.$el.find('#finishDate').datetimepicker({
                    format: 'YYYY-MM-DD',
                    defaultDate: moment().add(COURSE_DURATION, 'days').format()
                });
            }
            
            function getTeachers () {
                var teachers = new App.Employee.EmployeeCollection(),
                    teachersFullName = [];
                
                teachers.fetch({
                    async:false,
                    success: function() {
                        teachers = teachers.filter('Teacher');
                        teachers.forEach (function (teacher) {
                            var teacherName = teacher.get('lastName')
                                              + ' ' + teacher.get('name');

                            teachersFullName.push(teacherName);
                        });
                        collections.teachers = teachersFullName;
                    }
                });
            };
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
                    teachers: this.$el.find('select[name="Teachers"] option:selected').val(),
                    experts: collectTeachersExperts('expert')
                };

            function collectTeachersExperts (fieldName) {
                return $('input[name=' + fieldName + ']').map(function () { 
                    return $(this).val();
                }).get();
            }

            this.model.save(attributes);

            if (this.model.isValid() && this.model.isNew()) {
                this.collection.add(this.model);
                cs.messenger.showInformation('Group added');
            } else if (this.model.isValid() && !this.model.isNew()) {
                cs.messenger.showInformation('Group updated');
            };
        },

        addExpertInput: function () {
            this.$el.find('.experts-block .add-expert').before('<input type="text" \
                class="form-control" placeholder="Expert" name="expert">');
        }
    });
})(App.Groups);