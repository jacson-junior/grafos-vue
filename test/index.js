'use strict';

const Grafo = require('../src/models/grafo').Grafo;

const grafos = new Grafo(true, true);
    
    grafos.addVertice(1);
    grafos.addVertice(2);
    grafos.addVertice(3);
    grafos.addVertice(4);
    grafos.addVertice(5);
    grafos.addVertice(6);

    grafos.imprimir();
    
    grafos.addAresta(1,2,40);
    grafos.addAresta(1,3,30);
    grafos.addAresta(2,3,20);
    grafos.addAresta(3,6,30);
    grafos.addAresta(2,5,50);
    grafos.addAresta(3,4,30);
    grafos.addAresta(4,6,20);
    grafos.addAresta(1,4,30);
    grafos.addAresta(6,1,10);

    grafos.imprimir();
    
    process.stdout.write('\n\n############################DJIKSTRA############################\n');
    var total = grafos.calcularCaminho(grafos.djikstra('1','6'), '1');
    process.stdout.write("Total: " + total);

    process.stdout.write('\n\n############################BFS############################\n');
    total = grafos.calcularCaminho(grafos.bfs('1','6'), '1');
    process.stdout.write("Total: " + total);

    process.stdout.write('\n\n############################DFS############################\n');
    total = grafos.calcularCaminho(grafos.dfs('1','6'), '1');
    process.stdout.write("Total: " + total + "\n");

    grafos.djikstraSemFinal('1');