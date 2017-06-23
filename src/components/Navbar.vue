<template>
  <div class="fill">
        <nav class="nav">
            <div class="nav-left">
                <a class="nav-item">
                  <a class="button" v-bind:class="{ 'is-active': 1 == selected }" @click="select(1)">Adicionar Vertice</a>
                  <a class="button" v-bind:class="{ 'is-active': 2 == selected }" @click="select(2)">Adicionar Aresta</a>
                  <a class="button" v-bind:class="{ 'is-active': 3 == selected }" @click="select(3)">Mover</a>
                  <a class="button is-danger is-outlined" v-bind:class="{ 'is-active': 4 == selected }" @click="select(4)">Remover</a>
                  <a class="button" v-bind:class="{ 'is-active': 5 == selected }" @click="select(5)">Welsh e Powell</a>
                  <a class="button" v-bind:class="{ 'is-active': 6 == selected }" @click="select(6)">DSATUR</a>
                  <a class="button" v-bind:class="{ 'is-active': 7 == selected }" @click="select(7)">Prim</a>
                  <a class="button" v-bind:class="{ 'is-active': 8 == selected }" @click="select(8)">DFS</a>
                </a>
            </div>
        </nav>
        <board :btnSelected="selected"></board>
        </div>
</template>

<script>

import Board from './Board';

export default {
  name: 'navbar',
  data () {
    return {
      selected: ''
    }
  },
  methods: {
    select(number){
      let self = this;
      self.selected = number;
    }
  },
  components: {
    Board
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fill{
    height: 100%;
  }
</style>
