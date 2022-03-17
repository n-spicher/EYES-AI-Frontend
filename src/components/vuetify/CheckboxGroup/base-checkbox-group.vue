<template>
    <div class="d-flex flex-wrap">
        <base-checkbox
            v-for="(item, index) in items"
            :key="index"
            :label="item.Value"
            :input-value="values.find(value => value.Id === item.Id)"
            @change="updateValues($event, item)"
            class="mr-3"
            :disabled="$attrs.disabled"
            :indeterminate="$attrs.indeterminate"
            :hide-details="!!$attrs['hide-details']"
        />
    </div>
</template>

<script lang="ts" src="./base-checkbox-group.ts" />
