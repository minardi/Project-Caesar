templates.groupTpl = _.template([
    '<div class="content-item">',
        '<button type="button" class="close"><span aria-hidden="true" data-target="#groupDelete">×</span></button>',
        '<a class="edit-group">',
            '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>',
        '</a>',
        '<h4><%= name %></h4>',
        '<p><%= startDate %> - <%= finishDate %></p>',
        '<p><span><%= direction %> </span></p>',
    '</div>'
].join(''));