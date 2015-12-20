templates.contributorTpl = _.template([
    '<div class="content-item contributor-item">',
        '<div class="media">',
          '<div class="media-left">',
            '<a href="#">',
              '<img width="100" height="100" class="media-object" src="" alt="">',
            '</a>',
          '</div>',
          '<div class="media-body">',
            '<h4 class="media-heading"><%= name %> <%= lastName %></h4>',
            '<p><%= group %></p>',
          '</div>',
        '</div>',
    '</div>'
].join(''));