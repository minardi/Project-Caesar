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
        template: templates.locationTpl,
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        deleteLocation: function () {
            this.model.destroy({wait: true});
        },
        editLocation: function () {
            var locationEditView = new This.LocationCreateEditView({
                    model: this.model, 
                    tpl: templates.locationEditTpl
                }),
                $modalWrap = $('#modal-wrap');

            $modalWrap.html(locationEditView.render().el);
            $modalWrap.find('.modal').modal('show');
        }
    });

    This.Locations = Backbone.View.extend({
        tagName: 'table',
        className: 'table table-striped',
        template: templates.locationsCollectionTpl,

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
            var locationAddView = new This.LocationCreateEditView({
                    collection: this.collection, 
                    tpl: templates.locationAddTpl
                }),
                $modalWrap = $('#modal-wrap');

            $modalWrap.html(locationAddView.render().el);
            $modalWrap.find('.modal').modal('show');
        }
    });

    This.LocationCreateEditView = Backbone.View.extend({
        initialize: function (options) {
            this.model = this.model || new App.Admin.Models.Location();
            this.tpl = options.tpl;
        },

        events: {
            'click .submit': 'submit',
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },

        submit: function () {
            var attributes = {
                    city: this.$el.find('input[name="City"]').val(),
                    country: this.$el.find('input[name="Country"]').val()
                };

            this.model.save(attributes, {wait: true});

            if (this.model.isNew()) {
                this.collection.add(this.model);
            }

            this.$el.find('.modal').modal('hide');
        }
    });
})(App.Admin.Views);