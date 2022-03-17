<template>
    <div>
        <v-app-bar elevation="3" class="text-center">
            <v-spacer />

            <v-btn text @click="submitClick">
                Submit
            </v-btn>

            <v-avatar tile min-width="150" height="80">
                <v-img height="40" contain class="transparent cursor-pointer" @click="$router.push('/home')" width="50" :src="'/images/logo.png'" />
            </v-avatar>

            <v-btn text>
                How It Works?
            </v-btn>

            <v-spacer />
        </v-app-bar>
        <v-progress-linear style="z-index: 9999" indeterminate :active="LoaderSrv.getProgressBarLoader"></v-progress-linear>
    </div>
</template>

<script lang="ts" src="./main-app-bar.component.ts" />
