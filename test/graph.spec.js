var expect = require('chai').expect;
var Graph = require('../');

describe('Graph data structure', function () {
    it('instantiates a graph instance with no parameters', function () {
        var graph = new Graph();
        expect(graph).to.exist;
    });

    it('instantiates a graph instance provided an arrary of vertices', function () {
        var graph = new Graph(['A', 'B', 'C', 'D']);
        expect(graph.vertices).to.be.Array;
        expect(graph.vertices).to.have.length(4);
    });

    it('when instantiated creates a vertices Array', function () {
        var graph = new Graph();
        expect(graph.vertices).to.exist;
        expect(graph.vertices).to.be.Array;
    });

    it('when instantiated creates an adjacency list', function () {
        var graph = new Graph();
        expect(graph.adjacentList).to.exist;
    });

    it('adds a vertex to the graph', function () {
        var graph = new Graph();
        graph.addVertex('A');
        graph.addVertex('B');
        expect(graph.vertices).to.have.length(2);
    });

    it('adds an edge between vertices', function () {
        var graph = new Graph();
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        expect(graph.adjacentList.get('A').indexOf('B') > -1).to.be.true;
        expect(graph.adjacentList.get('A').indexOf('C') > -1).to.be.true;
        expect(graph.adjacentList.get('B').indexOf('A') > -1).to.be.true;
    });

});
