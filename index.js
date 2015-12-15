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

    Graph.prototype.addVertex = function (label) {
        this.vertices.push(label);
        this.adjacentList.set(label, []);
    };

    Graph.prototype.addEdge = function (v1, v2) {
        if (this.adjacentList.has(v1) && this.adjacentList.has(v2)) {
            this.adjacentList.get(v1).push(v2);
            this.adjacentList.get(v2).push(v1);
        }
    };

    Graph.prototype.toString = function () {
        var str = '';
        for (var i = 0; i < this.vertices.length; i++) {
            str  += this.vertices[i] + ':';
            var connectedVerts = this.adjacentList.get(this.vertices[i]);
            for (var j = 0; j < connectedVerts.length; j++) {
                str += ' ' + connectedVerts[j];
            }
            str += '\n';
        }
        return str;
    };

    module.exports = Graph;

    if (module.parent === null) {
        main();
    }

    function main() {
        var graph = new Graph(['A', 'B', 'C', 'D']);
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        console.log(graph.toString());
    }
}());
