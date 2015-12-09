templates.locationTpl = _.template([
    '<div class="content-item">',
        '<h4><%= city%></h4>',
        '<span class="glyphicon glyphicon-education data-info" aria-hidden="true"><%= countGroups %></span>',
        '<span class="glyphicon glyphicon-envelope data-info" aria-hidden="true">1</span>',
        '<p><%= country%></p>',
    '</div>'
].join(''));