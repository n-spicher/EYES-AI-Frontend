<template>
    <v-card class="round-0 overflow-hidden" v-on="$listeners" v-bind="$attrs">
        <div v-if="$slots.header" class="py-3 px-5 title">
            <slot name="header" />
        </div>
        <slot />
    </v-card>
</template>

<script lang="ts" src="./base-card.component.ts" />
