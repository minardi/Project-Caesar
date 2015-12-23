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
        '<div class="content-wrap">',
            '<h4><%= name %></h4>',
            '<p><span><%= teachers %> </span></p>',
            '<p><%= startDate %> - <%= finishDate %></p>',
        '</div>',
    '</div>'
].join(''));