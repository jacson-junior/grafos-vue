<template>
    <a class="vertice" v-bind:style="{ top: y + 'px', left: x + 'px', 'border-color': color, 'background-color': backColor}" v-vertice @click="clicked">
        <h2 class="center">B{{verticeId}}</h2>
    </a>
</template>

<script>
export default {
    name: 'vertice',
    data (){
        return {
            x: 0,
            y: 0,
            color: 'rgba(219, 219, 219)',
            backColor: 'rgba(255, 255, 255, 1)'
        }
    },  

    created(){
        let self = this;
        self.y = self.posY - 25;
        self.x = self.posX -25;
    },
    methods: {
        updatePosition(x, y){
            let self = this;
            self.x = x - 25;
            self.y = y - 25;
        },
        clicked(event){
            let self = this;
            self.$emit('clicked', self);
        }
    },

    watch: {
        color(){
            let self = this;
            self.backColor = self.color.slice(0,self.color.length-1) + ',0.5)';
        }
    },
    
    props: ['vertice-id', 'pos-x', 'pos-y']
}
</script>

<style scoped>
.vertice{
    user-select: none;
    display: block;
	border-radius: 50%;
	width: 50px;
	height: 50px;
    background-color: white;
    border: 2px solid rgb(219, 219, 219);
    position: absolute;
    text-align: center;
}
.vertice:hover{
    border-color: rgb(181, 181, 181);
}
.center{
    line-height: 46px;
}
a {
    color: #7a7a7a;
}
a:hover{
    color: #363636;
}
</style>