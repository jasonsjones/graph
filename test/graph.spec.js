var expect = require('chai').expect;
var Graph = require('../');

function getSimpleGraph() {
    var g = new Graph();

    g.addVertex('A');
    g.addVertex('B');
    g.addVertex('C');
    g.addVertex('D');

    g.addEdge('A', 'B');
    g.addEdge('A', 'C');
    g.addEdge('C', 'D');

    return g;
}

function getComplexGraph() {
    var g = new Graph();

    g.addVertex('A');
    g.addVertex('B');
    g.addVertex('C');
    g.addVertex('D');
    g.addVertex('E');
    g.addVertex('F');
    g.addVertex('G');
    g.addVertex('H');

    g.addEdge('A', 'B');
    g.addEdge('A', 'E');
    g.addEdge('B', 'C');
    g.addEdge('B', 'F');
    g.addEdge('C', 'D');
    g.addEdge('C', 'H');
    g.addEdge('D', 'H');
    g.addEdge('E', 'F');
    g.addEdge('F', 'G');

    return g;
}

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

    it('has toString method to provide a string representation of the graph', function () {
        var graph = getSimpleGraph();
        expect(graph.toString()).to.be.a('string');
    });

    it('adds a vertex to the graph', function () {
        var graph = getSimpleGraph();
        expect(graph.vertices).to.have.length(4);
    });

    it('adds an edge between vertices', function () {
        var graph = getSimpleGraph();

        expect(graph.adjacentList.get('A')).to.be.an.Array;
        expect(graph.adjacentList.get('A')[0]).to.include({label: 'B', weight: 1});
        expect(graph.adjacentList.get('A')[1]).to.include({label: 'C', weight: 1});

        expect(graph.adjacentList.get('B')).to.be.an.Array;
        expect(graph.adjacentList.get('B')[0]).to.include({label: 'A', weight: 1});

        expect(graph.adjacentList.get('D')).to.be.an.Array;
        expect(graph.adjacentList.get('D')[0]).to.include({label: 'C', weight: 1});
    });

    it('throws an error if adding edge to a vertex that does not exist', function () {
        var graph = getSimpleGraph();
        expect(function () {
            graph.addEdge('Z', 'A');
        }).to.throw('Vertex does not exist: Cannot add edge.');
    });

    it('does a breadth first search', function () {
        var graph = getComplexGraph();
        expect(graph.BFS('A')).to.be.eql(['A', 'B', 'E', 'C', 'F', 'D', 'H', 'G']);
    });

    it('does a depth first search', function() {
        var graph = getComplexGraph();
        expect(graph.DFS('A')).to.be.eql(['A', 'E', 'F', 'G', 'B', 'C', 'H', 'D']);
    });

});
