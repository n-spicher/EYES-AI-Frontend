<template>
    <v-dialog ref="dialog" v-model="dialog" persistent max-width="320px">
        <template #activator="{ on, attrs }">
            <base-text-field
                :value="value"
                v-bind="{...attrs, ...$attrs}"
                v-on="{...on, ...$listeners}"
                :rules="rules"
                readonly
                flat
                @click:append="dialog = true"
                append-icon="mdi-calendar"
                dense
            />
        </template>
        <v-card flat>
            <v-card-text class="pa-0">
                <v-date-picker full-width color="primary" :value="value" @input="$emit('update:value', $event)" />
            </v-card-text>

            <v-card-actions>
                <v-spacer />
                <base-btn text color="primary" @click="$refs.dialog.save(value)">OK</base-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" src="./base-date-picker.ts" />
<style lang="scss" scoped>
.date-picker-card-text {
    max-height: calc(100vh - 100px);
    overflow-x: hidden;
}
</style>
