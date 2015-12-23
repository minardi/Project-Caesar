templates.groupContributorTpl = _.template([
    '<div class="alert alert-info alert-dismissible" id=<%= _id %>>',
        '<strong><%= group %></strong>',
    '</div>'
].join(''));