templates.groupTpl = _.template([
    '<div class="content-item">',
        '<% if (userRole === "Coordinator" || userRole === "Administrator") { %>',
            '<a class="delete-group-ico">',
                '<span class="glyphicon glyphicon-remove" aria-hidden="true" data-toggle="modal" data-target="#groupDelete"></span>',
            '</a>',
            '<a class="edit-group-ico">',
                '<span class="glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="modal" data-target="#groupEdit"></span>',
            '</a>',
        '<% } %>',
        '<h4><%= name %></h4>',
        '<p><%= startDate %> - <%= finishDate %></p>',
        '<p><span><%= direction %> </span></p>',
    '</div>'
].join(''));