<template>
    <div>
        <v-row no-gutters class="min-height-100x mt-2 grey lighten-5 py-5">
            <v-col cols="2" class="thumbnails-container" ref="thumbnailsContainer"> </v-col>
            <v-col cols="7" class="pdf-container" id="pdf-container" ref="pdfViewer">
                <div class="pdf-pages" id="pdf-pages"></div>

                <div class="zoom-container" v-if="pdfloaded">
                    <div class="zoom-controls">
                        <span class="minus-control" @click="zoomOut">
                            <v-icon>mdi-minus</v-icon>
                        </span>
                        <span class="input-control">
                            <input :value="zoom + '%'" type="text" readonly />
                        </span>
                        <span class="plus-control" @click="zoomIn">
                            <v-icon>mdi-plus</v-icon>
                        </span>
                    </div>
                </div>
                <!-- <canvas ref="pdfCanvas" width="100%"></canvas> -->
            </v-col>
            <v-col cols="3" class="controls-container">
                <div v-if="pdfloaded">
                    <div class="d-flex">
                        <base-text-field class="flex-grow-1 mr-2" label="Search" :value.sync="query" />
                        <base-btn class="px-3" @click="search">
                            <v-icon>mdi-magnify</v-icon>
                        </base-btn>
                    </div>
                    <div class="d-flex flex-column">
                        <v-list>
                            <!-- {{ pdfProcessorSrv.selectedCategoryId }} -->
                            <v-list-item-group v-model="pdfProcessorSrv.selectedCategoryId" color="primary" @change="onCategoryClick()">
                                <v-list-item v-for="(item, i) in pdfProcessorSrv.categories" :key="i" :value="item.Id">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.Name"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </div>
                    <!-- {{ pdfProcessorSrv.search }} -->
                    <div>
                        <base-btn @click="download">
                            Download
                        </base-btn>
                    </div>

                    <div v-for="category in pdfProcessorSrv.selectedCategories" :key="category.Id">
                        <div v-if="category.Id !== 0">
                            <div class="font-weight-bold">{{ category.Name }} Keywords:</div>
                            <span v-for="item in category.CategoryItems" :key="item.Id">
                                <v-chip class="ma-2" close @click:close="DeleteCategoryItem(item)">
                                    {{ item.Name }}
                                </v-chip>
                            </span>
                        </div>

                        <div class="d-flex " v-if="pdfProcessorSrv.selectedCategoryId !== 0">
                            <base-text-field
                                :value.sync="pdfProcessorSrv.searchValue"
                                :label="`Add Keyword To '${pdfProcessorSrv.selectedCategories.length > 0 ? pdfProcessorSrv.selectedCategories[0].Name : ''}'`"
                                :disabled="!(pdfProcessorSrv.selectedCategories.length > 0)"
                                class="mr-2 flex-1"
                            />
                            <base-btn class="primary white--text" :disabled="!(pdfProcessorSrv.selectedCategories.length > 0)" @click="AddItem">
                                Add
                            </base-btn>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>

        <!-- <div ref="downloadable"></div> -->
    </div>
</template>

<script lang="ts" src="./view-pdf.component.ts" />

<style lang="scss" scoped>
.pdf-container {
    height: calc(100vh - 115px);
    overflow-x: auto;
    position: relative;
}
.pdf-print {
    height: auto;
}
.thumbnails-container {
    height: calc(100vh - 115px);
    overflow-x: hidden;
}
.controls-container {
    height: calc(100vh - 115px);
    overflow-x: auto;
    position: relative;
}
</style>

<style lang="scss">
.thumbnails-container a {
    display: block;
    margin-bottom: 5px;
    margin-top: 5px;
}
.thumbnailSelectionRing {
    margin: auto;
}
.thumbnail {
    position: relative;
}
.page-number {
    position: absolute;
    left: 10px;
    top: 5px;
    font-size: 20px;
}

.zoom-container {
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: center;
}
.zoom-controls {
    background-color: rgb(192, 192, 192);
    padding: 3px 3px;
}

.minus-control,
.plus-control {
    width: 25px;
    height: 25px;
    background-color: rgba($color: #222222, $alpha: 1);
    box-shadow: 0 0 5px #fff;
    display: inline-block;
    cursor: pointer;
}

.minus-control i,
.plus-control i {
    color: #fff !important;
}

.input-control input {
    width: 45px;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
}
</style>
