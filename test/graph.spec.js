var expect = require('chai').expect;
var Graph = require('../');

describe('Graph data structure', function () {
    it('instantiates a graph instance', function () {
        var graph = new Graph();
        expect(graph).to.exist;
    });
});
