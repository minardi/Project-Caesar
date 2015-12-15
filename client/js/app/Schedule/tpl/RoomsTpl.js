templates.roomsTpl = _.template([
    '<% rooms.forEach(function(room) { %>',
        '<option><%= room.get("name") %></option>',
    '<% }, this); %>',
].join(''));