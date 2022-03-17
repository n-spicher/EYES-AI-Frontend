<template>
    <validation-provider :rules="rules" v-slot="{errors}">
        <v-radio-group :error-messages="errors" v-bind="$attrs" v-on="$listeners" :input-value="value" @change="$emit('update:value', $event)">
            <v-radio v-for="(item, index) in items" :key="index" :label="item" :value="item" />
        </v-radio-group>
    </validation-provider>
</template>

<script lang="ts" src="./base-radio-group.ts" />
