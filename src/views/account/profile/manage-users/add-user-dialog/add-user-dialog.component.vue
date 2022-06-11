<template>
    <base-dialog persistent :retain-focus="false" :name="name" max-width="800px">
        <template #header> Add New User </template>

        <v-row no-gutters>
            <base-form ref="baseform">
                <v-row dense justify="center" :no-gutters="$vuetify.breakpoint.xsOnly">
                    <v-col cols="12" md="6">
                        <base-text-field dense rules="required" class="rounded-l" label="First Name" name="FirstName" :value.sync="Signup.FirstName" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <base-text-field dense rules="required" class="rounded-l" label="Last Name" name="LastName" :value.sync="Signup.LastName" />
                    </v-col>
                    <v-col cols="12">
                        <base-text-field
                            dense
                            rules="required|email"
                            class="rounded-l"
                            label="Email Address"
                            name="SignUpEmailAddress"
                            :value.sync="Signup.Email"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <base-text-field
                            dense
                            rules="required|min:8|max:36|password"
                            :type="showPassword.pass ? 'text' : 'password'"
                            :append-icon="showPassword.pass ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword.pass = !showPassword.pass"
                            vid="Password"
                            outlined
                            label="Password"
                            name="SignUpPassword"
                            :value.sync="Signup.Password"
                        />
                    </v-col>
                    <v-col cols="12" md="6">
                        <base-text-field
                            dense
                            outlined
                            :type="showPassword.confirmPass ? 'text' : 'password'"
                            label="Confirm Password"
                            name="ConfirmPassword"
                            :value.sync="Signup.ConfirmPassword"
                            rules="required|confirmed:Password"
                            :append-icon="showPassword.confirmPass ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword.confirmPass = !showPassword.confirmPass"
                        />
                    </v-col>
                    <!-- <v-col cols="12">
                            <base-text-field
                                rules="required|mask:###-###-####"
                                label="Phone No"
                                mask="###-###-####"
                                name="PhoneNo"
                                :value.sync="Signup.PhoneNumber"
                            />
                        </v-col> -->

                    <v-col cols="12">
                        <p class="text-body-2 grey--text ">
                            By signing up you agree to our terms & conditions.
                        </p>
                    </v-col>
                </v-row>
                <!-- <v-row no-gutters class="pt-7">
                        <v-col cols="12" md="6" sm="6">
                            <base-btn class=" primary text-h6 " :disabled="invalid" :class="{'px-12': !notShowable}" type="submit">
                                <h5>
                                    Sign up
                                </h5>
                            </base-btn>
                        </v-col>
                    </v-row> -->
            </base-form>
        </v-row>

        <template #dialogFooter>
            <!-- <div class="d-flex justify-end "> -->
            <base-btn class="mr-auto error" @click="cancel">
                Cancel
            </base-btn>
            <base-btn @click="SignUp">
                Save
            </base-btn>
            <!-- </div> -->
        </template>
    </base-dialog>
</template>

<script lang="ts" src="./add-user-dialog.component.ts" />
