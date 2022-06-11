<template>
    <base-dialog persistent :retain-focus="false" :name="name" max-width="800px">
        <template #header> {{ getCategory.Id ? 'Edit' : 'Add' }} Equipment </template>

        <v-row no-gutters>
            <v-col cols="12" class="mb-5">
                <base-text-field name="Name" :value.sync="getCategory.Name" label="Equipment Name" rules="required" />
            </v-col>
        </v-row>

        <template #dialogFooter>
            <!-- <div class="d-flex justify-end "> -->
            <base-btn class="mr-auto error" @click="Close">
                Cancel
            </base-btn>
            <base-btn @click="$emit('save', getCategory)" :disabled="!getCategory.Name">
                Save
            </base-btn>
            <!-- </div> -->
        </template>
    </base-dialog>
</template>

<script lang="ts" src="./add-equipment-doalog.component.ts" />
