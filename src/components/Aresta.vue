<template>
    <g>
        <defs>
            <path :id="id" :d="path" :style="{ 'stroke': color, 'stroke-width': '1' }" />
        </defs>
        <use :xlink:href="refId" fill="none" />
        <text text-anchor="middle" fill="#363636" v-on:dblclick="consol">
            <textPath startOffset="50%" :xlink:href="refId">{{pesoCorreto}}</textPath>
        </text>
    </g>
</template>

<script>
export default {
    name: 'aresta',
    data() {
        return {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            id: 0,
            color: 'rgb(219, 219, 219)',
            peso: 0
        }
    },

    created() {
        let self = this;
        self.x1 = self.from.x + 25;
        self.y1 = self.from.y - 25;
        self.x2 = self.to.x + 25;
        self.y2 = self.to.y - 25;
        self.id = "aresta-" + self.arestaId;
        self.consol();
    },

    watch: {
        'from.x'(value) {
            let self = this;
            self.x1 = self.from.x + 25;
        },
        'from.y'(value) {
            let self = this;
            self.y1 = self.from.y - 25;
        },
        'to.x'(value) {
            let self = this;
            self.x2 = self.to.x + 25;
        },
        'to.y'(value) {
            let self = this;
            self.y2 = self.to.y - 25;
        }
    },

    computed: {
        path() {
            let self = this;
            return "M " + self.x1 + " " + self.y1 + " l " + (self.x2 - self.x1) + " " + (self.y2 - self.y1);
        },
        refId(){
            let self = this;
            return "#" + self.id;
        },
        pesoCorreto(){
            let self = this;
            if(self.peso === 0){
                return "";
            }else{
                return self.peso;
            }
        }
    },

    methods: {
        consol(){
            let self = this;
            var result = prompt("Insira o peso da aresta", "0");
            self.peso = result;
        }
    },

    props: ['aresta-id', 'from', 'to']
}
</script>

<style scoped>
</style>