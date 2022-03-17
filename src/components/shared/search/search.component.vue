<template>
    <base-text-field
        label="Search"
        ref="search"
        append-icon="mdi-magnify"
        :value="Search$.value"
        clearable
        @click:clear="Search$.next(null)"
        hide-details
        @input="Search$.next($event)"
        :loading="LoaderSrv.SearchLoader"
        :modify-page="false"
    />
</template>

<script lang="ts" src="./search.component.ts" />
