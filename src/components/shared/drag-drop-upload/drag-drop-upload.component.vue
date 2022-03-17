<template>
    <validation-provider :rules="rules" v-slot="{errors, validate}">
        <div class="dropzone-container round-5 height-100x" style="border-style: dashed;" :style="`border-color: ${errors.length ? 'red' : PrimaryColor}`">
            <div class="dropzone-overlay">
                <vue-dropzone
                    ref="dragDropUploadRef"
                    id="dropzone"
                    :acceptedMimeTypes="acceptedFiles"
                    :options="dropzoneOptions"
                    :duplicateCheck="true"
                    class="height-100x dropzone-one-line"
                    :use-custom-slot="true"
                    @vdropzone-file-added="
                        addFile($event);
                        validate($event);
                    "
                    @vdropzone-removed-file="
                        removeFile($event);
                        validate(null);
                    "
                    @vdropzone-mounted="validate(null)"
                >
                    <div class="dropzone-custom-content">
                        <h3 class="title dropzone-custom-title ma-0" :class="`${errors.length ? 'error--text' : 'primary--text'}`">
                            <span class="font-weight-bold">Browse&nbsp;</span>
                            <span class="font-weight-light">or drop <slot /></span>
                        </h3>
                    </div>
                </vue-dropzone>
            </div>
        </div>
        <div class="v-messages error--text pt-1" v-for="error in errors" :key="error">
            {{ error }}
        </div>
    </validation-provider>
</template>

<script lang="ts" src="./drag-drop-upload.component.ts" />

<style lang="scss">
.dropzone-container {
    display: block;
    padding: 5px;
    position: relative;
}
.dropzone-overlay {
    display: block;
    overflow-y: hidden;
}
.dropzone-one-line {
    display: flex;
    flex-flow: row nowrap;
    // justify-content: center;
    border: 0;
    padding-bottom: 30px;
}
.dropzone-one-line::before,
.dropzone-one-line::after {
    content: '';
    margin: auto;
}
.dropzone.dz-started .dropzone-one-line {
    justify-content: start;
}
.dz-message {
    margin-top: 2.4em !important;
}
.dropzone.dz-started .dz-message {
    display: inline-block;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 !important;
}

.dz-preview {
    margin: 0 !important;
    margin-right: 5px !important;
    margin-bottom: 5px !important;
    z-index: 2 !important;
    .dz-image {
        display: flex !important;
        justify-content: center;
        z-index: 1 !important;
    }
    .dz-progress {
        opacity: 0 !important;
    }
    .dz-remove {
        border-radius: 5px;
        right: 10px;
        opacity: 1 !important;
        &:hover {
            text-decoration: none !important;
        }
    }
    .dz-error-message {
        opacity: 1 !important;
        top: 40% !important;
        border-radius: 0 !important;
        padding: 0 5px;
    }
    .dz-details {
        z-index: 2 !important;
        .dz-size {
            margin-bottom: 5px !important;
        }
    }
}
</style>
