templates.groupTpl = _.template([
    '<div class="content-item">',
        '<h4><%= title %></h4>',
        '<p><%= startDate%> - <%= finishDate%></p>',
        '<p><span>Status:</span><%= status %></p>',
    '</div>'
].join(''));