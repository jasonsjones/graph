(function() {
    'use strict';

    var Dictionary = require('simple-data-cache');

    function Graph(theVerts) {
        this.adjacentList = new Dictionary();
        if (theVerts && theVerts.constructor === Array) {
            this.vertices = theVerts;

            for (var i = 0; i < this.vertices.length; i++) {
                this.adjacentList.set(this.vertices[i], []);
            }

        } else {
            this.vertices = [];
        }

    }

    Graph.prototype.toString = function () {
        var str = '';
        for (var i = 0; i < this.vertices.length; i++) {
            str  += this.vertices[i] + ': ';
            var connectedVerts = this.adjacentList.get(this.vertices[i]);
            for (var j = 0; j < connectedVerts.length; j++) {
                str += connectedVerts[j] + ' ';
            }
            if (i !== this.vertices.length - 1) {
                str += ', ';
            }
        }
        str += '\n';
        return str;
    };

    module.exports = Graph;

    if (module.parent === null) {
        main();
    }

    function main() {
        var graph = new Graph(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
        console.log(graph.toString());
    }
}());
