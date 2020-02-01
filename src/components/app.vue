<template>
    <div class="app-container">
        <Header></Header>
        <ScrollBar></ScrollBar>
    </div>
</template>

<script>
  import '@/global-scss/_main-styles.scss'
  import ScrollBar from '@components/scroll-bar'
  import Header from '@components/header'

  export default {
    components: { Header, ScrollBar }
  }
</script>

<style scoped lang="scss">
    .app-container {
        max-width: 1024px;
        width: 100%;
        margin: auto;
        min-height: 100vh;
    }
</style>



