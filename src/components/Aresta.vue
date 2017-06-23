<template>
    <g :transform="transform">
        <defs>
            <marker id="markerArrow" markerWidth="13" markerHeight="13" refX="2" refY="6" orient="auto">
                 <path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000;" />
            </marker>
            <path :id="id" :d="path" :style="{ 'stroke': color, 'stroke-width': '1' }" marker-mid="url(#markerArrow)"/>
        </defs>
        <use :xlink:href="refId" fill="none"/>
        <text text-anchor="middle" fill="blue" v-on:dblclick="consol">
            <textPath startOffset="50%" :xlink:href="refId">{{flow}}{{pesoCorreto}}</textPath>
        </text>
        <text fill="red">
            <textPath :xlink:href="refId" startOffset="30%" style="dominant-baseline: central; ">➤</textPath>
            <textPath :xlink:href="refId" startOffset="70%" style="dominant-baseline: central; ">➤</textPath>
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
            tx: 0,
            ty: 0,
            ligacoes: 0,
            color: 'rgb(219, 219, 219)',
            peso: 0,
            flow: ""
        }
    },

    created() {
        let self = this;
        self.x1 = self.from.x + 25;
        self.y1 = self.from.y - 25;
        self.x2 = self.to.x + 25;
        self.y2 = self.to.y - 25;
        self.id = "aresta-" + self.arestaId;
        self.ligacoes = self.lig;
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
        },
        transform() {
            console.log(this);
            return `translate(${this.movey}, ${this.movex})`
        }
    },

    methods: {
        consol(){
            let self = this;
            var result = prompt("Insira o peso da aresta", "0");
            self.peso = result;
        }
    },

    props: ['aresta-id', 'from', 'to', 'lig', 'movex', 'movey']
}
</script>

<style scoped>
</style>