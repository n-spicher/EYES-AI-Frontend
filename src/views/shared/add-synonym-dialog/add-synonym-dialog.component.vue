<template>
    <base-dialog persistent :retain-focus="false" :name="name" max-width="800px">
        <template #header> Add Synonym for ({{ category ? category.Name : '' }}) </template>

        <v-row no-gutters>
            <v-col cols="12" class="mb-5">
                <div class="d-flex justify-center">
                    <base-text-field class="flex-1 mr-3" name="Name" :value.sync="Name" label="Synonym" />
                    <base-btn class="primary white--text" @click="AddItem">
                        Add
                    </base-btn>
                </div>
            </v-col>
            <v-col cols="12">
                <span v-for="syn in synonyms" :key="syn.Id">
                    <v-chip class="ma-2" close @click:close="DeleteCategoryItemSynonym(syn)">
                        {{ syn }}
                    </v-chip>
                </span>
            </v-col>
        </v-row>

        <template #dialogFooter>
            <!-- <div class="d-flex justify-end "> -->
            <base-btn class="mr-auto error" @click="Close">
                Cancel
            </base-btn>
            <base-btn @click="$emit('save', synonyms)" :disabled="synonyms.length === 0">
                Save
            </base-btn>
            <!-- </div> -->
        </template>
    </base-dialog>
</template>

<script lang="ts" src="./add-synonym-dialog.component.ts" />
