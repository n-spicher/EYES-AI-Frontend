<template>
    <v-data-table
        :headers="headers"
        fixed-header
        :footer-props="{
            ...footerProps
        }"
        :server-items-length="ServerItems"
        :items="data"
        class="elevation-0 "
        width="1000px"
        v-on="$listeners"
    >
        <template #[`top`]="{ pagination, options, updateOptions  }">
            <!-- v-if="!$attrs.dataTableAttrs['hide-custom-header']" -->
            <div class="d-flex justify-space-between">
                <div class="d-flex align-center">
                    <search-component v-on="$listeners" />
                </div>
                <div>
                    <v-data-footer
                        class="bb-1--grey-20 primary--text  "
                        style="border-top: 0px;"
                        :pagination="pagination"
                        :options="options"
                        @update:options="updateOptions"
                        :items-per-page-options="footerProps.itemsPerPageOptions"
                        :items-per-page-text="footerProps.itemsPerPageText"
                    >
                    </v-data-footer>
                </div>
            </div>
        </template>
        <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />
        <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
        </template>
    </v-data-table>
</template>

<script lang="ts" src="./user-listing.component.ts" />
