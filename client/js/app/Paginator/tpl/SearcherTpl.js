templates.searcherTpl = _.template([
    '<div class="col-md-4 pull-right">',
        '<input type="text" class="form-control searchField" autofocus placeholder="Search" value="<%= searchValue%>">',
    '</div>'
].join(''));
