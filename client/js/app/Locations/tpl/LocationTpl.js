templates.locationTpl = _.template([
    '<div class="content-item">',
        '<h4><%= city%></h4>',
        '<p><%= country%></p>',
    '</div>'
].join(''));