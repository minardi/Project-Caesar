templates.groupTpl = _.template([
    '<div class="content-item">',
      '<button type="button" class="close"><span aria-hidden="true" data-target="#groupDelete">×</span></button>',
      '<h4><%= name %></h4>',
      '<p><%= startDate %> - <%= finishDate %></p>',
      '<p><span><%= direction %> </span></p>',
    '</div>'
].join(''));