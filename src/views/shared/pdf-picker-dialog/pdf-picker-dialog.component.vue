<template>
    <base-dialog persistent :retain-focus="false" :name="name" max-width="800px">
        <template #header>
            Pick a pdf file
        </template>

        <v-row no-gutters>
            <v-col cols="12" class="mb-5">
                <drag-drop-upload-component :acceptedFiles="acceptedFiles" :max-files="1" :file.sync="files" ref="dragDropRef">
                    Pick Pdf File
                </drag-drop-upload-component>
            </v-col>

            <v-col cols="12">
                <v-row>
                    <v-col cols="12" md="6">
                        <base-autocomplete
                            :items="pdfProcessorSrv.categories"
                            :item-text="'Name'"
                            :item-value="'Id'"
                            label="Equipment"
                            :hide-details="true"
                            :value.sync="pdfProcessorSrv.selectedCategoryId"
                            @change="categoryChanged"
                            clearable
                        >
                            <template v-slot:item="data">
                                <!-- <template v-if="typeof data.item !== 'object'">
                                    <v-list-item-content v-text="data.item"></v-list-item-content>
                                </template> -->
                                <template>
                                    <v-list-item-content>
                                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                        <!-- <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle> -->
                                    </v-list-item-content>
                                </template>
                            </template>
                        </base-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="d-flex " v-if="pdfProcessorSrv.selectedCategoryId !== -1">
                            <base-text-field
                                :value.sync="pdfProcessorSrv.searchValue"
                                :label="`Add Keyword To '${pdfProcessorSrv.selectedCategories.length > 0 ? pdfProcessorSrv.selectedCategories[0].Name : ''}'`"
                                :disabled="!(pdfProcessorSrv.selectedCategories.length > 0)"
                                class="mr-2 flex-1"
                            />
                            <base-btn class="primary white--text" :disabled="!(pdfProcessorSrv.selectedCategories.length > 0)" @click="Add">
                                Add
                            </base-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <template #dialogFooter>
            <!-- <div class="d-flex justify-end "> -->
            <base-btn class="mr-auto error" @click="Close">
                Cancel
            </base-btn>
            <base-btn @click="fileChanged">
                Submit PDF
            </base-btn>
            <!-- </div> -->
        </template>
    </base-dialog>
</template>

<script lang="ts" src="./pdf-picker-dialog.component.ts" />
