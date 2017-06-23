'use strict';

class Grafo {
  constructor(peso, direcional) {
    this._vertices = {};
    this.direcional = direcional;
    this.peso = peso;
    // if(peso !== undefined){
    //   this._vertices.peso = {};
    // }
  }

  addVertice(valor) {
    if(this.peso){
      this._vertices[valor] = {
        arestas: {peso: 0}
      };
    }else{
      this._vertices[valor] = {
        arestas: {},
      };
    }
  }
  
  removerVertice(valor) {
    for (let verticeConectado in this._vertices[valor].arestas) {
      this.removerAresta(valor, verticeConectado);
    }
    delete this._vertices[valor];
  }

  contemVertice(valor) {
    return !!this._vertices[valor];
  }
  
  addAresta(verticeOrigem, verticeDestino, peso) {
    if (this.contemVertice(verticeOrigem) && this.contemVertice(verticeDestino)) {
      if(this.direcional){
        this._vertices[verticeOrigem].arestas[verticeDestino] = true;
        if(this.peso){
          this._vertices[verticeOrigem].arestas[verticeDestino].peso = peso;
        }
      }else{
        this._vertices[verticeOrigem].arestas[verticeDestino] =
        this._vertices[verticeDestino].arestas[verticeOrigem] = true;
        if(this.peso){
          this._vertices[verticeOrigem].arestas[verticeDestino].peso =
          this._vertices[verticeDestino].arestas[verticeOrigem].peso = peso;
        }
        
      }
    }
  }

  removerAresta(verticeOrigem, verticeDestino) {
    if (this.contemVertice(verticeOrigem) && this.contemVertice(verticeDestino)) {
      if(this.direcional){
        delete this._vertices[verticeOrigem].arestas[verticeDestino];
      }else{
        delete this._vertices[verticeOrigem].arestas[verticeDestino];
        delete this._vertices[verticeDestino].arestas[verticeOrigem];
      } 
    }
  }
  
  contemAresta(verticeOrigem, verticeDestino) {
    return !!this._vertices[verticeOrigem].arestas[verticeDestino];
  }

  retornarArestas(valor){
    return this._vertices[valor].arestas;
  }

  imprimir(){
    for(var vertice in this._vertices){
        process.stdout.write("\n" + vertice);
        process.stdout.write(" -> ");
        for(var aresta in this._vertices[vertice].arestas){
          if(aresta !== 'peso'){
            process.stdout.write(aresta);
            if(this.peso){
              process.stdout.write("("+this._vertices[vertice].arestas[aresta].peso+")");
            }
            process.stdout.write(" ; ");
          }
        } 
    }
    process.stdout.write('\n\n------------------------------\n');
  }

  calcularCaminho(caminho, inicio){
    var total = 0;
    process.stdout.write('\nCaminho: ' + inicio + ' -> ');
    var anterior = inicio;
    for(var valor in caminho){
      if(this._vertices[anterior].arestas[valor] === undefined){
        process.stdout.write('\nCaminho para o fim não encontrado\n');
        break;
      }
      process.stdout.write(valor + "(" + this._vertices[anterior].arestas[valor].peso + ") -> ");
      total += this._vertices[anterior].arestas[valor].peso;
      anterior = valor;
    }
    process.stdout.write("\n");
    return total;
  }

  construirCaminho(caminho, inicio, fim){
      var resultado = {};
      resultado[fim] = true;
      while (caminho[fim] !== null) {
        fim = caminho[fim];
        resultado[fim] = true;
      }
      delete resultado[inicio];
      return resultado;
  }

  djikstra(inicio, fim){

    var anterior = {};
    var distancias = {};
    var vertices = [];
    var caminho = {};
    const valorMaximo = 9999;

    for(var vertice in this._vertices){
      if(vertice !== 'peso'){
        if(vertice === inicio){
          distancias[vertice] = 0;
        }else{
          distancias[vertice] = valorMaximo;
        }
        vertices.push(distancias[vertice]);
      }
    }

    while(vertices.length !== 0){
      vertices.sort((a,b) => {return distancias[a] - distancias[b]});

      var menor = vertices.shift();

      if(menor === fim){
          while(menor in anterior){
            caminho[menor]  = true;
            menor = anterior[menor];
          }
          break;
      }

      if (distancias[menor] === valorMaximo){
        break;
      }

      for(var vizinho in this._vertices[menor].arestas){
        if(vizinho !== 'peso'){
          var aux = distancias[menor] + this._vertices[menor].arestas[vizinho].peso;
          if(aux < distancias[vizinho]){
            distancias[vizinho] = aux;
            anterior[vizinho] = menor;
          }
        }
      }
    }

    return caminho;
  }

  // djikstra(inicio, fim){

  //   var anterior = {};
  //   var distancias = {};
  //   var vertices = [];
  //   var caminho = {};
  //   const valorMaximo = 9999;

  //   process.stdout.write('\n-----------------Iniciando Algoritmo de Djikstra-----------------\n');

  //   for(var vertice in this._vertices){
  //     if(vertice !== 'peso'){
  //       if(vertice === inicio){
  //         process.stdout.write('\nVertice Inicial - ' + vertice);
  //         distancias[inicio] = 0;
  //       }else{
  //         distancias[vertice] = valorMaximo;
  //       }
  //       vertices.push(vertice);
  //     }
  //   }

  //   while(vertices.length !== 0){
  //     vertices.sort((a,b) => {distancias[a] - distancias[b]});

  //     var menor = vertices.shift();
  //     process.stdout.write('\nMenor Vertice - ' + menor);

  //     if(menor === fim){
  //         process.stdout.write('\nMenor é igual ao Fim - ' + menor);
  //         while(menor in anterior){
  //           process.stdout.write('\nMenor pertence ao Anterior e é add ao Caminho - ' + menor);
  //           caminho[menor]  = true;
  //           menor = anterior[menor];
  //         }
  //         break;
  //     }

  //     if (distancias[menor] === valorMaximo){
  //       process.stdout.write('\nMenor Distancia é igual ao Valor Maximo - ' + valorMaximo);
  //       break;
  //     }

  //     for(var vizinho in this._vertices[menor].arestas){
  //       if(vizinho !== 'peso'){
  //         process.stdout.write('\nChecando Vizinho - ' + vizinho);
  //         var aux = distancias[menor] + this._vertices[menor].arestas[vizinho].peso;
  //         process.stdout.write('\nAdiciona a Distancia do Vizinho ao Menor - ' + aux);
  //         if(aux < distancias[vizinho]){
  //           process.stdout.write('\nDistancia até o Vizinho é maior que a distacia do Vizinho até o Menor - ' + distancias[vizinho]);
  //           distancias[vizinho] = aux;
  //           anterior[vizinho] = menor;
  //         }
  //       }
  //     }
  //   }

  //   process.stdout.write('\n-----------------Algoritmo Finalizado-----------------\n');

  //   return caminho;
  // }

  preencherArray(array){
    for(var v in array){
      array[v] = undefined;
    }
    return array;
  }

  bfs (inicio, fim) {
      var pais = {};
      var caminho = [];
      var visitado = {};
      var atual;
      caminho.push(inicio);
      pais[inicio] = null;
      visitado[inicio] = true;
      while (caminho.length) {
        atual = caminho.shift();
        if (atual === fim) {
          return this.construirCaminho(pais, inicio, fim);
        }
        for (var vertice in this._vertices) {
          if (vertice !== atual && this._vertices[atual].arestas[vertice] && !visitado[vertice]) {
            pais[vertice] = atual;
            visitado[vertice] = true;
            caminho.push(vertice);
          }
        }
      }
  }

  dfs (inicio) {
      var visitados = [];
      var pilha = [inicio];
      var atual = inicio;
      visitados[inicio] = true;
      while(pilha.length){
        var todasVisitadas = true;
        var aux = this._vertices[atual].arestas;
        for(var aresta in aux) {
              if(!visitados[aresta]){
                process.stdout.write(atual + " - > " + aresta + "\n");
                pilha.push(aresta);
                visitados[aresta] = true;
                todasVisitadas = false;
                atual = aresta;
                break;
              }
        }
        if(todasVisitadas === true){
            process.stdout.write(pilha.pop());
            atual = pilha[pilha.length-1];
        }
      }
  }

  djikstraSemFinal(inicio)
            {
                
                for (var v in this._vertices)
                {
                    var total = 0;
                    if (v !== inicio)
                    {
                      process.stdout.write('\nDjikstra para o vertice ' + v);
                      
                        total = this.calcularCaminho(this.djikstra(inicio,v), inicio);
                        process.stdout.write('Total : ' + total + '\n');
                    }
                }
            }


} 

module.exports = {
  Grafo
};