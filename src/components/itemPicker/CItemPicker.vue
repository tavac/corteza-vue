<template>
  <div
    class="overflow-hidden"
  >
    <!-- items: {{ items }} <br>
    selected: {{ selected }} -->
    <b-input-group>
      <b-input
        v-model.trim="query"
        type="search"
        :placeholder="labels.searchPlaceholder"
        class="text-truncate"
      />
      <b-input-group-append>
        <b-input-group-text
          class="text-primary bg-white border-left-0"
        >
          <font-awesome-icon
            :icon="['fas', 'search']"
          />
        </b-input-group-text>
      </b-input-group-append>
    </b-input-group>

    <b-row
      class="mt-2 h-100"
    >
      <b-col
        cols="12"
        sm="6"
      >
        <div
          class="d-flex align-items-center"
        >
          <label
            class="text-primary mb-0"
          >
            {{ labels.availableItems }}
          </label>
          <b-button
            variant="link"
            :class="[filteredItems.length ? 'visible' : 'invisible']"
            class="ml-auto px-0 text-muted"
            @click.prevent="selected.push(...items); items = []"
          >
            {{ labels.selectAllItems }}
          </b-button>
        </div>
        <b-list-group
          vertical
        >
          <draggable
            v-model="items"
            :sort="!disabledSorting"
            :move="disableDragging"
            :style="`${maxHeight}`"
            group="items"
            class="overflow-auto"
          >
            <b-list-group-item
              v-for="item in filteredItems"
              :key="item.value"
              class="mb-3 border rounded"
              @dblclick="select(item)"
            >
              <c-item
                :item="item"
                :selected="false"
                @select="select"
              >
                <template
                  v-for="(index, name) in $scopedSlots"
                  v-slot:[name]="data"
                >
                  <slot
                    :name="name"
                    v-bind="data"
                  />
                </template>
              </c-item>
            </b-list-group-item>
          </draggable>
        </b-list-group>
      </b-col>
      <b-col
        cols="12"
        sm="6"
        class="pl-sm-0"
      >
        <div
          class="d-flex align-items-center"
        >
          <label
            class="mb-0 text-primary"
          >
            {{ labels.selectedItems }}
          </label>
          <b-button
            variant="link"
            :class="[filteredSelectedItems.length ? 'visible' : 'invisible']"
            class="ml-auto px-0 text-muted"
            @click.prevent="items.push(...selected); selected = []"
          >
            {{ labels.unselectAllItems }}
          </b-button>
        </div>
        <b-list-group
          vertical
        >
          <draggable
            v-model="selected"
            :style="`${maxHeight}`"
            :sort="!disabledSorting"
            :move="disableDragging"
            group="items"
            class="overflow-auto"
          >
            <b-list-group-item
              v-for="item in filteredSelectedItems"
              :key="item.value"
              class="mb-3 border rounded"
              @dblclick="unselect(item)"
            >
              <c-item
                :item="item"
                selected
                @unselect="unselect"
              >
                <template
                  v-for="(index, name) in $scopedSlots"
                  v-slot:[name]="data"
                >
                  <slot
                    :name="name"
                    v-bind="data"
                  />
                </template>
              </c-item>
            </b-list-group-item>
          </draggable>
        </b-list-group>
      </b-col>
      <b-col
        v-if="!filteredItems.length && !filteredSelectedItems.length"
        class="text-center my-3 h6"
      >
        No items found
      </b-col>
    </b-row>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import CItem from './CItem.vue'

export default {
  components: {
    draggable,
    CItem,
  },

  props: {
    values: {
      type: Array,
      required: true,
    },

    value: {
      type: Array,
      required: true,
    },

    disabledSorting: {
      type: Boolean,
      default: false,
    },

    disabledDragging: {
      type: Boolean,
      default: false,
    },

    labels: {
      type: Object,
      required: true,
    },

    maxHeight: {
      type: String,
      default: 'max-height: 65vh;',
    },
  },

  data () {
    return {
      query: '',
      items: this.values.filter(v => !this.value.includes(v.value)),
      selected: this.values.filter(v => this.value.includes(v.value)),
    }
  },

  computed: {
    filteredItems () {
      return this.items.filter(i => i.text.toLowerCase().indexOf(this.query.toLowerCase()) !== -1)
    },

    filteredSelectedItems () {
      return this.selected.filter(i => i.text.toLowerCase().indexOf(this.query.toLowerCase()) !== -1)
    },
  },

  watch: {
    selected (v) {
      this.$emit('update:value', v.map(i => i.value))
    },
  },

  methods: {
    disableDragging (e) {
      if (this.disabledDragging && e.to !== e.from) {
        return false
      }
    },
    select (item) {
      this.items = this.items.filter(v => v.value !== item.value)
      this.selected.push(item)
    },
    unselect (item) {
      this.selected = this.selected.filter(v => v.value !== item.value)
      this.items.push(item)
    },
  },
}
</script>
