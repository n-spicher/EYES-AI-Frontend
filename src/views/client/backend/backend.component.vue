<template>
    <div class="pa-5">
        <base-card>
            <template v-slot:header>
                <div class="d-flex">
                    <v-toolbar-title>Equipments</v-toolbar-title>
                    <!-- <div class="ml-auto">
                        <input
                            class="file-input"
                            type="file"
                            name="file"
                            ref="fileInputElem"
                            @change="onUploadFiles"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        />
                        <base-btn @click="selectFileClick()">
                            Select File
                        </base-btn>
                    </div> -->
                    <div class="ml-auto">
                        <base-btn @click="AddEquipmentClick()">
                            <v-icon>mdi-plus</v-icon>
                            Add Equipment
                        </base-btn>
                    </div>
                </div>
            </template>

            <!-- <pre>{{ pdfSrv.categories }}</pre> -->

            <div class="px-5">
                <div class="d-flex">
                    <h3 class="mr-5">Showing Equipments:</h3>
                    <div class="d-inline-block">
                        <base-select
                            label="Select an Equipment"
                            :items="pdfSrv.categories"
                            :item-text="'Name'"
                            :item-value="'Id'"
                            :value.sync="seletedEquipmentId"
                        >
                        </base-select>
                    </div>
                </div>

                <template v-for="category of equipments">
                    <v-list v-if="category.Id !== -1" :key="category.Id + 'c'">
                        <v-list-group v-model="category.active">
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <h3>{{ category.Name }} Keywords:</h3>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <div class="d-flex">
                                        <v-btn class="mr-5" @click="EditEquipment(category)" icon title="Edit Equipment">
                                            <v-icon color="primary">mdi-pencil</v-icon>
                                        </v-btn>

                                        <v-btn class="mr-5" @click="DeleteCategory(category)" icon title="Delete Equipment">
                                            <v-icon color="red lighten-1">mdi-delete</v-icon>
                                        </v-btn>

                                        <base-btn @click="AddKeywordClick(category)">
                                            <v-icon>mdi-plus</v-icon>
                                            Add Keyword
                                        </base-btn>
                                    </div>
                                </v-list-item-action>
                            </template>

                            <div class="px-5 blue-grey lighten-5 py-5">
                                <div>
                                    <div class="d-flex">
                                        <h3 class="mr-3">{{ category.Name }} Codes:</h3>

                                        <v-tooltip top max-width="500">
                                            <template v-slot:activator="{on, attrs}">
                                                <base-btn small icon outlined v-bind="attrs" v-on="on" @click="AddCodeClick(category)">
                                                    <v-icon>mdi-plus</v-icon>
                                                </base-btn>
                                            </template>
                                            <span>Add Code for {{ category.Name }}</span>
                                        </v-tooltip>
                                    </div>
                                    <div class="mb-3">
                                        <span v-for="code in category.CategoryCodes" :key="code.Id">
                                            <v-chip class="ma-2" close @click:close="DeleteCategoryCode(code)">
                                                {{ code.Code }}
                                            </v-chip>
                                        </span>
                                    </div>
                                </div>

                                <v-list class="ml-7" :key="category.Id" v-if="category.Id !== -1">
                                    <!-- <v-subheader color="primary">{{ category.Name }} Keywords:</v-subheader> -->

                                    <template v-for="(item, index) in category.CategoryItems">
                                        <v-list-group :key="item.Id" v-model="item.active" two-line>
                                            <template v-slot:activator>
                                                <v-list-item-content>
                                                    <v-list-item-title v-text="item.Name"></v-list-item-title>
                                                    <v-list-item-subtitle v-text="item.Note">/</v-list-item-subtitle>
                                                </v-list-item-content>

                                                <v-list-item-action class="flex-row">
                                                    <v-btn @click="EditCategoryItemClick(category, item)" icon>
                                                        <v-icon color="primary">mdi-pencil</v-icon>
                                                    </v-btn>
                                                </v-list-item-action>
                                                <v-list-item-action class="flex-row">
                                                    <v-btn @click="DeleteCategoryItem(item)" icon>
                                                        <v-icon color="red lighten-1">mdi-delete</v-icon>
                                                    </v-btn>
                                                </v-list-item-action>
                                            </template>

                                            <div class="pl-5 pb-2 pt-0 blue-grey lighten-5">
                                                <div class="pa-2 white">
                                                    <div class="d-flex">
                                                        <label for="">Synonyms of ({{ item.Name }})</label>
                                                        <base-btn class="ml-auto" @click="AddSynonymClick(item)">
                                                            <v-icon>mdi-plus</v-icon>
                                                            Add Synonym
                                                        </base-btn>
                                                    </div>
                                                    <span v-for="syn in item.CategoryItemSynonyms" :key="syn.Id">
                                                        <v-chip class="ma-2" close @click:close="DeleteCategoryItemSynonym(syn)">
                                                            {{ syn.Name }}
                                                        </v-chip>
                                                    </span>
                                                </div>
                                            </div>

                                            <!-- <v-list-item v-for="child in item.items" :key="child.Name">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="child.title"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item> -->
                                        </v-list-group>
                                        <v-divider v-if="index < category.CategoryItems.length - 1" :key="item.Id + '-divider'"></v-divider>
                                    </template>
                                </v-list>
                            </div>
                        </v-list-group>
                    </v-list>
                </template>
            </div>
        </base-card>

        <add-keyword-dialog-component ref="addKeyworddDialog" :category="selectedCategory" :CategoryItem="selectedCategoryItem" @save="SaveCategoryItem" />
        <add-code-dialog-component ref="addCodeDialog" :category="selectedCategory" @save="SaveCategoryCode" />
        <add-equipment-dialog-component ref="addEquipmentDialog" :category="selectedCategory" @save="SaveEquipment" />
        <add-synonym-dialog-component ref="addSynonymDialog" :category="selectedCategoryItem" @save="SaveSynonyms" />
    </div>
</template>

<script lang="ts" src="./backend.component.ts" />

<style lang="scss" scoped>
.file-input {
    height: 1px;
    width: 1px;
}
</style>
