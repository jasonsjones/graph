/**
 * @fileOverview Implementation of a graph data structure
 * @author Jason S. Jones
 * @version 0.1.0
 * @license MIT
 */
(function() {
    'use strict';

    // pull in a few other data structurs to help build the graph
    // and to implement the two search algorithms: BFS and DFS.
    var Dictionary = require('simple-data-cache');
    var Queue = require('queue-fifo');
    var Stack = require('stack-lifo');

    /**
     * Creates a new Graph instance using the theVerts to provide the
     * labels for the intitial vertices of the graph.  If no parameter is
     * provided, an empty graph will be instantiated and all vertices will
     * need to be added by calling the 'addVertex' method.
     *
     * @constructor
     * @param {Array} theVerts an array of labels to initialize as the vertices
     *                of the graph
     *
     */
    function Graph(theVerts) {
        var self = this;
        this.adjacentList = new Dictionary();

        if (theVerts && theVerts.constructor === Array) {
            this.vertices = theVerts;

            this.vertices.forEach(function (v) {
                self.adjacentList.set(v, []);
            });

        } else {
            this.vertices = [];
        }

    }

    /**
     *
     */
    Graph.prototype.addVertex = function (label) {
        this.vertices.push(label);
        this.adjacentList.set(label, []);
    };

    /**
     *
     */
    Graph.prototype.addEdge = function (v1, v2, w) {
        if (this.adjacentList.has(v1) && this.adjacentList.has(v2)) {
            var edgeWeight = w || 1;
            this.adjacentList.get(v1).push({label: v2, weight: edgeWeight});
            this.adjacentList.get(v2).push({label: v1, weight: edgeWeight});
        } else {
            throw new Error('Vertex does not exist: Cannot add edge.');
        }
    };

    /**
     * Breadth first search
     *
     */
    Graph.prototype.BFS = function(vertex) {
        var q = new Queue();
        var result = [];
        var visited = [];

        // mark the starting vertex as visited and add it the queue
        visited.push(vertex);
        q.enqueue(vertex);

        while (!q.isEmpty()) {

            // dequeue the front vertex from the queue
            var focusVertex = q.dequeue();

            // add it to the results list
            result.push(focusVertex);

            //get all of its connected vertices
            var neighbors = this.adjacentList.get(focusVertex);

            for (var i = 0; i < neighbors.length; i++) {

                // if neighbor[i] has not been visited, mark it as visited
                // and add it to the queue
                if (visited.indexOf(neighbors[i].label) === -1) {
                    visited.push(neighbors[i].label);
                    q.enqueue(neighbors[i].label);
                }
            }
        }

        return result;
    };

    /**
     * Depth first search
     *
     */
    Graph.prototype.DFS = function(vertex) {
        var stack = new Stack();
        var result = [];
        var visited = [];

        // mark the starting vertex as visited and push it on the stack
        visited.push(vertex);
        stack.push(vertex);

        while (!stack.isEmpty()) {

            // pop a vertex from the top of the stack
            var focusVertex = stack.pop();

            // add it to the results list
            result.push(focusVertex);

            //get all of its connected vertices
            var neighbors = this.adjacentList.get(focusVertex);

            for (var i = 0; i < neighbors.length; i++) {

                // if neighbor[i] has not been visited, mark it as visited
                // and push it on the stack
                if (visited.indexOf(neighbors[i].label) === -1) {
                    visited.push(neighbors[i].label);
                    stack.push(neighbors[i].label);
                }
            }
        }

        return result;
    };

    /**
     * Returns the string representation of the graph.  It will return the
     * list of vertices with their adjacency list, which is a list describing
     * the connected vertices to that particular vertex.
     *
     * @returns {string} the string representation of the graph
     */
    Graph.prototype.toString = function () {
        var str = '';
        for (var i = 0; i < this.vertices.length; i++) {
            str  += this.vertices[i] + ':';
            var connectedVerts = this.adjacentList.get(this.vertices[i]);
            for (var j = 0; j < connectedVerts.length; j++) {
                str += ' ' + connectedVerts[j].label;
            }
            str += '\n';
        }
        return str;
    };

    // expose the graph
    module.exports = Graph;

}());
