templates.contributorTpl = _.template([
    '<div class="content-item">',
        '<div class="content-wrap">',
            '<h4><%= name %> <%= lastName %></h4>',
            '<p><%= team %></p>',
        '</div>',
    '</div>'
].join(''));