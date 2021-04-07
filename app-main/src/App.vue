<template>
  <div class="app-main">
    <div class="content">
      <h1>app main</h1>
      <p>
        <a href="/"><button>app main</button></a>
        <a href="/app-vue"><button>app vue</button></a>
        <a href="/app-react"><button>app react</button></a>
      </p>
    </div>

    <div id="subapp"></div>
  </div>
</template>
<script>
export default {};
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
