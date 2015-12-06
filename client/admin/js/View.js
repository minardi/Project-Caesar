'use strict';
(function (This) {
    This.Location = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model,'sync', this.render);
            this.listenTo(this.model,'destroy', this.remove);
        },
        events: {
            'click .delete': 'deleteLocation',
            'click .edit': 'editLocation'
        },
        tagName: 'tr',
        template: _.template(templates.locationTpl),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        deleteLocation: function () {
            this.model.destroy({wait: true});
        },
        editLocation: function () {
            var tpl = _.template(templates.locationModalEditTpl);
            $('body').append(tpl(this.model.toJSON()));

            var $locationEditModal = $('#locationEdit'),
                $locationEditBtn = $('.edit-location'),
                thisModel = this.model;

            $locationEditModal.modal('show');
            $locationEditModal.on('hidden.bs.modal', function () {
                $locationEditModal.remove();
                $locationEditBtn.off('click', editLocation);
            });
            $locationEditBtn.on('click', editLocation);

            function editLocation () {
                var newData = {
                    city: $('#locationEdit input[name="City"]').val(),
                    country: $('#locationEdit input[name="Country"]').val()
                }

                thisModel.save(newData, {wait: true});
                $locationEditModal.modal('hide');
            };
        }
    });

    This.Locations = Backbone.View.extend({
        tagName: 'table',
        className: 'table table-striped',
        template: _.template(templates.locationsCollectionTpl),

        events: {
            'click #add-new-location': 'addLocation'
        },

        initialize: function () {
            this.listenTo(this.collection, 'add', this.renderOne);
        },

        render: function () {
            this.$el.html(this.template());
            this.renderAll(this.collection);
            this.$el.append('<button id="add-new-location" class="btn btn-info" \
                data-toggle="modal">Add location</button>');
            return this;
        },

        renderAll: function (collection) {
            collection.forEach(this.renderOne, this);
        },

        renderOne: function (model) {
            var locationView = new App.Admin.Views.Location({model: model});
            this.$('tbody').append(locationView.render().el);
        },

        addLocation: function () {
            $('body').append(templates.locationModalAddTpl);

            var $locationAddModal = $('#locationAdd'),
                $locationAddBtn = $('.add-new-location'),
                thisCollection = this.collection;

            $locationAddModal.modal('show');
            $locationAddModal.on('hidden.bs.modal', function () {
                $locationAddModal.remove();
                $locationAddBtn.off('click', submitNewlocation);
            });
            $locationAddBtn.on('click', submitNewlocation);

            function submitNewlocation () {
                var location = new App.Admin.Models.Location({
                    id: _.uniqueId('newlocation_'),
                    city: $('#locationAdd input[name="City"]').val(),
                    country: $('#locationAdd input[name="Country"]').val()
                });

                thisCollection.create(location.toJSON(), {wait: true});

                $locationAddModal.modal('hide');
            };
        }
    });

    This.Group = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'sync', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        tagName: 'tr',
        template: _.template(templates.groupTpl),
        events: {
            'click .delete': 'deleteGroup',
             'click .edit': 'editGroup'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        deleteGroup: function () {
            this.model.destroy({wait: true});
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
        }
    });

    This.Groups = Backbone.View.extend({
        tagName: 'table',
        className: 'table table-striped',
        template: _.template(templates.groupsCollectionTpl),

        events: {
            'click #add-new-group': 'addGroup'
        },

        initialize: function () {
            this.listenTo(this.collection, 'add', this.renderOne);
        },

        render: function () {
            this.$el.html(this.template());
            this.renderAll(this.collection);
            this.$el.append('<button id="add-new-group" class="btn btn-info" \
                data-toggle="modal">Add group</button>');
            return this;
        },

        renderAll: function (collection) {
            collection.forEach(this.renderOne, this);
        },

        renderOne: function (model) {
            var groupView = new App.Admin.Views.Group({model: model});
            this.$('tbody').append(groupView.render().el);
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
                var group = new App.Admin.Models.Group({
                    id: _.uniqueId('newGroup_'),
                    name: $('#groupAdd input[name="GroupName"]').val(),
                    direction: $('#groupAdd select[name="Direction"] option:selected').val(),
                    location: $('#groupAdd select[name="LocationName"] option:selected').val(),
                    startDate: $('#groupAdd #startDate').val(),
                    finishDate: $('#groupAdd #finishDate').val(),
                    status: $('#groupAdd select[name="StatusName"] option:selected').val(),
                    teachers: collectTeachers(),
                    experts: collectExperts()
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
        }
    });
})(App.Admin.Views);