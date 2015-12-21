templates.groupTeachersTpl = _.template([
    '<% selectedTeachers.forEach(function(teacher) { %>',
        '<option><%= teacher %></option>',
    '<% }); %>'
].join(''));