<template>
    <v-app :style="cssProps">
        <confirm-component />
        <router-view />
        <v-fade-transition>
            <v-overlay :value="LoaderSrv.FullScreenLoader" z-index="300">
                <div class="d-flex flex-column align-center">
                    <v-progress-linear indeterminate color="white" rounded />
                    <h2 v-html="LoaderSrv.FullScreenLoaderMessage" />
                </div>
            </v-overlay>
        </v-fade-transition>
    </v-app>
</template>

<script lang="ts" src="./app.component.ts" />

<style lang="scss" src="./styles/index.scss" />
