templates.paginatorTpl = _.template([
    '<ul class="pagination">',
      '<% for (var i = 1; (i <= maxPage) && (maxPage > 1); i++) { %>',
          '<li class="pageEl',
            '<% if(i == currentPage + 1) {%>',
              ' active',
            '<% }; %>',
          '" value="<%= i %>"><a><%= i %></a></li>',
      '<% }; %>',
    '</ul>'
].join(''));
