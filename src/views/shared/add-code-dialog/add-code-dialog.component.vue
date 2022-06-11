<template>
    <base-dialog persistent :retain-focus="false" :name="name" max-width="800px">
        <template #header> Add Code for "{{ category ? category.Name : '' }}" </template>

        <v-row no-gutters>
            <v-col cols="12" class="mb-5">
                <base-text-field name="Code" :value.sync="code.Code" label="Code" rules="required" />
            </v-col>
        </v-row>

        <template #dialogFooter>
            <!-- <div class="d-flex justify-end "> -->
            <base-btn class="mr-auto error" @click="Close">
                Cancel
            </base-btn>
            <base-btn @click="$emit('save', code)" :disabled="!code.Code">
                Save
            </base-btn>
            <!-- </div> -->
        </template>
    </base-dialog>
</template>

<script lang="ts" src="./add-code-dialog.component.ts" />
