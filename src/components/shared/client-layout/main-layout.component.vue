<template>
    <v-app>
        <v-container fluid class="py-0 px-0 overflow-x-hidden" style="position: relative;">
            <main-app-bar-component />

            <pdf-picker-dialog-component />

            <!-- <client-drawer-component /> -->

            <v-main>
                <div class="">
                    <router-view :key="$route.fullPath" />
                </div>
            </v-main>
            <v-fade-transition>
                <v-overlay :value="LoaderSrv.FullScreenLoader" z-index="300">
                    <div class="d-flex flex-column align-center">
                        <v-progress-linear indeterminate color="white" rounded />
                        <h2 v-html="LoaderSrv.FullScreenLoaderMessage" />
                    </div>
                </v-overlay>
            </v-fade-transition>
            <!-- <client-footer-component /> -->
        </v-container>
    </v-app>
</template>

<script lang="ts" src="./main-layout.component.ts" />
