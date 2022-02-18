<template>
  <div class="container mx-auto">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    slim: Boolean
  }
};
</script>
