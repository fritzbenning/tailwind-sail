<!--
  Tailwind Sail manual check: open Tailwind Sail sidebar, put the caret inside `.app-header` or `&__logout` below.
  Utilities from every @apply in that rule are merged in the list. Nested `&:hover` is a separate scope.
-->
<template>
  <header class="app-header">
    <button class="app-header__logout" type="button">Log out</button>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  @apply flex justify-between px-4 pt-4 border-b border-zinc-700 mb-4;

  &__logout {
    @apply px-3 py-1.5 rounded border border-zinc-800 transition-colors;
    @apply text-xs uppercase tracking-[0.18em] text-zinc-300;
    @apply hover:border-sky-700 hover:text-sky-200 disabled:cursor-not-allowed disabled:text-zinc-600;
  }
}
</style>
