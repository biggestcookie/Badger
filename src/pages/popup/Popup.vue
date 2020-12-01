<template>
  <div id="app">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="block">
            <h1 class="title">
              hello
            </h1>
            <a class="button" @click="create">Click to create</a>
            <a class="button" @click="fetchAll">Click for notif</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  color: $black;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as Messaging from "@/utils/messaging";
import { Badger } from "@/models/badger.model";

@Component
export default class Popup extends Vue {}
</script>
