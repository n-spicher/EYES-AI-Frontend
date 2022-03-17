<template>
    <v-row>
        <v-col cols="12" md="3" v-if="!!NavigationLinks.length" class="pt-8">
            <navigation-card-component :navigation-links="NavigationLinks" />
        </v-col>
        <v-col cols="12" :md="!!NavigationLinks.length ? 9 : 12">
            <router-view :key="$route.fullPath" />
        </v-col>
    </v-row>
</template>

<script lang="ts" src="./base-layout.component.ts" />
