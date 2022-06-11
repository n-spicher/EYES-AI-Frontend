<template>
    <v-btn :color="color" v-bind="$attrs" v-on="$listeners" class="font-weight-medium rounded-md" :block="CoreSrv.block">
        <slot />
    </v-btn>
</template>

<script lang="ts" src="./base-btn.ts" />
