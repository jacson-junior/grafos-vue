// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

var cont = 0;
var selected = [];

Vue.directive('vertice', {
  bind: function (el, binding, vnode) {
    el.style.position = 'absolute';

    function mousemove(e) {
      var dx = e.pageX;
      var dy = e.pageY;
      vnode.context.updatePosition(dx, dy);
      return false;
    }

    function mouseup() {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
      if (vnode.parent.context.btnSelected === 2) {
        if(cont >= 2){
          cont = 0;
        }
        if(cont === 0){
          selected[cont] = vnode.context;
        }
        if(cont === 1){
          selected[cont] = vnode.context;
          vnode.parent.context.addAresta(selected[0], selected[1]);
          selected[0] = undefined;
          selected[1] = undefined;
        }
        cont++;
      }
    }

    el.addEventListener('mousedown', function (e) {
      if (vnode.parent.context.btnSelected === 3) {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        return false;
      }
      if (vnode.parent.context.btnSelected === 2) {
        document.addEventListener('mouseup', mouseup);
        return false;
      }
    });
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
