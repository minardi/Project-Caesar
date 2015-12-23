templates.paginatorTpl = _.template([
    '<ul class="pagination">',
      '<% if (maxPage > 1) { %>',
        '<li class="prev">',
            '<span aria-hidden="true">&laquo;</span>',
        '</li>',
        '<% for (var i = 1; (i <= maxPage); i++) { %>',
          '<li class="pageEl',
            '<% if(i == currentPage + 1) {%>',
              ' active',
            '<% }; %>',
          '" value="<%= i %>"><a><%= i %></a></li>',
        '<% }; %>',
        '<li class="next">',
            '<span aria-hidden="true">&raquo;</span>',
        '</li>',
      '<% } %>',
    '</ul>'
].join(''));
