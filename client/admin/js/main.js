window.App = {
    Models: {},
    Views: {},
    Collections: {}
};

Backbone.Model.prototype.idAttribute = "_id";

App.Views.Location = Backbone.View.extend({
    initialize: function () {
        this.listenTo(this.model,'sync', this.render);
        this.listenTo(this.model,'destroy', this.remove);
    },
    events: {
        'click .delete': 'deleteLocation'
    },
    tagName: 'tr',
    template: _.template(templates.locationTpl),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    },
    deleteLocation: function () {
        this.model.destroy({wait: true});
    }
});

App.Views.Locations = Backbone.View.extend({
    initialize: function () {
        this.collection.on('add', this.appendNewLocation, this);
    },
    events: {
        'click #add-new': 'addNewLocation'
    },
    tagName: 'table',
    className: 'table table-striped',
    template: _.template(templates.locationsCollectionTpl),
    render: function () {
        this.$el.html(this.template({locations: this.collection}));
        this.$el.append('<button id="add-new" class="btn btn-info" \
            data-toggle="modal">Add location</button>');

        return this;
    },
    appendNewLocation: function (location) {
        var locationView = new App.Views.Location({model: location});
        this.$el.append(locationView.render().el);
    },
    addNewLocation: function () {
        var addLocationView = new App.Views.AddLocation({collection: this.collection});

        $('body').append(addLocationView.render().el);
        $('#locationAdd').modal('show');
    }
});

App.Views.Group = Backbone.View.extend({
    events: {
        'click .delete': 'deleteGroup'
        // 'click .delete': 'log'
    },
    log: function () {
        console.log('del');
    },
    initialize: function () {
        this.model.on('change', function () {
            this.render();
        }, this);
        this.model.on('destroy', function () {
            this.remove();
        }, this);
    },
    tagName: 'tr',
    template: _.template(templates.groupTpl),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    },
    deleteGroup: function () {
        this.model.destroy({wait: true});
    }
});

App.Views.Groups = Backbone.View.extend({
    tagName: 'table',
    className: 'table table-striped',
    template: _.template(templates.groupsCollectionTpl),

    events: {
        'click #add-new': 'addGroup',
        'click #up-navig': 'renderUp',
        'click #down-navig': 'renderDown'
    },

    initialize: function () {
        this.listenTo(this.collection, 'add', this.renderOne);
        $('body').append(templates.groupModalDeleteTpl);
    },

    render: function () {
        this.$el.html(this.template());
        this.renderAll(this.collection);
        this.$el.append('<button id="add-new" class="btn btn-info" \
            data-toggle="modal">Add group</button>');
        return this;
    },

    renderAll: function (collection) {
        collection.forEach(this.renderOne, this);
    },

    renderOne: function (model) {
        var groupView = new App.Views.Group({model: model});
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
            var group = new App.Models.Group({
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

            thisCollection.create({wait: true});

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

App.Views.AddGroup = Backbone.View.extend({
    template: _.template(templates.groupModalAddTpl),
    render: function () {
        this.$el.html(this.template());
        return this;
    },
    events: {
        'click .add-new-group': 'createNewGroup'
    },
    createNewGroup: function () {
        var arr = this.$el.find('input').serializeArray(),
            data = _(arr).reduce(function(acc, field) {
              acc[field.name] = field.value;
              return acc;
            }, {});
        this.model = new App.Models.Group(data);
        if (!this.model.isNew()) {
            this.model.save(null, {dataType: 'text'});
        } else {
            this.collection.create(this.model.toJSON());
        }
    }
});

App.Views.AddLocation = Backbone.View.extend({
    template: _.template(templates.locationModalAddTpl),
    render: function () {
        this.$el.html(this.template());
        return this;
    },
    events: {
        'click .add-new-group': 'createNewLocation'
    },
    createNewLocation: function () {
        var arr = this.$el.find('input').serializeArray(),
            data = _(arr).reduce(function(acc, field) {
              acc[field.name] = field.value;
              return acc;
            }, {});
        this.model = new App.Models.Group(data);
        if (!this.model.isNew()) {
            this.model.save(null, {dataType: 'text'});
        } else {
            this.collection.create(this.model.toJSON());
        }
    }
});

App.Models.Location = Backbone.Model.extend({
    defaults: function () {
        return {
            city: '',
            country: ''
        };
    }
});

App.Collections.Locations = Backbone.Collection.extend({
    model: App.Models.Location,
    url: '/dbLocations'
});

App.Models.Group= Backbone.Model.extend({
    urlRoot: '/group',
    defaults: function () {
        return {
            name: '',
            direction: '',
            location: '',
            startDate: '',
            finishDate: '',
            status: ''
            // teachers: [],
            // experts: [],
            // students: []
        };
    },

    parse: function(data) {
        data.startDate = new Date(data.startDate).toISOString().slice(0, 10);
        data.finishDate = new Date(data.finishDate).toISOString().slice(0, 10);
        return data;
    }
});

App.Collections.Groups = Backbone.Collection.extend({
    model: App.Models.Group,
    url: '/groups'
});

$(function () {
    var locationsCollection = new App.Collections.Locations(),
        groupsCollection = new App.Collections.Groups();

    locationsCollection.fetch();
    groupsCollection.fetch();

    var locationsView = new App.Views.Locations({collection: locationsCollection}),
        groupsView = new App.Views.Groups({collection: groupsCollection});

    $('#locations').html(locationsView.render().el);
    $('#groups').html(groupsView.render().el);

    $('button.home').on('click', function () {
        window.location.href = '/';
    })
});