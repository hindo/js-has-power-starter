;(function(window, jshp){

    var app = window.app;
    var appStartPoint = jshp.get('#app-view');

    app.router.registerLocation('main', app.controllers.main);
    app.router.registerLocation('about', app.controllers.about);

    app.router.setDefaultLocation('main');

    app.run = function() {
        app.router.setMountingPoint(appStartPoint);
        app.router.start();
        app.router.runDefaultLocation();
    }();

})(window, jshp);


function paginationObject() {

    var page = 0;
    var pageCount = -1;
    var countPerPage = 10;
    var totalCount = -1;

    var configuration = {
        _containerClass: 'pagi-cont',
        _itemClass: 'pagi-item',
        containerElement: 'ul',
        itemElement: 'li',
        hideInMiddle:  true,
        itemsPerPage: countPerPage,
    };

    var events = {
        'onPageChange': [],
    }

    function total(val) {
        if (!val) {
            totalCount = val;
        }
        pageCount = Math.ceil(val/countPerPage);
        return totalCount;
    }

    function nextPage(by) {
        if ((page+by) > pageCount) {
            page = pageCount;
        } else {
            page += by
        }
    }

    function prevPage(by) {
        if ((page-by) < 0) {
            page = 0;
        } else {
            page -= by;
        }
    }

    function selectPage(pageNumber) {
        if (pageNumber >= 0) {
            page = pageNumber
        }
        fireEvent('onPageChange');
    }

    function getCurrentPage() {
        return page;
    }

    function itemsPerPage() {
        return configuration.itemsPerPage;
    }

    function onPageChange(callback) {
        events['onPageChange'].push(callback);
    }

    function fireEvent(eventName) {
        events[eventName].map(function(callback) {
            if (typeof callback === 'function') {
                callback();
            }
        });
    }

    function render(target) {
        var container = jshp.create(configuration.containerElement);
        jshp.addClass(container, configuration._containerClass);
        Array.apply(null, Array(pageCount)).map(function(_, idx) {
            var item = jshp.create(configuration.itemElement);
            jshp.addClass(item, configuration._itemClass);
            var link = jshp.create('a');
            jshp.attr(link, 'href', '#');
            jshp.text(link, idx+1);
            jshp.on(link, 'click', function(event) {
                event.preventDefault();
                selectPage(idx);
            });
            jshp.append(link, item);
            jshp.append(item, container);
        });
        jshp.append(container, target);
    }

    return {
        total: total,
        current: getCurrentPage,
        itemsPerPage: itemsPerPage,
        next: nextPage,
        prev: prevPage,
        select: selectPage,
        render: render,
        onPageChange: onPageChange,
        update: function() {}
    }
}


jshp.ready(function () {
    var bounce = null;

    var table = jshp.get('.table')[0];
    var tableHeader = jshp.findChildren(table, 'thead')[0];
    var tableBody = jshp.findChildren(table, '.table-body')[0];


    var to = tableObject(tableHeader, tableConfig);



    // event

    // $('.table-query').on('keydown', function() {
    //     if (bounce) {
    //         clearTimeout(bounce);
    //         bounce = null;
    //     }
    //     bounce = setTimeout(function() {
    //         let query = $('.table-query').val();
    //         bounce = null;
    //         updateTable(
    //             sortData(
    //                 filterData(tableData, query)
    //             , 'firstName'), $tableBody
    //         );
    //     }, 500);
    // });
});
