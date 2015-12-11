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
            var COURSE_DURATION = 120;

            getTeachers();
            this.model.set({locations: collections.locations});
            this.model.set({allTeachers: collections.teachers});

            this.$el.html(this.tpl(this.model.toJSON()));

            this.$el.find('#startDate').datetimepicker({
                format: 'YYYY-MM-DD',
                defaultDate: moment().format()
            });
            this.$el.find('#finishDate').datetimepicker({
                format: 'YYYY-MM-DD',
                defaultDate: moment().add(COURSE_DURATION, 'days').format()
            });

            function getTeachers () {
                var Profile = Backbone.Model.extend();
                var ProfileList = Backbone.Collection.extend({
                   model: Profile,
                   url: "/users"
                });

                var profiles = new ProfileList(); 
                profiles.fetch({
                    async: false,
                    success: function() {
                        profiles = profiles.where({role: "Teacher"});
                        collections.teachers = profiles;
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

            this.model.unset('locations');
            this.model.unset('allTeachers');

            this.model.save(attributes);

            if (this.model.isValid() && this.model.isNew()) {
                this.collection.add(this.model);
            }
        },

        addExpertInput: function () {
            this.$el.find('.experts-block .input-group').append('<input type="text" \
                class="form-control" placeholder="Expert" name="expert">');
        }
    });
})(App.Groups);