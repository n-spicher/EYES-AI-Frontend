<template>
    <base-dialog persistent :retain-focus="false" :name="name" max-width="800px">
        <template #header> Change Role for "{{ user ? user.FirstName : '' }}" </template>

        <v-row no-gutters>
            <v-col cols="12" class="mb-5">
                <base-select label="Select a Role" :items="roles" :value.sync="role"> </base-select>
            </v-col>
        </v-row>

        <template #dialogFooter>
            <!-- <div class="d-flex justify-end "> -->
            <base-btn class="mr-auto error" @click="Close">
                Cancel
            </base-btn>
            <base-btn @click="$emit('save', role)" :disabled="!role">
                Save
            </base-btn>
            <!-- </div> -->
        </template>
    </base-dialog>
</template>

<script lang="ts" src="./change-role-dialog.component.ts" />
