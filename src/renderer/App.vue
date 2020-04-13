<template>
  <v-app
    id="toolkit"
    class="v-application container-fluid"
  >
    <app-timer />
  </v-app>
</template>

<script>
import BaseTimer from './components/shared/BaseTimer'

export default {
  name: 'App',
  components: {
    'app-timer': BaseTimer,
  },
}
</script>

<style>
body {
  background-color: #fff;
}

#toolkit {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
