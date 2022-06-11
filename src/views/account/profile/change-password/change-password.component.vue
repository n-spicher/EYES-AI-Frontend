<template>
    <base-title-box class="pa-3" title=" Set Password">
        <template>
            <base-form @submit="ChangePassword" #default="{invalid}" ref="baseform" class="pa-3 pt-4">
                <v-row dense justify="center">
                    <v-col cols="12" md="6">
                        <base-text-field
                            label="Old Password"
                            name="OldPassword"
                            rules="required|password"
                            :type="showPassword.old ? 'text' : 'password'"
                            :value.sync="changePassword.OldPassword"
                            :append-icon="showPassword.old ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword.old = !showPassword.old"
                        />
                        <!-- :value.sync="changePassword.OldPassword" -->
                    </v-col>
                </v-row>
                <v-row dense justify="center">
                    <v-col cols="12" md="6">
                        <base-text-field
                            label="New Password"
                            name="NewPassword"
                            rules="required|min:8|max:36|password"
                            :type="showPassword.new ? 'text' : 'password'"
                            vid="Password"
                            :value.sync="changePassword.NewPassword"
                            :append-icon="showPassword.new ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword.new = !showPassword.new"
                        />
                    </v-col>
                </v-row>
                <v-row dense justify="center">
                    <v-col cols="12" md="6">
                        <base-text-field
                            label="Confirm Password"
                            name="ConfirmPassword"
                            :type="showPassword.confirmNew ? 'text' : 'password'"
                            :value.sync="changePassword.ConfirmPassword"
                            rules="required|confirmed:Password"
                            :append-icon="showPassword.confirmNew ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword.confirmNew = !showPassword.confirmNew"
                        />
                    </v-col>
                </v-row>

                <v-row dense justify="center">
                    <v-col cols="6">
                        <div class="d-flex justify-end">
                            <base-btn type="submit" :disabled="invalid">
                                Set Password
                            </base-btn>
                        </div>
                    </v-col>
                </v-row>
            </base-form>
        </template>
    </base-title-box>
</template>

<script lang="ts" src="./change-password.component.ts" />
