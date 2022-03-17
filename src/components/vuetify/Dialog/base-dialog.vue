<template>
    <v-dialog v-model="Show" ref="baseDialogRef" v-bind="$attrs">
        <base-card class="px-3 py-0 dialog-card">
            <v-card-title class="d-flex justify-space-between pt-6 pb-2 " v-if="$slots.header">
                <div>
                    <span class="text-h5 font-weight-bold primary--text">
                        <slot name="header" />
                    </span>
                </div>
                <div @click="CoreSrv.CloseModal(name)">
                    <v-icon v-ripple="true" class="cursor-pointer">
                        mdi-close-circle-outline
                    </v-icon>
                </div>
            </v-card-title>

            <!-- <div class="py-3 px-5 title base-dialog-header"></div> -->
            <v-divider class="mb-2" />
            <div class="pr-8 pl-2">
                <div class="px-4 py-2 overflow-y-auto" style="max-height: calc(100vh - 260px);">
                    <slot />
                </div>
            </div>

            <v-divider class="mt-2" />

            <div class="d-flex justify-end pa-2">
                <slot name="dialogFooter" />
            </div>
        </base-card>
    </v-dialog>
</template>

<script lang="ts" src="./base-dialog.ts" />

<style lang="scss" scoped>
.base-dialog {
    // z-index: 200;
    // width: 60%;
    // max-width: 768px;
    // .draggable-handle {
    //     cursor: grab !important;
    //     &:active {
    //         cursor: grabbing;
    //         & * {
    //             pointer-events: none;
    //             user-select: none;
    //         }
    //     }
    // }
}
.dialog-card {
    display: flex;
    height: calc(100% - 104px);
    flex-direction: column;
}
</style>
