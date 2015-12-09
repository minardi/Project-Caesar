templates.searcherTpl = _.template([
        '<input type="text" class="form-control searchField" autofocus placeholder="Search" value="<%= searchValue%>">',
        '<span id="searchclear" class="glyphicon glyphicon-remove-circle"></span>'
].join(''));
