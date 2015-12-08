var App = {
    Admin: {
        Models: {},
        Views: {},
        Collections: {}
    }
},
templates = {};

Backbone.Model.prototype.idAttribute = "_id";

$(function () {
    var locationsCollection = new App.Admin.Collections.Locations(),
        groupsCollection = new App.Admin.Collections.Groups(),
        usersCollection = new App.Admin.Collections.Users();

    groupsCollection.fetch({success: function () {
        locationsCollection.fetch({success: function () {
            usersCollection.fetch({success: main});
        }});
    }});

    function main () {
        var locationsView = new App.Admin.Views.Locations({collection: locationsCollection}),
            groupsView = new App.Admin.Views.Groups({collection: groupsCollection}),
            usersView = new App.Admin.Views.Users({collection: usersCollection});
        
        $('#groups').html(groupsView.render().el);
        $('#locations').html(locationsView.render().el);
        $('#users').html(usersView.render().el);

        $('button.home').on('click', function () {
            window.location.href = '/';
        });       
    }
});
