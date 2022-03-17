<template>
    <div>
        <div class="d-flex align-center justify-space-between gap-3 flex-wrap ">
            <div class="d-flex pa-1">
                <base-btn
                    v-for="(action, i) in actions"
                    :key="i"
                    class="accent pa-1"
                    color="secondary"
                    @click="$emit('action', i)"
                    text
                >
                    <v-icon>{{ action.icon }}</v-icon>
                    {{ action.text }}
                </base-btn>
            </div>
        </div>
        <div class="pt-3">
            <listing-component v-bind="$attrs" v-on="$listeners">
                <slot
                    v-for="slot in Object.keys($slots)"
                    :name="slot"
                    :slot="slot"
                />
                <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
                    <slot :name="slot" v-bind="scope" />
                </template>
            </listing-component>
        </div>
    </div>
</template>

<script lang="ts" src="./listing-wrapper.component.ts" />
