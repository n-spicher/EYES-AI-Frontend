<template>
    <v-breadcrumbs
        :color="color"
        v-bind="$attrs"
        v-on="$listeners"
        class="font-weight-light rounded-md px-4"
        depressed
    >
        <slot />
    </v-breadcrumbs>
</template>

<script lang="ts" src="./base-breadcrumbs.ts" />
