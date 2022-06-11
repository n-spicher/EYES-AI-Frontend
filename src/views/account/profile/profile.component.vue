<template>
    <div class="px-5 py-5">
        <v-row>
            <v-col cols="12" md="3">
                <base-card class="pa-3" tile>
                    <div class="d-flex align-center justify-center">
                        <v-avatar class="white accent-1" size="150">
                            <!-- <v-hover v-slot="{hover}"> -->
                            <v-img :src="profileImage ? profileImage : CoreSrv.UserImage">
                                <!-- <v-overlay :value="hover" absolute>
                                    <v-icon @click="CoreSrv.dialog.profilepic = true">
                                        mdi-pencil
                                    </v-icon>
                                </v-overlay> -->
                            </v-img>
                            <!-- </v-hover> -->
                        </v-avatar>
                        <!-- <v-dialog :retain-focus="false" v-model="CoreSrv.dialog.profilepic" max-width="500" persistent>
                        <v-card>
                            <upload-profile-picture-component ref="cropperRef" @close="CoreSrv.dialog.profilepic = false" @update="update" />
                        </v-card>
                    </v-dialog> -->
                    </div>
                    <p class="headline mb-2 d-flex justify-center   ">Hello {{ UserData.FirstName }} {{ UserData.LastName }}</p>
                    <v-divider />

                    <p class="my-3">
                        <v-icon>mdi-email</v-icon>
                        {{ UserData.Email }}
                    </p>
                </base-card>
                <!-- <base-card class="mt-3 rounded-0">
                <v-list dense nav>
                    <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        :to="item.link"
                        color="primary"
                    >
                        <v-list-item-icon class="mr-3">
                            <v-icon v-text="item.icon" />
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text" />
                        </v-list-item-content>
                        <v-list-item-icon class="mr-3">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list>
            </base-card> -->
                <div class="pt-3">
                    <navigation-card-component titleOne="Profile Setting" :navigation-links="items" />
                </div>
            </v-col>
            <v-col cols="12" :md="!!items.length ? 9 : 12">
                <router-view :key="$route.fullPath" />
            </v-col>
            <!-- <v-col cols="12" md="8">
            <router-view />
        </v-col> -->
        </v-row>
    </div>
</template>

<script lang="ts" src="./profile.component.ts" />

<style scoped>
.cropper {
    height: 1000px;
    background: #ddd;
}
</style>
