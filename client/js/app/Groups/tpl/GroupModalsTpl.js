templates.groupModalDeleteTpl = _.template([
    '<div class="modal fade" id="groupDelete" tabindex="-1" role="dialog">',
        '<div class="modal-dialog">',
            '<div class="modal-content">',
                '<div class="modal-header">',
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                    '<h4 class="modal-title">You want to delete group</h4>',
                '</div>',
                '<div class="modal-body">',
                    '<p>Please confirm, that you want to delete group?</p>',
                '</div>',
                '<div class="modal-footer">',
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
                    '<button type="button" class="btn btn-primary delete">Delete</button>',
                '</div>',
            '</div>',
        '</div>',
    '</div>'
].join(''));

templates.groupModalAddTpl = _.template([
    '<div class="modal fade" id="groupAdd" tabindex="-1" role="dialog">',
        '<div class="modal-dialog">',
            '<div class="modal-content">',
                '<div class="modal-header">',
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                    '<h4 class="modal-title">Add New Group</h4>',
                '</div>',
                '<div class="modal-body">',
                    '<div class="input-group">',
                        '<label>Group name</label>',
                        '<input type="text" class="form-control" name="GroupName" placeholder="Group name" aria-describedby="basic-addon1">',
                    '</div>',
                    '<div class="input-group">',
                        '<label>Location name</label>',
                        '<select class="form-control" name="LocationName">',
                            '<option>Chernivtsi</option>',
                            '<option>Kyiv</option>',
                            '<option>Dnipro</option>',
                            '<option>Sofia</option>',
                            '<option>Rivne</option>',
                            '<option>Ivano-Frankivsk</option>',
                            '<option>Lviv</option>',
                        '</select>',
                    '</div>',
                    '<div class="input-group">',
                        '<label>Direction</label>',
                        '<select class="form-control" name="Direction">',
                            '<option>.Net</option>',
                            '<option>WebUI</option>',
                            '<option>Java</option>',
                            '<option>QC</option>',
                            '<option>C#</option>',
                        '</select>',
                    '</div>',
                    '<div class="input-group">',
                        '<label>Start Date</label>',
                        '<input type="text" class="form-control" placeholder="Start Date" id="startDate">',
                    '</div>',
                    '<div class="input-group">',
                        '<label>Finish Date</label>',
                        '<input type="text" class="form-control" placeholder="Finish Date" id="finishDate">',
                    '</div>',
                    '<div class="input-group">',
                        '<label>Status</label>',
                        '<select class="form-control" name="StatusName">',
                            '<option>Planned</option>',
                            '<option>In progress</option>',
                            '<option>Finished</option>',
                        '</select>',
                    '</div>',
                    '<div class="row">',
                        '<div class="col-md-6 teachers-block">',
                            '<div class="input-group">',
                                '<label>Teachers</label>',
                                '<input type="text" class="form-control" placeholder="Teacher" name="teacher">',
                            '</div>',
                            '<a class="add-teacher">+ Add Teacher</a>',
                        '</div>',
                        '<div class="col-md-6 experts-block">',
                            '<div class="input-group">',
                                '<label>Experts</label>',
                                '<input type="text" class="form-control" placeholder="Experts" name="experts">',
                            '</div>',
                            '<a class="add-expert">+ Add Teacher</a>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="modal-footer clearfix">',
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
                    '<button type="button" class="btn btn-primary add-new-group">Add</button>',
                '</div>',
            '</div>',
        '</div>',
    '</div>'
].join(''));

templates.groupModalEditTpl = [
    '<div class="modal fade" id="groupEdit" tabindex="-1" role="dialog">',
        '<div class="modal-dialog">',
            '<div class="modal-content">',
                '<div class="modal-header">',
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                    '<h4 class="modal-title">Edit Group</h4>',
                '</div>',
                '<div class="modal-body">',
                    '<div class="input-group">',
                        '<label>Group name</label>',
                        '<input type="text" class="form-control" name="GroupName" placeholder="Group name" aria-describedby="basic-addon1" value="<%= name %>">',
                    '</div>',
                    '<div class="input-group">',
                        '<label>Location name</label>',
                        '<select class="form-control" name="LocationName">',
                            '<option <% if (location ==="Kyiv") { %> selected <% } %> >Kyiv</option>',
                            '<option <% if (location ==="Lviv") { %> selected <% } %> >Lviv</option>',
                            '<option <% if (location ==="Ivano-Frankivsk") { %> selected <% } %> >Ivano-Frankivsk</option>',
                            '<option <% if (location ==="Sofia") { %> selected <% } %> >Sofia</option>',
                            '<option <% if (location ==="Chernivtsi") { %> selected <% } %> >Chernivtsi</option>',
                            '<option <% if (location ==="Dnipro") { %> selected <% } %> >Dnipro</option>',
                            '<option <% if (location ==="Rivne") { %> selected <% } %> >Rivne</option>',
                            '<option <% if (location ==="Rovno") { %> selected <% } %> >Rovno</option>',
                        '</select>',
                    '</div>',
                    '<div class="input-group">',
                        '<label>Direction</label>',
                        '<select class="form-control" name="Direction">',
                            '<option <% if (direction ===".Net") { %> selected <% } %> >.Net</option>',
                            '<option <% if (direction ==="WebUI") { %> selected <% } %> >WebUI</option>',
                            '<option <% if (direction ==="Java") { %> selected <% } %> >Java</option>',
                            '<option <% if (direction ==="QC") { %> selected <% } %> >QC</option>',
                            '<option <% if (direction ==="C#") { %> selected <% } %> >C#</option>',
                        '</select>',
                    '</div>',
                    '<div class="input-group">',
                        '<label>Start Date</label>',
                        '<input type="text" class="form-control" placeholder="Start Date" id="startDate" value="<%= startDate %>">',
                    '</div>',
                    '<div class="input-group">',
                        '<label>Finish Date</label>',
                        '<input type="text" class="form-control" placeholder="Finish Date" id="finishDate" value="<%= finishDate %>">',
                    '</div>',
                    '<div class="input-group">',
                        '<label>Status</label>',
                        '<select class="form-control" name="StatusName">',
                            '<option <% if (status ==="Planned") { %> selected <% } %> >Planned</option>',
                            '<option <% if (status ==="In Progress") { %> selected <% } %> >In Progress</option>',
                            '<option <% if (status ==="Finished") { %> selected <% } %> >Finished</option>',
                        '</select>',
                    '</div>',
                    '<div class="row">',
                        '<div class="col-md-6 teachers-block">',
                            '<div class="input-group">',
                                '<label>Teachers</label>',
                                '<input type="text" class="form-control" placeholder="Teacher" name="teacher">',
                            '</div>',
                            '<a class="add-teacher">+ Add Teacher</a>',
                        '</div>',
                        '<div class="col-md-6 experts-block">',
                            '<div class="input-group">',
                                '<label>Experts</label>',
                                '<input type="text" class="form-control" placeholder="Experts" name="experts">',
                            '</div>',
                            '<a class="add-expert">+ Add Teacher</a>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="modal-footer clearfix">',
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
                    '<button type="button" class="btn btn-primary edit-group">Submit</button>',
                '</div>',
            '</div>',
        '</div>',
    '</div>'
].join('');