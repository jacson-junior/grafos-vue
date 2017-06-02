'use strict';

const assert = require('assert');
const Grafo = require('../src/models/grafo').Grafo;

describe('Grafo', () => {
  it('deve usar Grafo', () => {
    const grafos = new Grafo();
    
    grafos.addVertice('John Doe');
    grafos.addVertice('Jack Daniels');
    grafos.addVertice('Jim Morgan');

    grafos.imprimir();
    
    assert.equal(grafos.contemVertice('Jack Daniels'), true);
    
    grafos.addAresta('John Doe', 'Jack Daniels');
    grafos.addAresta('John Doe', 'Jim Morgan');

    assert.equal(grafos.contemVertice('Jack Daniels', 'John Doe'), true);

    grafos.imprimir();
    
    grafos.removerAresta('John Doe', 'Jack Daniels');
    assert.equal(grafos.contemVertice('Jack Daniels', 'John Doe'), false);

    grafos.imprimir();
    
    grafos.removerVertice('Jack Daniels');
    assert.equal(grafos.contemVertice('Jack Daniels'), false);
  });
});