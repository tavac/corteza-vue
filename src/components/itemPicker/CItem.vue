<template>
  <div class="d-flex align-items-center">
    <font-awesome-icon
      :icon="['fas', 'grip-vertical']"
      class="grabbable align-baseline mr-3 text-primary"
    />
    <b class="cursor-default text-dark text-truncate">
      <slot
        v-bind="item"
      >
        {{ item }}
      </slot>
    </b>
    <font-awesome-icon
      v-if="selected"
      :icon="['far', 'eye']"
      class="align-baseline ml-auto text-muted pointer"
      @click="$emit('unselect', item)"
    />
    <font-awesome-icon
      v-else
      :icon="['fas', 'eye-slash']"
      class="align-baseline ml-auto text-muted pointer"
      @click="$emit('select', item)"
    />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },

    selected: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
<style scoped>
.grabbable {
  cursor: grab;
}

.grabbable:active {
  cursor: grabbing;
}

.cursor-default {
  cursor: default;
}
</style>
