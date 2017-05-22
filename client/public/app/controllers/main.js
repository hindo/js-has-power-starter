;(function(app, jshp) {

    var utils = app.utils;
    var components = app.components;

    function mainController(mountingPoint) {

        // the example

        console.log('main controller');
        var p = jshp.create('p');
        p.textContent = 'Main controller';

        // return p;

        // the code

        var tableConfig = [
            {
                title: '#',
                type: 'number',
                sortable: true,
                target: 'id',
                className: 'bold',
            }, {
                title: 'Departure city',
                type: 'object',
                target: 'departure.city',
                className: 'departure',
                attrs: {id: 'departure.id'},
            }, {
                title: 'Departure time',
                type: 'object',
                target: 'departure.time',
            }, {
                title: 'Arrival city',
                type: 'object',
                target: 'arrival.city',
                className: 'arrival',
                attrs: {id: 'arrival.id'},
            }, {
                title: 'Arrival time',
                type: 'object',
                target: 'arrival.time',
            }, {
                title: 'Airline',
                type: 'object',
                target: 'airline.name'
            }
        ];

        jshp.ajaxGet({
            url: '//localhost:3000/flights'
        }, function (data) {
            // to.updateTable(JSON.parse(data), tableBody);
            // var elems = jshp.get('td.arrival, td.departure');
            // for (var i = 0; i < elems.length; i++) {
            //     var elem = elems[i];
            //     jshp.on(elem, 'click', function () {
            //         window.location = '//localhost:3000/airports/' + jshp.getAttr(this, 'id');
            //     });
            // }
        }, utils.errorHandler);

        return components.table.table.render();

    }

    app.controllers.main =  mainController;

})(window.app || {}, window.jshp);
