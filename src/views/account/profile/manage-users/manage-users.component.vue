<template>
    <div>
        <div class="d-flex justify-end px-5">
            <base-btn @click="addUser">
                Add New User
            </base-btn>
        </div>
        <div>
            <listing-wrapper-component
                class="px-0 font-weight-bold"
                icon="mdi-shield-account-outline"
                :headers="[
                    {text: 'First Name', value: 'FirstName'},
                    {text: 'Last Name', value: 'LastName'},
                    {text: 'Email', value: 'Email'},
                    {text: 'Role', value: 'Role'},
                    {text: 'Actions', value: 'actions', sortable: false, width: '100px'}
                ]"
                :NoDropdown="true"
                :HideSearch="true"
                :options="{}"
                :data="users"
                :ServerItems="users.length"
                :page="1"
            >
                <template v-slot:[`item.actions`]="{item}">
                    <base-menu
                        left
                        icon="mdi-dots-horizontal"
                        color="white"
                        :btn="{
                            elevation: 20,
                            'min-width': '30'
                        }"
                        font-weight-bold
                    >
                        <v-list dense nav>
                            <v-list-item link @click="ChangeRole(item)">
                                <v-list-item-icon class="mr-3">
                                    <v-icon color="primary">mdi-pencil</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Change Role</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </base-menu>
                </template>
            </listing-wrapper-component>

            <change-role-dialog-component :user="selectedUser" @save="saveRole" ref="changeRoleDialogRef" />
            <add-user-dialog-component @userCreated="loadAgain" />
        </div>
    </div>
</template>

<script lang="ts" src="./manage-users.component.ts" />
