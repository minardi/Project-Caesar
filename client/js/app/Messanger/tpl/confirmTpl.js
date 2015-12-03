templates.confirmTpl = _.template([
    '<div class="alert alert-info alert-dismissible">',
        '<span class="alert-text"><%= message %></span>',
        '<button type="button" class="close">',
        '    <span>&times;</span>',
        '</button>',
        '<p><button type="button" class="btn btn-primary confirm">Confirm</button><button type="button" class="btn btn-danger close-btn">Close</button></p>',
    '</div>'
].join(''));