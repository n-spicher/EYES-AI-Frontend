<template>
    <base-form #default="form" @submit="$emit('submit', $event)" ref="baseForm">
        <base-dialog :name="name" v-bind="$attrs">
            <template #header>
                {{ title }}
            </template>
            <!-- <div class="pr-1"> -->
            <!-- <v-row dense class="pa-5 overflow-y-auto" style="max-height: calc(100vh - 160px);"> -->
            <slot v-bind="form" />
            <!-- </v-row> -->
            <!-- </div> -->

            <template #dialogFooter>
                <slot name="footer" v-bind="form" />
            </template>
        </base-dialog>
    </base-form>
</template>

<script lang="ts" src="./save-wrapper.component.ts" />
