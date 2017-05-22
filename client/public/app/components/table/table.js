;(function(tC, jshp) {

    function tableComponent() {
        function render() {
            var tableContainer = jshp.create('div');
            jshp.addClass(tableContainer, 'table-container');
            var table = jshp.create('table');
            jshp.addClass(table, 'table');

            var thead = tC.head.render();

            var tbody = jshp.create('tbody');
            var row = jshp.create('tr');
            var cell = jshp.create('td');
            jshp.text(cell, 'Test');

            jshp.append(cell, row);
            jshp.append(row, tbody);

            jshp.append(thead, table);
            jshp.append(tbody, table);

            jshp.append(table, tableContainer);
            return tableContainer;
        }

        return {
            render: render
        };
    }

    tC.table = tableComponent();

    function tableFooterComponent() {}
    function tableRowComponent() {}


})(window.app.components.table, jshp)

function tableObject(element, config) {
    var data = [];
    var cfg = null;
    var tfoot = jshp.get('tfoot td')[0];

    var po = paginationObject();

    po.onPageChange(function() {
        var t = jshp.get('.table-body')[0];
        jshp.empty(t);
        var sliceStart = po.current() * po.itemsPerPage();
        var sliceEnd = sliceStart + po.itemsPerPage();
        data.slice(sliceStart, sliceEnd).map(function (item) {
            insertRow(item, t);
        });
    });

    function init() {
        cfg = config;
        jshp.empty(element);
        var tr = jshp.create('tr');
        cfg.map(function(column) {
            var th = jshp.create('th');
            jshp.text(th, column.title);
            jshp.append(th, tr);
        });
        jshp.addClass(tr, 'table-head');
        jshp.append(tr, element);
    }

    init();

    function insertRow(item, element) {
        var tr = jshp.create('tr');
        for (var i=0; i<cfg.length; i++) {
            var td = jshp.create('td');
            jshp.text(td, getProp(item, cfg[i].target))
            if (cfg[i].className) {
              jshp.addClass(td, cfg[i].className)
            }
            for (var attr in cfg[i].attrs) {
                var attrValue = getProp(item, cfg[i].attrs[attr]);
                jshp.setAttr(td, attr, attrValue);
            }
            jshp.append(td, tr);
        }
        jshp.append(tr, element);
    }

    function getProp(obj, path) {
        return path.split('.').reduce(function(prev, curr) {
            return prev ? prev[curr] : undefined;
        }, obj);
    }

    function updateTable(newData, element) {
        data = newData;
        //reset
        jshp.empty(element);
        po.select(0);
        // set
        po.total(data.length);
        // update
        po.render(tfoot);
    }

    function filterData(data, query, fields = []) {
        return data.filter(function (item) {
            return item['firstName'].toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
    }

    function sortData(data, field) {
        return data.sort(function (a, b) {
            if (a[field] > b[field]) {
                return 1;
            }
            if (a[field] < b[field]) {
                return -1;
            }
            return 0;
        });
    }

    return {
        updateTable: updateTable
    }
}
