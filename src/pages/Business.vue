<template>
  <div>
    <header>
      <Navbar />
    </header>
    <h1>mine</h1>
    <Tabbar />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Tabbar from "@/components/Tabbar.vue";
export default {
  components: {
    Tabbar,
    Navbar,
  },
};

Tabbar;
</script>

<style scoped></style>
