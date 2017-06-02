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
        this._vertices[verticeOrigem].arestas[verticeDestino] = {};
        if(this.peso){
          this._vertices[verticeOrigem].arestas[verticeDestino].peso = peso;
        }
      }else{
        this._vertices[verticeOrigem].arestas[verticeDestino] =
        this._vertices[verticeDestino].arestas[verticeOrigem] = {};
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
        vertices.push(vertice);
      }
    }

    while(vertices.length !== 0){
      vertices.sort((a,b) => {distancias[a] - distancias[b]});

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

  dfs (inicio, fim) {
      var pilha = [];
      var visitados = {};
      var vertice;
      var inicio = inicio
      pilha.push(inicio);
      visitados[inicio] = true;
      while (pilha.length) {
        vertice = pilha.pop();
        if (vertice === fim) {
          delete visitados[inicio];
          return visitados;
        }
        for (var v in this._vertices) {
          if (this._vertices[vertice].arestas[v]) {
            pilha.push(v);
            visitados[v] = true;
          }
        }
      }
      return false;
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