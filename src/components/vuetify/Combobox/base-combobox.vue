<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <v-combobox
      :error-messages="errors"
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      @input="$emit('update:value', $event)"
      multiple
      small-chips
      :outlined="outlined"
      dense
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Press
              <kbd>enter</kbd> to add tag
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-slot:label v-if="!!$attrs.label">
        <span class="error--text" v-if="rules.includes('required')">*</span>
        {{ $attrs.label }}
      </template>
      <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />
    </v-combobox>
  </validation-provider>
</template>

<script lang="ts" src="./base-combobox.ts" />
