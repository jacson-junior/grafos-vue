<template>
    <div @click="action" class="canvas">
        <vertice v-for="v in vertices" ref="vertices" :key="v.id" :vertice-id="v.id" :pos-x="v.posX" :pos-y="v.posY" @clicked="clickVertice"
            class="vertice"></vertice>
        <svg height="100%" width="100%" version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
                <aresta v-for="a in arestas" :key="a.id" :aresta-id="a.id" :from="a.from" :to="a.to" :movey="a.translateY" :movex="a.translateX" class="aresta"></aresta>
        </svg>
    </div>
</template>

<script>
    import Vertice from './Vertice'
    import Aresta from './Aresta'
    export default {
        name: 'board',
        data() {
            return {
                vertices: [],
                verticesQtd: 0,
                arestas: [],
                arestasQtd: 0,
                cores: []
            }
        },
        methods: {
            action(event) {
                let self = this;
                if (self.btnSelected === 1) {
                    self.addVertice(event);
                }
                if (self.btnSelected === 5) {
                    self.welshPowell();
                }
                if (self.btnSelected === 6) {
                    self.dsatur();
                }
                if (self.btnSelected === 7) {
                    self.prim();
                }
                if(self.btnSelected === 8) {
                    self.fuckerson();
                }
            },
            welshPowell() {
                var self = this;
                var arestas = [];
                arestas = this.$el.querySelectorAll('.aresta');
                var grauVertices = [];
                var i = 0;
                self.vertices.forEach(function (vertice) {
                    //preenche vetor de cores
                    var aux = 'rgba(' + Math.floor((Math.random() * 255) + 0) + ',' + Math.floor((Math.random() * 255) + 0) + ',' + Math.floor((Math.random() * 255) + 0) + ')';
                    self.cores[i] = aux;
                    //preenche um vetor com a qtd de arestas de cada vertice
                    grauVertices[i] = [].filter.call(arestas, a => {
                        return (a.__vue__.from.verticeId === vertice.id || a.__vue__.to.verticeId === vertice.id);
                    });
                    grauVertices[i].id = vertice.id;
                    i++
                }, this);

                grauVertices.forEach(function(vertice) {
                    vertice.forEach(function(aresta) {
                        aresta.__vue__.from.color = 'rgba(219, 219, 219)';
                        aresta.__vue__.to.color = 'rgba(219, 219, 219)';
                    }, this);
                }, this);
                //ordena o vetor
                grauVertices.sort((a, b) => {
                    if (a.length < b.length) { return 1; }
                    if (a.length > b.length) { return -1; }
                    return 0;
                });
                var corVertices = [];
                var cont = 0;
                var coresUsadas = 0;
                var atual = {};
                if (grauVertices[cont][0].__vue__.from.verticeId === grauVertices[cont].id) {
                    atual = grauVertices[cont][0].__vue__.from;
                } else {
                    atual = grauVertices[cont][0].__vue__.to;
                }
                while (atual.color === 'rgba(219, 219, 219)') {
                    if (cont < grauVertices.length) {
                        atual.color = self.cores[coresUsadas];
                        for (var i = cont + 1; i < grauVertices.length; i++) {
                            var arestaComAtual = false;
                            grauVertices[i].forEach(function (aresta) {
                                if (aresta.__vue__.from.verticeId === grauVertices[cont].id || aresta.__vue__.to.verticeId === grauVertices[cont].id) {
                                    arestaComAtual = true;
                                }
                            }, this);
                            if (arestaComAtual === false) {
                                console.log(grauVertices[i]);
                                grauVertices[i].forEach(aresta => {
                                    console.log(aresta.__vue__.from);
                                    if(aresta.__vue__.from.color !== self.cores[coresUsadas]){
                                        if (grauVertices[i][0].__vue__.from.verticeId === grauVertices[i].id) {
                                            grauVertices[i][0].__vue__.from.color = self.cores[coresUsadas];
                                        } else {
                                            grauVertices[i][0].__vue__.to.color = self.cores[coresUsadas];
                                        }
                                    }
                                });   
                            }
                        }
                    }
                    cont++;
                    coresUsadas++;
                    if(grauVertices[cont]){
                        if (grauVertices[cont][0].__vue__.from.verticeId === grauVertices[cont].id) {
                            atual = grauVertices[cont][0].__vue__.from;
                        } else {
                            atual = grauVertices[cont][0].__vue__.to;
                        }
                    }
                }
            },
            dsatur(){
                let self = this;
                var _arestas, arestas = [];
                var vertices, _vertices = [];
                var listaSaturacao = [];
                _arestas = this.$el.querySelectorAll('.aresta');
                _vertices = this.$el.querySelectorAll('.vertice');
                var i = 0;
                self.vertices.forEach(function (vertice) {
                    //preenche vetor de cores
                    self.cores[i] = 'rgba(' + Math.floor((Math.random() * 255) + 0) + ',' + Math.floor((Math.random() * 255) + 0) + ',' + Math.floor((Math.random() * 255) + 0) + ')';
                    var qtd = [];
                    qtd = [].filter.call(_arestas, a => {
                        return (a.__vue__.from.verticeId === vertice.id || a.__vue__.to.verticeId === vertice.id);
                    }).length;
                    listaSaturacao[i] = {id: vertice.id ,saturacao: 0, grau: qtd, cor: 'rgba(219,219,219)'};
                    vertices = [].filter.call(_vertices, v => {
                        return v;
                    });                    
                    i++
                }, this);

                i = 0;
                [].forEach.call(_arestas, aresta => {
                    arestas[i] = {from: aresta.__vue__.from, to: aresta.__vue__.to};
                    i++;
                });

                var listaOriginal = [];
                listaOriginal = listaSaturacao;
                
                listaSaturacao.sort((a,b) => {
                    if (a.saturacao < b.saturacao) { return 1; }
                    if (a.saturacao > b.saturacao) { return -1; }
                });
                listaSaturacao.sort((a,b) => {
                    if (a.grau < b.grau) { return 1; }
                    if (a.grau > b.grau) { return -1; }
                }).filter(a => {
                    return a.cor === 'rgba(219,219,219)';
                });
                i = 0;
                listaSaturacao.forEach(vertice => {
                    var pintar = true;
                    var cor = '';
                    i=0;
                    console.log(vertice);
                    if(vertice.cor === 'rgba(219,219,219)'){
                        var arestasVAtual = [];
                        arestasVAtual = [].filter.call(arestas, a => {
                            return a.from.verticeId === vertice.id || a.to.verticeId === vertice.id;
                        });
                        cor = self.cores[i];
                        console.log('vertice atual - ' + vertice.id);
                        pintar = false;
                        while(!pintar){
                            arestasVAtual.every(aresta => {
                                var vizinho = aresta.from.verticeId === vertice.id ? [].find.call(listaOriginal, v => { return v.id === aresta.to.verticeId}) : [].find.call(listaOriginal, v => { return v.id === aresta.from.verticeId});
                                console.log('ID Vizinho - ' + vizinho.id);
                                console.log('de -> para');
                                console.log(aresta.from.verticeId === vertice.verticeId ? aresta.from.color + " -> " + vizinho.cor : aresta.to.color + " -> " + vizinho.cor);
                                console.log('cor vizinho => cor atual');
                                console.log(vizinho.cor + ' => ' + cor);
                                if(vizinho.cor === cor){
                                    cor = self.cores[i++];
                                    pintar = false;
                                    return false;
                                }else{
                                    pintar = true;
                                    return true;
                                }
                            });
                        }

                        if(pintar){
                            vertice.cor = cor;
                            console.log('Cor ',vertice.cor, ' adicionada ao vertice ', vertice.id);
                            arestasVAtual.forEach(aresta => {
                                var vizinho = aresta.from.verticeId === vertice.id ? [].find.call(listaOriginal, v => { return v.id === aresta.to.verticeId}) : [].find.call(listaOriginal, v => { return v.id === aresta.from.verticeId});
                                console.log('Vizinho para saturacao ', vizinho);
                                listaSaturacao.forEach(s => {
                                    if(s.id === vizinho.verticeId){
                                        s.saturacao++;
                                        console.log(s.id, " Saturou ", s.saturacao);
                                    }
                                });
                            });
                        }
                        i = 0;
                        listaSaturacao.sort((a,b) => {
                            if (a.saturacao < b.saturacao) { return 1; }
                            if (a.saturacao > b.saturacao) { return -1; }
                        });
                        listaSaturacao.sort((a,b) => {
                            if (a.grau < b.grau) { return 1; }
                            if (a.grau > b.grau) { return -1; }
                        })
                        listaOriginal.sort((a,b) => {
                            if (a.saturacao < b.saturacao) { return 1; }
                            if (a.saturacao > b.saturacao) { return -1; }
                        });
                        listaOriginal.sort((a,b) => {
                            if (a.grau < b.grau) { return 1; }
                            if (a.grau > b.grau) { return -1; }
                        })
                        console.log('lista original - ', listaOriginal);
                        listaSaturacao = [].filter.call(listaOriginal, a => {
                            return a.cor === 'rgba(219,219,219)';
                        });
                    }
                });
                listaOriginal.forEach(satur => {
                    vertices.forEach(vertice => {
                            if(vertice.__vue__.verticeId === satur.id) {
                                vertice.__vue__.color = satur.cor;
                            }   
                    });
                });
            },
            prim(){
                let self = this;
                var _arestas, arestas = []; 
                var _vertices = [];
                var vertices = [];
                var listaSaturacao = [];
                _arestas = this.$el.querySelectorAll('.aresta');
                _vertices = this.$el.querySelectorAll('.vertice');
                var i = 0;
                self.vertices.forEach(function (vertice) {
                    //preenche vetor de cores
                    var qtd = [];
                    qtd = [].filter.call(_arestas, a => {
                        return (a.__vue__.from.verticeId === vertice.id || a.__vue__.to.verticeId === vertice.id);
                    }).length;

                    vertices[i] = {id: vertice.id, cor: 'rgba(219,219,219)'};

                    i++;
                }, this);

                i = 0;
                [].forEach.call(_arestas, aresta => {
                    arestas[i] = {from: aresta.__vue__.from, to: aresta.__vue__.to, peso: aresta.__vue__.peso, cor: aresta.__vue__.color};
                    i++;
                });

                var resultadoArestas = [];
                var resultadoVertices = [];
                var q = vertices;
                var a = q.shift();
                resultadoVertices.push(a);
                while(q.length > 0){
                    var menorAresta = [];
                    var i = 0;
                    resultadoVertices.forEach(verticePintado => {
                        q.forEach(verticeNaoPintado => {
                            var seila = verticeNaoPintado;
                            var seila2 = verticePintado;
                            var rArestas = [];
                            rArestas = [].filter.call(arestas, a => {
                                if((a.from.verticeId === verticePintado.id && a.to.verticeId === verticeNaoPintado.id) || (a.to.verticeId === verticePintado.id && a.from.verticeId === verticeNaoPintado.id)){
                                    return a;
                                }
                            });
                            if(rArestas.length > 0){
                                var menor = 999999999;
                                rArestas.sort((a,b) => {
                                    if (parseInt(a.peso) < parseInt(b.peso)) { return -1; }
                                    if (parseInt(a.peso) > parseInt(b.peso)) { return 1; }
                                });
                                var pintado, npintado;
                                if(verticePintado.id === rArestas[0].from.verticeId){
                                    pintado = rArestas[0].from;
                                    npintado = rArestas[0].to;
                                }else{
                                    pintado = rArestas[0].to;
                                    npintado = rArestas[0].from;
                                }
                                menorAresta[i] = { pintado: pintado, npintado: npintado, aresta: rArestas[0]};
                            }
                            i++;
                        });
                    });
                    if(menorAresta.length > 0){
                        menorAresta.sort((a,b) => {
                                if (parseInt(a.aresta.peso) < parseInt(b.aresta.peso)) { return -1; }
                                if (parseInt(a.aresta.peso) > parseInt(b.aresta.peso)) { return 1; }
                        });
                        resultadoArestas.push(menorAresta[0].aresta);
                        resultadoVertices.push(q.splice(q.findIndex((valor, index, array) => {
                            if(menorAresta[0].npintado.verticeId === valor.id){
                                return true;
                            }
                            return false;
                        }),1)[0]);
                    }
                }
                resultadoVertices.forEach(rVertice => {
                    [].forEach.call(_vertices, vertice => {
                        if(vertice.__vue__.verticeId === rVertice.id) {
                                vertice.__vue__.color = 'rgba(123,54,65,80)';
                        } 
                    });
                })

                resultadoArestas.forEach(rAresta => {
                    [].forEach.call(_arestas, aresta => {                        
                        if(aresta.__vue__.from.verticeId === rAresta.from.verticeId && aresta.__vue__.to.verticeId === rAresta.to.verticeId) {
                            aresta.__vue__.color = 'rgba(123,54,65,80)';
                        } 
                    });
                })
            },
            fuckerson(){
                // Represents an edge from source to sink with capacity
                var Edge = function(source, sink, capacity) {
                    this.source = source;
                    this.sink = sink;
                    this.capacity = capacity;
                    this.reverseEdge = null;
                    this.flow = 0;
                };

                // Main class to manage the network
                var FlowNetwork = function() {
                    this.edges = {};

                    // Is this edge/residual capacity combination in the path already?
                    this.findEdgeInPath = function(path, edge, residual) {
                        for(var p=0;p<path.length;p++)
                            if(path[p][0] == edge && path[p][1] == residual)
                                return true;
                        return false;
                    };

                    this.addEdge = function(source, sink, capacity) {
                        if(source == sink) return;

                        // Create the two edges = one being the reverse of the other
                        var edge = new Edge(source, sink, capacity);
                        var reverseEdge = new Edge(sink, source, 0);

                        // Make sure we setup the pointer to the reverse edge
                        edge.reverseEdge= reverseEdge;
                        reverseEdge.reverseEdge = edge;

                        if(this.edges[source] === undefined) this.edges[source] = [];
                        if(this.edges[sink] === undefined) this.edges[sink] = [];

                        this.edges[source].push(edge);
                        this.edges[sink].push(reverseEdge);
                    };

                    // Finds a path from source to sink
                    this.findPath = function(source, sink, path) {
                        if(source == sink) return path;

                        for(var i=0;i<this.edges[source].length;i++) {
                            var edge = this.edges[source][i];
                            var residual = edge.capacity - edge.flow;

                            // If we have capacity and we haven't already visited this edge, visit it
                            if(residual > 0 && !this.findEdgeInPath(path, edge, residual)) {
                                var tpath = path.slice(0);
                                tpath.push([edge, residual]);
                                var result = this.findPath(edge.sink, sink, tpath);
                                if(result != null) return result;
                            }
                        }
                        return null;
                    };

                    // Find the max flow in this network
                    this.maxFlow = function(source, sink) {
                        var path = this.findPath(source, sink, []);

                        while(path != null) {
                            var flow = 999999;
                            // Find the minimum flow
                            for(var i=0;i<path.length;i++)
                                if(path[i][1] < flow) flow = path[i][1];
                            // Apply the flow to the edge and the reverse edge
                            for(var i=0;i<path.length;i++) {
                                path[i][0].flow += flow;
                                path[i][0].reverseEdge.flow -= flow;
                            }
                            path = this.findPath(source, sink, []);
                        }
                        var sum = 0;
                        console.log(this.edges)
                        for(var i=0;i<this.edges[source].length;i++){
                            sum += this.edges[source][i].flow;

                        }

                        return {
                            sum,
                            edges: this.edges
                        }
                    };
                };

                let self = this;
                var _arestas, arestas = []; 
                var _vertices = [];
                var vertices = [];
                var listaSaturacao = [];
                _arestas = this.$el.querySelectorAll('.aresta');
                _vertices = this.$el.querySelectorAll('.vertice');
                var i = 0;
                self.vertices.forEach(function (vertice) {
                    //preenche vetor de cores
                    var qtd = [];
                    qtd = [].filter.call(_arestas, a => {
                        return (a.__vue__.from.verticeId === vertice.id || a.__vue__.to.verticeId === vertice.id);
                    }).length;

                    vertices[i] = {id: vertice.id, cor: 'rgba(219,219,219)'};

                    i++;
                }, this);

                i = 0;
                [].forEach.call(_arestas, aresta => {
                    arestas[i] = {from: aresta.__vue__.from, to: aresta.__vue__.to, peso: aresta.__vue__.peso, cor: aresta.__vue__.color};
                    i++;
                });

                var fn = new FlowNetwork();

                console.log(arestas);

                arestas.forEach(a =>{
                    fn.addEdge(""+a.from.verticeId, ""+a.to.verticeId, a.peso);
                });
                console.log(fn);

                var inicio = prompt("Insira o id do inicio", "0");
                var fim  = prompt("Insira o id do fim", "0");

                console.log("inicio/fim", inicio, fim);
                var max = fn.maxFlow(inicio,fim);
                console.log(max.edges[0]);

                alert("Fluxo maximo = " + max.sum);

                Object.keys(max.edges).forEach(v => {
                    max.edges[v].forEach(a => {
                        [].forEach.call(_arestas, ar => {
                            if(ar.__vue__.from.verticeId === parseInt(a.source) && ar.__vue__.to.verticeId === parseInt(a.sink)){
                                ar.__vue__.flow = a.flow + "/";
                            }
                        })
                    });
                });
            },
            addAresta(inicio, fim) {
                let self = this;
                var aux = self.arestas.filter(a => {
                    return (a.from.verticeId === inicio.verticeId && a.to.verticeId === fim.verticeId) || (a.to.verticeId === inicio.verticeId && a.from.verticeId === fim.verticeId)
                })
                if (aux.length === 0) {
                    self.arestas.push({ id: self.arestasQtd, from: inicio, to: fim, translateX: 10, translateY: 10 });
                    self.arestasQtd++;
                }else if(aux.length === 1){
                    self.arestas.push({ id: self.arestasQtd, from: inicio, to: fim, translateX: -10, translateY: -10 });
                    self.arestasQtd++;
                }
            },
            addVertice(event) {
                let self = this;
                self.vertices.push({ id: self.verticesQtd, posX: event.pageX, posY: event.pageY });
                self.verticesQtd++;
            },
            clickVertice(event) {
                let self = this;
                if (self.btnSelected === 4) {
                    if (self.arestasQtd > 0) {
                        self.arestas = self.arestas.filter(function (a) {
                            return a.from.verticeId !== event.verticeId;
                        });
                        self.arestas = self.arestas.filter(function (a) {
                            return a.to.verticeId !== event.verticeId;
                        });
                        self.arestasQtd = self.arestas.length;
                    }
                    self.vertices = self.vertices.filter(function (a) {
                        return a.id !== event.verticeId;
                    });
                }
            }
        },
        components: {
            Vertice, Aresta
        },
        props: ['btnSelected']
    }
</script>

<style scoped>
    .canvas{
        height: 100%;
    }
</style>