<template>
    <validation-observer #default="{ invalid, reset, validate }" slim ref="baseForm">
        <v-form @submit.prevent="invalid ? undefined : $emit('submit')">
            <slot :invalid="invalid" :reset="reset" :validate="validate" />
        </v-form>
    </validation-observer>
</template>

<script lang="ts" src="./base-form.ts" />
