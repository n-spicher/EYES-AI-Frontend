<template>
    <base-dialog persistent :retain-focus="false" :name="name" max-width="800px">
        <template #header> {{ CategoryItemObj.Id ? 'Edit' : 'Add' }} Keyword for ({{ category ? category.Name : '' }}) </template>

        <v-row no-gutters>
            <v-col cols="12" class="mb-5">
                <base-text-field name="Name" :value.sync="CategoryItemObj.Name" @change="keywordChange" label="Keyword" rules="required" />
            </v-col>
            <v-col cols="12" class="mb-5">
                <base-text-field name="Note" :value.sync="CategoryItemObj.Note" label="Note" />
            </v-col>
        </v-row>

        <template #dialogFooter>
            <!-- <div class="d-flex justify-end "> -->
            <base-btn class="mr-auto error" @click="Close">
                Cancel
            </base-btn>
            <base-btn @click="$emit('save', CategoryItemObj)" :disabled="!CategoryItemObj.Name">
                Save
            </base-btn>
            <!-- </div> -->
        </template>
    </base-dialog>
</template>

<script lang="ts" src="./add-keyword-doalog.component.ts" />
