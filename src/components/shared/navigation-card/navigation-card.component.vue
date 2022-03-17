<template>
    <div>
        <base-card
            class="pa-1 mb-3 "
            tile
            v-for="(link, index) in navigationLinks"
            :key="index"
        >
            <v-navigation-drawer
                class="pa-0"
                floating
                stateless
                :value="true"
                width="auto"
            >
                <div
                    class="pb-2"
                    v-if="
                        link[index].Position == (1 || 2) ||
                            link[index].Position == 2
                    "
                >
                    <v-card-title
                        class="d-flex justify-center primary--text py-2"
                        >{{
                            link[index].Position == 1
                                ? 'System Data Items'
                                : link[index].Position == 2
                                ? 'State Data Items'
                                : ''
                        }}</v-card-title
                    >
                    <v-divider />
                </div>
                <v-list dense nav flat class="pa-0 transparent">
                    <v-list-item
                        v-for="(subLink, i) in link"
                        class="py-1 mb-1 rounded-5"
                        :class="{
                            'active-link-hover': !!$route.matched.find(
                                x => x.name === subLink.Name
                            )
                        }"
                        :key="`link-${i}`"
                        :to="{ name: subLink.Name }"
                    >
                        <v-list-item-icon class="mr-3">
                            <v-icon color="primary">{{ subLink.Icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <div class="d-flex justify-space-between">
                                <v-list-item-title class="primary--text">{{
                                    subLink.Name
                                }}</v-list-item-title>
                                <div class="right">
                                    <v-icon color="primary height-0 width-0">
                                        mdi-chevron-right
                                    </v-icon>
                                </div>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </base-card>
    </div>
</template>

<style lang="scss">
.active-link-hover {
    background-color: rgba(200, 200, 200, 0.5);
    color: black;
}
.v-navigation-drawer {
    box-shadow: none !important;
}
.v-list-item.rounded-5:last-child {
    margin-bottom: 0 !important;
}
</style>
<script lang="ts" src="./navigation-card.component.ts" />
