<template>
    <v-checkbox
        v-bind="$attrs"
        v-on="$listeners"
        hide-details
        :value="value"
        :input-value="inputValue"
        @change="$emit('update:inputValue', $event)"
    >
    </v-checkbox>
</template>

<script lang="ts" src="./base-checkbox.ts" />
