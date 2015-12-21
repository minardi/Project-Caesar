'use strict';
(function (This) {
    This.GroupAddEditView = Backbone.View.extend({
        initialize: function (options) {
            this.model = this.model || new This.Group();
            this.tpl = options.tpl;
        },

        events: {
            'click .close-btn, .close': 'closeView',
            'click .submit': 'submit',
            'click .add-expert': 'addExpertInput',
            'change select[name="LocationName"]': 'renderTeachersView'
        },

        render: function () {
            var group = this;

            initRenderInfo();
            initDatapickers();
            this.renderTeachersView();

            function initRenderInfo () {
                var groupJsonInfo;

                groupJsonInfo = group.model.toJSON();
                groupJsonInfo.locations = collections.locations;
                groupJsonInfo.directions = collections.directions;

                group.$el.html(group.tpl(groupJsonInfo));
            }
            
            function initDatapickers () {
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
            return this;
        },

        renderTeachersView: function () {
            function renderCitysTeachers () {
                var locations = collections.locations,
                    teachers = collections.teachers,
                    citysTeachers = {};

                locations.forEach(function (location) {
                    var city = location.get('city');

                    citysTeachers[city] = [];

                    teachers.forEach(function (teacher) {
                        var teacherCity = teacher.get('location').city,
                            teacherFullName = teacher.get('lastName')
                                            + ' ' + teacher.get('name');
                        
                        if (city === teacherCity) {
                            citysTeachers[city].push(teacherFullName);
                        };
                    });

                });
                return citysTeachers;
            };

            var currentCity = $('select[name="LocationName"] option:selected').val(),
                cityTeachers = renderCitysTeachers(),
                currentteachers = [],
                thisGroup = this.model;

            $.each(cityTeachers, function(city, cityTeacher) {
                if (currentCity === city) {
                    $('.cityTeachers').html(templates.groupTeachersTpl({selectedTeachers: cityTeacher}));
                    
                    if (!thisGroup.isNew()) {
                        // $.each(, function (argument) {
                            console.log(thisGroup.get('teachers'));
                        // });
                    };
                };
            });
        },

        closeView: function () {
            var thisView = this;
            this.$el.find('.modal').modal('hide')
                .on('hidden.bs.modal', function () {
                    thisView.remove();
                });
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
                    experts: collectExperts()
                };

            function collectExperts () {
                return $('input[name="expert"]').map(function () { 
                    return $(this).val();
                }).get();
            }

            this.model.save(attributes);

            if (this.model.isValid() && this.model.isNew()) {
                this.collection.add(this.model, {wait: true});
                cs.messenger.showInformation('Group added');
                this.closeView();
            } else if (this.model.isValid() && !this.model.isNew()) {
                cs.messenger.showInformation('Group updated');
                this.closeView();
            };
        },

        addExpertInput: function () {
            this.$el.find('.experts-block .add-expert').before('<input type="text" \
                class="form-control" placeholder="Expert" name="expert">');
        }
    });
})(App.Groups);