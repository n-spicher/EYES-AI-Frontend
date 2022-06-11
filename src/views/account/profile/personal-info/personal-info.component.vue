<template>
    <base-title-box title="Personal Information">
        <template>
            <base-form @submit="Update" #default="{invalid}" class="pa-3 pt-7">
                <v-row class="mt-8">
                    <v-col cols="12" md="6" class="py-0">
                        <base-text-field rules="required|alphabetic:First Name" label="First Name" name="FirstName" :value.sync="User.FirstName" />
                    </v-col>
                    <v-col cols="12" md="6" class="py-0">
                        <base-text-field rules="required|alphabetic:Last Name" label="Last Name" name="LastName" :value.sync="User.LastName" />
                    </v-col>

                    <v-col cols="12" md="6" class="py-0">
                        <base-text-field rules="required" label="Email" name="Email" type="email" readonly :value.sync="User.Email" />
                    </v-col>
                </v-row>
                <div class="d-md-flex justify-end align-center">
                    <base-btn class="primary" elevation="2" type="submit" :disabled="invalid">Update Profile</base-btn>
                </div>
            </base-form>
        </template>
    </base-title-box>
</template>

<script lang="ts" src="./personal-info.component.ts" />
