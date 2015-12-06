templates.paginatorTpl = _.template([
    '<nav class="content-pagination">',
      '<ul class="pagination">',
//        '<li>',
//          '<a href="" aria-label="Previous">',
//            '<span aria-hidden="true">&laquo;</span>',
//          '</a>',
//        '</li>',

        '<% for (var i = 1; (i <= maxPage) && (maxPage > 1); i++) { %>',
            '<li class="pageEl',
              '<% if(i == currentPage + 1) {%>',
                ' active',
              '<% }; %>',
            '" value="<%= i %>"><a><%= i %></a></li>',
        '<% }; %>',

//        '<li>',
//          '<a href="" aria-label="Next">',
//            '<span aria-hidden="true">&raquo;</span>',
//          '</a>',
//        '</li>',
      '</ul>',
    '</nav>'
].join(''));
