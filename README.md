# vue-animate

### 1.在html的head中引入animate.css

\<link data-n-head="true" rel="stylesheet" href="https://cdn.bootcss.com/animate.css/3.5.2/animate.min.css">

### 2.vue中main.js引入插件
  <pre>
   const vueAnimate = require('./vue-animate')
   Vue.use(vueAnimate)
  </pre>
### 3.vue中使用(添加animate的类名即可)
      <div v-animate='"animated swing"'><div>
