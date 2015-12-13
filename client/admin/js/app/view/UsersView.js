'use strict';
(function (This) {
    This.User = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model,'sync', this.render);
            this.listenTo(this.model,'destroy', this.remove);
        },
        events: {
            'click .edit': 'editUser',
            'click .delete': 'deleteUser'
        },
        tagName: 'tr',
        template: templates.userTpl,
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        deleteUser: function () {
            this.model.destroy({wait: true});
        },
        editUser: function () {
            var userEditView = new This.UserCreateEditView({
                    model: this.model, 
                    tpl: templates.userEditTpl
                }),
                $modalWrap = $('#modal-wrap');

            $modalWrap.html(userEditView.render().el);
            $modalWrap.find('.modal').modal('show');
        }
    });

    This.Users = Backbone.View.extend({
        tagName: 'table',
        className: 'table table-striped',
        template: templates.usersCollectionTpl,

        initialize: function () {
            this.listenTo(this.collection, 'add', this.renderOne);
        },

        events: {
            'click #add-new-user': 'addNew'
        },

        render: function () {
            this.$el.html(this.template());
            this.renderAll(this.collection);
            this.$el.append('<button id="add-new-user" class="btn btn-info" \
                data-toggle="modal">Add user</button>');
            return this;
        },

        renderAll: function (collection) {
            collection.forEach(this.renderOne, this);
        },

        renderOne: function (model) {
            var userView = new App.Admin.Views.User({model: model});
            this.$('tbody').append(userView.render().el);
        },

        addNew: function () {
            var userCreateView = new This.UserCreateEditView({
                    collection: this.collection, 
                    tpl: templates.userAddTpl
                }),
                $modalWrap = $('#modal-wrap');

            $modalWrap.html(userCreateView.render().el);
            $modalWrap.find('.modal').modal('show');
        }
    });

    This.UserCreateEditView = Backbone.View.extend({
        initialize: function (options) {
            this.model = this.model || new App.Admin.Models.User();
            this.tpl = options.tpl;
        },

        events: {
            'click .change-password': 'changePassword',
            'click .submit': 'submit',
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },

        changePassword: function () {
            this.$el.find('.input-group.new-password').css('display', 'table')
                .append('<input type="password" class="form-control" \
                    name="Password" placeholder="qwerty" aria-describedby="basic-addon1">');
        },

        submit: function () {
            var that = this,
                attributes = {
                    name: this.$el.find('input[name="Name"]').val(),
                    lastName: this.$el.find('input[name="LastName"]').val(),
                    role: this.$el.find('select[name="Role"] option:selected').val(),
                    locationCity: this.$el.find('input[name="LocationCity"]').val(),
                    locationCountry: this.$el.find('input[name="LocationCountry"]').val(),
                    login: this.$el.find('input[name="Login"]').val(),
                    password: setPassword()
                };

            function setPassword () {
                var $passwordValue = that.$el.find('input[name="Password"]').val();
                if ($passwordValue) {
                    return md5($passwordValue);
                } else {
                    return that.model.get('password');
                }
            }

            this.model.save(attributes, {wait: true});
            
            if (this.model.isNew()) {
                this.collection.add(this.model);
            }

            this.$el.find('.modal').modal('hide');
        }
    });
})(App.Admin.Views);