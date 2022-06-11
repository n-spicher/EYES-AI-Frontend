<template>
    <div class="d-flex justify-center py-10">
        <base-card class=" pb-10 rounded-lg " outlined max-width="500px">
            <div class="d-flex justify-center mb-2">
                <v-avatar tile min-width="55" width="300" height="100">
                    <v-img contain class="cursor-pointer" src="/images/logo.png" />
                </v-avatar>
            </div>
            <div class="px-9">
                <base-form @submit="Login" ref="baseform">
                    <v-row dense justify="center">
                        <v-col cols="12">
                            <base-text-field
                                dense
                                class="rounded-l"
                                label="Email Address"
                                name="LoginEmailAddress"
                                rules="required|email"
                                :value.sync="login.Email"
                            />
                        </v-col>
                        <v-col cols="12">
                            <base-text-field
                                dense
                                outlined
                                :type="show1 ? 'text' : 'password'"
                                label="Password"
                                name="LoginPassword"
                                rules="required"
                                :value.sync="login.Password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show1 = !show1"
                            />
                        </v-col>
                        <v-col cols="12" class=" d-flex justify-space-between align-center mt-n6 ">
                            <!-- <base-checkbox class="grey--text text--darken-1" label="Remember me" hide-details :input-value.sync="login.RememberMe" /> -->
                            <div @click="CoreSrv.dialog.forgetPassword = true" class=" mt-5 grey--text text--darken-1 cursor-pointer">
                                Forgot Password?
                            </div>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col>
                            <div class="error--text subtitle-2">{{ loginError }}</div>
                        </v-col>
                    </v-row>
                    <v-row justify="end" no-gutters>
                        <v-col cols="12" class=" py-5">
                            <v-row
                                :class="{
                                    'flex-wrap-reverse': this.$vuetify.breakpoint.xsOnly
                                }"
                            >
                                <!-- <v-col cols="12" md="6" sm="6">
                                    <base-btn class=" white black--text   text-h6 " :class="{'px-12': !notShowable}" @click="Cancel()"
                                        ><h5>
                                            Cancel
                                        </h5></base-btn
                                    >
                                </v-col> -->
                                <v-col cols="12">
                                    <base-btn class=" primary  text-h6 " type="submit" :class="{'px-12': !notShowable}">
                                        <h5 class="px-3">
                                            Login
                                        </h5>
                                    </base-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                        <!-- <v-col cols="12">
                            <p class="grey--text text--darken-1">
                                Not a member yet?
                                <a class="font-weight-medium text-decoration-underline" @click="$router.push({name: 'Signup'})">Sign up</a>
                                for free.
                            </p>
                        </v-col> -->
                    </v-row>
                </base-form>
            </div>
        </base-card>
        <forgot-password-component />
    </div>
</template>

<script lang="ts" src="./login.component.ts" />
