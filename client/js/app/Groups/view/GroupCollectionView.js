'use strict';
(function (This) {
    This.GroupCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'row content-row',
        tpl: templates.groupCollectionTpl,

        events: {
            'click .add-new-group': 'addGroup',
            'click #up-navig': 'renderUp',
            'click #down-navig': 'renderDown'
        },

        initialize: function () {
            this.currentView = 'renderCurrent';
            this.collection = collections.groups;
            this.listenTo(this.collection, 'add', this.renderOne);
            
            $('body').append(templates.groupModalDeleteTpl);
        },

        renderUp: function () {
            if (this.currentView === 'renderCurrent') {
                cs.mediator.publish('futureGroups');

                this.renderFutureGroups();
                this.currentView = 'renderFuture';
            } else if (this.currentView === 'renderFinished') {
                cs.mediator.publish('currentGroups');

                this.renderCurrentGroups();
                this.currentView = 'renderCurrent';
            }
        },

        renderDown: function () {
            if (this.currentView === 'renderCurrent') {
                cs.mediator.publish('finishedGroups');

                this.renderFinishedGroups();
                this.currentView = 'renderFinished';
            } else if (this.currentView === 'renderFuture') {
                cs.mediator.publish('currentGroups');

                this.renderCurrentGroups();
                this.currentView = 'renderCurrent';
            }
        },

        render: function () {
            this.$el.html(this.tpl());
            this.renderAll(this.collection);
            return this;
        },

        renderCurrentGroups: function () {
            var filtered = this.collection.filter(function(model) {
                return (model.get('startDate') < this.getCurrentDate() &&
                model.get('finishDate') > this.getCurrentDate());
            }, this);

            this.$el.html(this.tpl());
            this.renderAll(filtered);
            return this;
        },

        renderFinishedGroups: function () {
            var filtered = this.collection.filter(function(model) {
                var date = new Date();
                return model.get('finishDate') < this.getCurrentDate();
            }, this);

            this.$el.html(this.tpl());
            this.renderAll(filtered);
            return this;
        },

        renderFutureGroups: function () {
            var filtered = this.collection.filter(function(model) {
                return model.get('startDate') > this.getCurrentDate();
            }, this);

            this.$el.html(this.tpl());
            this.renderAll(filtered);
            return this;
        },

        renderAll: function (filtered) {
            filtered.forEach(this.renderOne, this);
        },

        renderOne: function (model) {
            var groupView = new This.GroupView({model: model});
            this.$('#main').append(groupView.render().el);
        },

        addGroup: function () {
            $('body').append(templates.groupModalAddTpl);
            $('#groupAdd').modal('show');
            $('.add-new-group').on('click', submitNewGroup);

            function submitNewGroup () {
                var group = new App.Groups.Group();

                var groupName = $('#groupAdd input[name="GroupName"]').val();

                group.set({name: groupName});
            }
        },

        getCurrentDate: function () {
            var currentDate = new Date();
            return currentDate.toISOString();
        }
    });
})(App.Groups);