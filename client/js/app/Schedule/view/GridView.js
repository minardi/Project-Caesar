'use strict';
(function (This) {
    This.GridView = Backbone.View.extend({
        tpl: templates.gridTpl,
        weekStart: moment().day('Monday'),
        
        events: {
            'click #nextButton': 'nextWeek',
            'click #prevButton': 'prevWeek'
        },

        render: function () {
            this.$el.empty().append(this.tpl({}));
            
            var table = new Array(25),
                cityTable, i, j, k;
                
            for (i = 0; i < table.length; i++) {
                table[i] = new Array(8);
                for (j = 0; j < 8; j++) {
                    table[i][j] = '';
                }
            }
            table[0][1] = 'MON';
            table[0][2] = 'TUE';
            table[0][3] = 'WED';
            table[0][4] = 'THU';
            table[0][5] = 'FRI';
            table[0][6] = 'SAT';
            table[0][7] = 'SUN';
            for (k = 1, i = 8, j = '00'; k < 25; k++) {
                table[k][0] = i + ':' + j;
                if ((k - 1) % 2 === 1) {
                    i++;
                }
                j = (j === '00') ? '30' : '00';
            }
            
            for (i = 0; i < 7; i++) {
                table[0][i + 1] += this.weekStart.format(', MMM D');
                this.weekStart.add(1, 'd');
            }
            this.weekStart.subtract(7, 'd');
            
            collections.events.forEach((function (item) {
                for (i = 0; i < 7; i++) {
                    if (this.weekStart.isSame(moment(item.get('dateTime')), 'day')) {
                        table[1][i + 1] += item.toString();
                    }
                    this.weekStart.add(1, 'd');
                }
                this.weekStart.subtract(7, 'd');
            }).bind(this));
            
            
            cityTable = this.makeTable(this.$el.find('#grid'), table);
            
            return this;
        },
        
        makeTable: function (container, data) {
            var $table = $("<table/>").addClass('table table-bordered');
            $.each(data, function(rowIndex, row) {
                var $row = $("<tr/>");
                $.each(row, function(colIndex, cell) { 
                    $row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").text(cell));
                });
                $table.append($row);
            });
            return container.append($table);
        },
        
        nextWeek: function () {
            cs.mediator.publish('nextWeek');
        },
        
        prevWeek: function () {
            cs.mediator.publish('prevWeek');
        }
    });
})(App.Schedule);