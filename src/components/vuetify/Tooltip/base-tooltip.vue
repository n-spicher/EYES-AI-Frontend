<template>
    <v-tooltip
        :top="direction == 'top'"
        :bottom="direction == 'bottom'"
        :left="direction == 'left'"
        :right="direction == 'righ'"
    >
        <template v-slot:activator="{ on }">
            <slot :on="on" />
        </template>
        <span>{{ msg }}</span>
    </v-tooltip>
</template>

<script lang="ts" src="./base-tooltip.ts" />
