<template>
    <v-menu
        v-bind="$attrs"
        v-on="$listeners"
        offset-y
        transition="slide-x-transition"
    >
        <template v-slot:activator="{ on }">
            <base-btn :icon="!!$attrs.icon" v-on="on">
                <span v-if="!$attrs.icon">
                    {{ $attrs['btn-text'] }}
                </span>
                <v-icon v-else>{{ $attrs.icon }}</v-icon>
            </base-btn>
        </template>
        <slot />
    </v-menu>
</template>

<script lang="ts" src="./base-menu.ts" />
