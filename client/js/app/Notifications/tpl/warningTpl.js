templates.warningTpl = _.template([
    '<div class="alert alert-warning alert-dismissible">',
        '<span class="alert-text"><%= message %></span>',
        '<button type="button" class="close">',
        '    <span>&times;</span>',
        '</button>',
    '</div>'
].join(''));