<template>
    <v-dialog
        v-model="Show"
        fullscreen
        :retain-focus="false"
        hide-overlay
        transition="dialog-bottom-transition"
        v-bind="$attrs"
    >
        <v-card>
            <v-toolbar dark color="primary" flat tile>
                <v-btn icon dark @click="CoreSrv.CloseModal(name)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>
                    {{ dialogTitle }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <slot name="toolbar" />
            </v-toolbar>
            <div class="dialog-box-card">
                <slot />
            </div>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.dialog-box-card {
    max-height: calc(100vh - 100px);
    overflow-x: hidden;
}
</style>

<script lang="ts" src="./full-page-dialog.component.ts" />
