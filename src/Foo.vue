<template>
    <div data-maybe="or not?" class="p-4 pt-8 md:pt-8" id="maybe-this-id-gets-newlined"></div>
</template>

<script setup lang="ts">
import type { ArbitraryType } from "./foo"
import { arbitraryConst } from "./foo"

const foo = arbitraryConst satisfies ArbitraryType
</script>

<style scoped lang="scss"></style>
