'use strict';
(function (This) {
    This.GroupCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'row content-row',
        tpl: templates.groupCollectionTpl,

        events: {
            'click .add-new-group': 'addGroup'
        },

        initialize: function () {
            this.collection = collections.groups;
            this.listenTo(this.collection, 'add', this.renderOne);
            
            $('body').append(templates.groupModalDeleteTpl);
        },

        render: function (collection) {
            collection = collection || this.collection;
            this.$el.html(this.tpl());
            this.renderAll(collection);
            return this;
        },

        renderCurrentGroups: function () {
            this.$el.html(this.tpl());
            var filtered = this.collection.filter(function(model) {
                return (model.get('startDate') < this.getCurrentDate() &&
                model.get('finishDate') > this.getCurrentDate());
            }, this);
            this.renderAll(filtered);
            return this;
        },

        renderFinishedGroups: function () {
            this.$el.html(this.tpl());
            var filtered = this.collection.filter(function(model) {
                var date = new Date();
                return model.get('finishDate') < this.getCurrentDate();
            }, this);
            this.renderAll(filtered);
            return this;
        },

        renderFutureGroups: function () {
            this.$el.html(this.tpl());
            console.log(this.collection);
            var filtered = this.collection.filter(function(model) {
                return model.get('startDate') > this.getCurrentDate();
            }, this);
            this.renderAll(filtered);
            return this;
        },

        renderAll: function (filtered) {
            filtered.forEach(this.renderOne, this);
        },

        renderOne: function (model) {
            var groupView = new This.GroupView({model: model});
            this.$el.append(groupView.render().el);
        },

        addGroup: function () {
            $('body').append(templates.groupModalAddTpl);
            $('#groupAdd').modal('show');
            $('.add-new-group').on('click', submitNewGroup);

            function submitNewGroup () {
                var group = new App.Groups.Group();
                

                var groupName = $('#groupAdd input[name="GroupName"]').val();

                group.set({name: groupName});

                console.log(group.isValid(name));
            }
        },

        getCurrentDate: function () {
            var currentDate = new Date();
            return currentDate.toISOString();
        }
    });
})(App.Groups);