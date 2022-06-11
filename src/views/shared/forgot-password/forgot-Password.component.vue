<template>
    <div>
        <v-dialog
            persistent
            :retain-focus="false"
            v-model="CoreSrv.dialog.forgetPassword"
            max-width="600px"
            class="white"
        >
            <base-card class="pa-5 py-8">
                <base-form @submit="ResetPassword" ref="baseform">
                    <div class="d-flex justify-space-between pr-4 py-0">
                        <v-card-title class="py-0">
                            <span class="text-h5 font-weight-bold primary--text"
                                >Forgot Password
                            </span>
                        </v-card-title>

                        <div @click="CoreSrv.dialog.forgetPassword = false">
                            <v-icon v-ripple="true">
                                mdi-close-circle-outline
                            </v-icon>
                        </div>
                    </div>
                    <div>
                        <v-card-subtitle
                            >Enter your email address to reset your password
                        </v-card-subtitle>
                    </div>
                    <div class="px-4">
                        <base-text-field
                            dense
                            label="Email"
                            name="Email"
                            rules="required|email"
                            :value.sync="resetPassword.Email"
                        />
                    </div>
                    <div class="d-flex justify-end pr-4">
                        <div class="d-flex align-center">
                            <base-btn type="submit">Confirm</base-btn>
                        </div>
                    </div>
                </base-form>
            </base-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" src="./forgot-Password.component.ts" />

<style lang="scss" scoped>
.max-width-500 {
    max-width: 500px;
}
</style>
