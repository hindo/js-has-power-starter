;(function(tC, jshp) {

    function tableHeadComponent() {
        function render() {
            var head = jshp.create('thead');
            var row = jshp.create('tr');
            var cell = jshp.create('th');
            jshp.text(cell, 'Test');
            jshp.append(cell, row);
            jshp.append(row, head);
            return head;
        }

        return {
            render: render
        };
    }

    tC.head = tableHeadComponent();

})(window.app.components.table, jshp)
