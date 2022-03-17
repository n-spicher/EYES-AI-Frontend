<template>
    <v-data-table
        :headers="headers"
        fixed-header
        :footer-props="{
            ...footerProps
        }"
        :items="data"
        :server-items-length="ServerItems"
        class="elevation-0 px-4 "
        v-on="$listeners"
    >
        <template #[`top`]="{ pagination, options, updateOptions  }">
            <!-- v-if="!$attrs.dataTableAttrs['hide-custom-header']" -->
            <!-- <div class="d-flex justify-space-between"> -->
            <v-row no-gutters class="d-flex justify-space-between">
                <v-col cols="12" md="2" sm="6" v-if="!$attrs.NoDropdown">
                    <div class="pa-1">
                        <slot name="customFilter" />
                        <base-select
                            v-if="!$attrs.CustomFilter"
                            hide-details
                            :value.sync="FilterSrv.Filter.Status"
                            @change="
                                FilterSrv.Filter.Status = $event;
                                $emit('status-change', $event);
                            "
                            :items="items"
                            item-value="value"
                            item-text="name"
                            color="primary"
                            class="primary--text py-0  font-weight-medium width-30"
                        />
                    </div>
                </v-col>
                <v-col cols="12" md="2" sm="6">
                    <div class="pa-1">
                        <search-component v-on="$listeners" />
                    </div>
                </v-col>
                <v-col cols="12" md="8">
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
                </v-col>
            </v-row>
            <!-- </div> -->
        </template>
        <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />
        <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
        </template>
    </v-data-table>
</template>

<script lang="ts" src="./listing.component.ts" />
