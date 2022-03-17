<template>
    <validation-provider :rules="rules" v-slot="{ errors }">
        <v-textarea
            :error-messages="errors"
            v-bind="$attrs"
            v-on="$listeners"
            :value="value"
            @input="$emit('update:value', $event)"
            @blur="
                $emit(
                    'update:value',
                    !!value && $attrs['type'] !== 'password'
                        ? value.trim()
                        : value
                )
            "
            :outlined="outlined"
            dense
            rows="3"
            class="height-100x"
        >
            <template v-slot:label v-if="!!$attrs.label">
                {{ $attrs.label }}
                <span class="error--text" v-if="rules.includes('required')"
                    >*</span
                >
            </template>
            <slot
                v-for="slot in Object.keys($slots)"
                :name="slot"
                :slot="slot"
            />
        </v-textarea>
    </validation-provider>
</template>

<script lang="ts" src="./base-textarea.ts" />
