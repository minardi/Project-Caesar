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
        groupsCollection = new App.Admin.Collections.Groups();

    groupsCollection.fetch({success: function () {
        locationsCollection.fetch({success: main})
    }});

    function main () {
        var locationsView = new App.Admin.Views.Locations({collection: locationsCollection}),
            groupsView = new App.Admin.Views.Groups({collection: groupsCollection});
        
        $('#groups').html(groupsView.render().el);
        $('#locations').html(locationsView.render().el);

        $('button.home').on('click', function () {
            window.location.href = '/';
        });       
    }
});
