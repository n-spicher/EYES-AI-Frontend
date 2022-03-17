<template>
    <div
        class="bottom-right py-3 height-100x"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <div class="height-100x">
            <base-card
                class="pa-3 height-100x bottom-right overflow-hidden "
                tile
            >
                <div>
                    <slot />
                </div>
            </base-card>
        </div>
        <div
            class="bottom-left white font-weight-medium ml-8 primary--text px-2 "
        >
            {{ title }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* Bottom left text */
.bottom-left {
    position: absolute;
    top: -1px;
}
.bottom-right {
    position: relative;
}
.fill-height {
    max-height: calc(100vh - 100px);
}
</style>

<script lang="ts" src="./base-title-box.component.ts" />
