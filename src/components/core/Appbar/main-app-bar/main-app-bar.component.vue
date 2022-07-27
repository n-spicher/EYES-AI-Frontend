<template>
    <div>
        <v-app-bar elevation="3" class="text-center">
            <v-spacer />

            <v-btn text :to="{name: 'Home'}">
                Submit
            </v-btn>

            <v-avatar tile min-width="150" height="80">
                <v-img height="40" contain class="transparent cursor-pointer" @click="$router.push('/home')" width="50" :src="'/images/logo.png'" />
            </v-avatar>

            <v-btn
                class="mr-1"
                text
                :to="{name: 'BackEnd'}"
                v-if="UserSessionSrv.isUserAuthenticated && (UserSessionSrv.isAdmin || UserSessionSrv.isSuperAdmin)"
            >
                BackEnd
            </v-btn>
            <!-- 
            <v-btn text>
                How It Works?
            </v-btn> -->

            <v-btn text :to="{name: 'Login'}" v-if="!UserSessionSrv.isUserAuthenticated">
                Login
            </v-btn>

            <!-- <v-btn text :to="{name: 'Login'}" v-if="UserSessionSrv.isUserAuthenticated" @click="logout">
                Logout
            </v-btn> -->

            <div class="d-flex justify-space-evenly " v-if="UserSessionSrv.isUserAuthenticated">
                <v-menu bottom offset-y transition="slide-y-reverse-transition">
                    <template #activator="{ on, attrs }">
                        <base-card class="white cursor-pointer d-flex flex-width ml-auto rounded-pill transparent" flat>
                            <div class="d-flex align-center pa-1 " v-bind="attrs" v-on="on">
                                <span class="px-2">{{ User.FirstName }} {{ User.LastName }}</span>
                                <v-avatar class="white accent-1" size="40">
                                    <v-img :src="User.ImageUrl ? User.ImageUrl : CoreSrv.UserImage" />
                                </v-avatar>
                            </div>
                        </base-card>
                    </template>
                    <v-list dense nav>
                        <v-list-item :href="'/profile'" link active-class="primary white--text">
                            <v-list-item-icon class="mr-3">
                                <v-icon class="text--lighten-1">mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title class="cursor-pointer    text--lighten-1"> Profile </v-list-item-title>
                        </v-list-item>
                        <v-list-item link active-class="primary white--text" @click="logout">
                            <v-list-item-icon class="mr-3">
                                <v-icon class="text--lighten-1">mdi-logout</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title class="cursor-pointer    text--lighten-1"> Logout </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

            <v-spacer />
        </v-app-bar>
        <v-progress-linear style="z-index: 9999" indeterminate :active="LoaderSrv.getProgressBarLoader"></v-progress-linear>
    </div>
</template>

<script lang="ts" src="./main-app-bar.component.ts" />
