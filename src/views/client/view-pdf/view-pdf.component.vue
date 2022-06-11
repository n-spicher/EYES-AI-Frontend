<template>
    <div>
        <component :is="`style`"> .textLayer .highlight { background-color: yellow !important; } </component>
        <v-row no-gutters class="min-height-100x mt-2 grey lighten-5 py-5">
            <v-col cols="2" class="thumbnails-container" ref="thumbnailsContainer"> </v-col>
            <v-col cols="7" class="pdf-container" id="pdf-container" ref="pdfViewer">
                <div class="pdf-controls">
                    <!-- <div
                        class="colors-container"
                        :class="{
                            'd-none': !pdfloaded
                        }"
                    >
                        <base-btn icon class="green-color pa-0 mr-2" @click="color = 'green'" width="23px" height="23px">

                        </base-btn>
                        <base-btn icon class="red-color pa-0" @click="color = 'rgba(255,0,0,1)'" width="23px" height="23px">

                        </base-btn>
                    </div> -->

                    <div
                        class="download-btn"
                        :class="{
                            'd-none': !pdfloaded
                        }"
                    >
                        <base-btn icon title="Downlaod" @click="download">
                            <v-icon>mdi-file-download-outline</v-icon>
                        </base-btn>
                    </div>
                </div>

                <div class="pdf-pages" id="pdf-pages" ref="pdfPages"></div>

                <div
                    class="zoom-container"
                    :class="{
                        'd-none': !pdfloaded
                    }"
                >
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
                <!-- <div>
                    <pre>{{ pdfProcessorSrv.categoryPages }}</pre>
                </div> -->
                <div v-if="pdfloaded">
                    <div class="d-flex">
                        <base-text-field class="flex-grow-1 mr-2" label="Search" :value.sync="query" />
                        <base-btn class="px-3" @click="search">
                            <v-icon>mdi-magnify</v-icon>
                        </base-btn>
                    </div>
                    <div class="d-flex flex-column mb-3">
                        <!-- <v-list>

                            <v-list-item-group v-model="pdfProcessorSrv.selectedCategoryId" color="primary" @change="onCategoryClick()">
                                <v-list-item v-for="(item, i) in pdfProcessorSrv.categories" :key="i" :value="item.Id">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.Name"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list> -->

                        <base-autocomplete
                            :items="pdfProcessorSrv.categories"
                            :item-text="'Name'"
                            :item-value="'Id'"
                            label="Equipment"
                            :hide-details="true"
                            :value.sync="pdfProcessorSrv.selectedCategoryId"
                            @change="onCategoryClick"
                        >
                            <template v-slot:item="data">
                                <!-- <template v-if="typeof data.item !== 'object'">
                                    <v-list-item-content v-text="data.item"></v-list-item-content>
                                </template> -->
                                <template>
                                    <v-list-item-content>
                                        <v-list-item-title v-html="data.item.Name"></v-list-item-title>
                                        <!-- <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle> -->
                                    </v-list-item-content>
                                </template>
                            </template>
                        </base-autocomplete>
                    </div>
                    <!-- {{ pdfProcessorSrv.search }} -->
                    <!-- <div>
                        <base-btn @click="download">
                            Download
                        </base-btn>
                    </div> -->

                    <div>
                        <h3>
                            Equipment Keywords:
                        </h3>
                    </div>

                    <v-list>
                        <!-- <v-subheader color="primary">{{ category.Name }} Keywords:</v-subheader> -->

                        <template v-for="category in pdfProcessorSrv.selectedCategories">
                            <v-list-group v-if="category.Id != -1" :key="category.Id" v-model="category.active" two-line>
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="`${category.Name} Keywords:`"></v-list-item-title>
                                        <!-- <v-list-item-subtitle v-text="item.Note">/</v-list-item-subtitle> -->
                                    </v-list-item-content>
                                </template>

                                <div class="pa-5 blue lighten-5 ">
                                    <!-- <div class="d-flex">
                                        <label for="">Keywords of ({{ category.Name }}):</label>
                                    </div> -->
                                    <div class="px-3 grey--text mb-2" v-for="item in category.CategoryItems" :key="item.Id">
                                        <div><label class="black--text">Keyword:</label> {{ item.Name }}</div>
                                        <div><label class="black--text">Note:</label> {{ item.Note }}</div>
                                        <!-- <div>
                                            <label class="black--text">Synonyms:</label>
                                            <span v-for="syn of item.CategoryItemSynonyms" :key="syn.Id">
                                                {{ syn.Name }}
                                            </span>
                                        </div> -->
                                    </div>
                                </div>

                                <!-- <v-list-item v-for="child in item.items" :key="child.Name">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="child.title"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item> -->
                            </v-list-group>
                        </template>
                    </v-list>

                    <!-- <div v-for="category in pdfProcessorSrv.selectedCategories" :key="category.Id"> -->

                    <!-- <div v-if="category.Id !== 0">
                            <div class="font-weight-bold">{{ category.Name }} Keywords:</div>
                            <span v-for="item in category.CategoryItems" :key="item.Id">
                                <v-tooltip top max-width="500">
                                    <template v-slot:activator="{on, attrs}">

                                        <v-chip class="ma-2" v-bind="attrs" v-on="on">
                                            {{ item.Name }}
                                        </v-chip>
                                    </template>
                                    <span>{{ item.Note }}</span>
                                </v-tooltip>
                            </span>
                        </div> -->

                    <!-- <div class="d-flex " v-if="pdfProcessorSrv.selectedCategoryId !== 0">
                            <base-text-field
                                :value.sync="pdfProcessorSrv.searchValue"
                                :label="`Add Keyword To '${pdfProcessorSrv.selectedCategories.length > 0 ? pdfProcessorSrv.selectedCategories[0].Name : ''}'`"
                                :disabled="!(pdfProcessorSrv.selectedCategories.length > 0)"
                                class="mr-2 flex-1"
                            />
                            <base-btn class="primary white--text" :disabled="!(pdfProcessorSrv.selectedCategories.length > 0)" @click="AddItem">
                                Add
                            </base-btn>
                        </div> -->
                    <!-- </div> -->
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

.download-btn {
    position: relative;
    // position: sticky;

    // top: 1px;
    // left: 100%;
}
.colors-container {
    position: relative;
    // left: 10px;
    // top: 1px;
}
.colors-container .color-box {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
}
.colors-container .green-color {
    background-color: green;
}
.colors-container .red-color {
    background-color: red;
}

.pdf-controls {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: flex-end;
}
</style>
