'use strict';

const Grafo = require('./grafo').Grafo;

const grafos = new Grafo(false,false);
    
    grafos.addVertice(1);
    grafos.addVertice(2);
    grafos.addVertice(3);
    grafos.addVertice(4);
    grafos.addVertice(5);
    grafos.addVertice(6);

    grafos.imprimir();
    
    // grafos.addAresta(1,3);
    // grafos.addAresta(1,2);
    // grafos.addAresta(1,4);
    // grafos.addAresta(1,5);
    // grafos.addAresta(2,4);
    // grafos.addAresta(2,5);
    // grafos.addAresta(3,5);

    grafos.addAresta(1,2);
    grafos.addAresta(1,3);
    grafos.addAresta(1,4);
    grafos.addAresta(2,4);
    grafos.addAresta(3,5);
    grafos.addAresta(3,6);
    grafos.addAresta(5,6);
    


    grafos.imprimir();
    
    // process.stdout.write('\n\n############################DJIKSTRA############################\n');
    // var total = grafos.calcularCaminho(grafos.djikstra('1','5'), '1');
    // process.stdout.write("Total: " + total);

    // process.stdout.write('\n\n############################BFS############################\n');
    // total = grafos.calcularCaminho(grafos.bfs('1','4'), '1');
    // process.stdout.write("Total: " + total);

    process.stdout.write('\n\n############################DFS############################\n');
    grafos.dfs('1');

    //grafos.djikstraSemFinal('5');