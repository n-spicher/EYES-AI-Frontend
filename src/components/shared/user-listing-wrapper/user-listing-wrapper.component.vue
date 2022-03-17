<template>
    <div>
        <div>
            <user-listing-component v-bind="$attrs" v-on="$listeners">
                <slot
                    v-for="slot in Object.keys($slots)"
                    :name="slot"
                    :slot="slot"
                />
                <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
                    <slot :name="slot" v-bind="scope" />
                </template>
            </user-listing-component>
        </div>
    </div>
</template>

<script lang="ts" src="./user-listing-wrapper.component.ts" />
