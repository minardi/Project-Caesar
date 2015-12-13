'use strict';
(function (This) {
    This.Group = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, 'sync', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        tagName: 'tr',
        template: templates.groupTpl,
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
            var groupEditView = new This.GroupCreateEditView({
                model: this.model,
                tpl: templates.groupEditTpl
            }),
            $modalWrap = $('#modal-wrap');

            $modalWrap.html(groupEditView.render().el);
            $modalWrap.find('.modal').modal('show');
        }
    });

    This.Groups = Backbone.View.extend({
        tagName: 'table',
        className: 'table table-striped',
        template: templates.groupsCollectionTpl,

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
            var groupAddView = new This.GroupCreateEditView({
                    collection: this.collection, 
                    tpl: templates.groupAddTpl
                }),
                $modalWrap = $('#modal-wrap');

            $modalWrap.html(groupAddView.render().el);
            $modalWrap.find('.modal').modal('show');
        }
    });

    This.GroupCreateEditView = Backbone.View.extend({
        initialize: function (options) {
            this.model = this.model || new App.Admin.Models.Group();
            this.tpl = options.tpl;
        },

        events: {
            'click .submit': 'submit',
            'click .add-teacher': 'addTeacherInput',
            'click .add-expert': 'addExpertInput'
        },

        render: function () {
            var COURSE_DURATION = 120;

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

            this.model.save(attributes, {wait: true});

            if (this.model.isNew()) {
                this.collection.add(this.model);
            }

            this.$el.find('.modal').modal('hide');
        },

        addTeacherInput: function () {
            this.$el.find('.teachers-block .add-teacher').before('<input type="text" \
                class="form-control" placeholder="Teacher" name="teacher">');
        },

        addExpertInput: function () {
            this.$el.find('.experts-block .add-expert').before('<input type="text" \
                class="form-control" placeholder="Expert" name="expert">');
        }
    });
})(App.Admin.Views);