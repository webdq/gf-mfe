<template>
  <div class="app-main">
    <div class="content">
      <h1>app main</h1>
      <p>
        <a href="/"><button type="button">app main</button></a>
        <a href="/app-vue"><button type="button">app vue</button></a>
        <a href="/app-react"><button type="button">app react</button></a>
      </p>

      <p>
        <button @click="handleClick" type="button">app main error</button>
      </p>
    </div>

    <div id="subapp"></div>
  </div>
</template>
<script>
export default {
  props: ['a'],
  methods: {
    handleClick() {
      window.obj.appmain;
    }
  }
};
</script>

<style lang="scss">
.app-main {
  .content {
    padding: 20px;
    border: 1px solid #ddd;
    text-align: center;
  }
}
</style>
