<template>
    <v-row dense align="center">
        <!-- <v-col cols="2" style="align-self: center">
            <div class="width-100">
                <v-select
                    :items="[10, 20, 50]"
                    :value="10"
                    hide-details
                    class="font-weight-medium pa-0 ma-0"
                />
            </div>
        </v-col> -->
        <v-col cols="auto">
            <v-pagination
                :value="PagSrv.CurrentPage.value"
                :length="PagSrv.TotalPages"
                :total-visible="PagSrv.TotalVisible"
                @input="setCurrentPage"
                class=" d-flex justify-start base-pagination "
            />
        </v-col>
    </v-row>
</template>

<script lang="ts" src="./pagination.component.ts" />

<style lang="scss">
.base-pagination {
    button {
        outline: none !important;
    }
}
</style>
