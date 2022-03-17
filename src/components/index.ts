import Vue from 'vue';
import BaseBtn from './vuetify/Btn/base-btn';
import BaseMenu from './vuetify/Menu/base-menu';
import BaseSwitch from './vuetify/Switch/base-switch';
import BaseSelect from './vuetify/Select/base-select';
import BaseTooltip from './vuetify/Tooltip/base-tooltip';
import BaseFormComponent from './vuetify/Form/base-form';
import BaseTextarea from './vuetify/Textarea/base-textarea';
import BaseCheckbox from './vuetify/Checkbox/base-checkbox';
import BaseCombobox from './vuetify/Combobox/base-combobox';
import BaseTextField from './vuetify/TextField/base-text-field';
import BaseRadioGroup from './vuetify/RadioGroup/base-radio-group';
import BaseAutocomplete from './vuetify/Autocomplete/base-autocomplete';
import BaseCheckboxGroup from './vuetify/CheckboxGroup/base-checkbox-group';
import BaseDatePickerComponent from './vuetify/DatePicker/base-date-picker';
import BaseCard from './vuetify/Card/base-card.component';
import SearchComponent from './shared/search/search.component';
import ListingWrapperComponent from './shared/listing-wrapper/listing-wrapper.component';
import SaveWrapperComponent from './shared/save-wrapper/save-wrapper.component';
import BaseDialog from './vuetify/Dialog/base-dialog';
import BaseBreadcrumbsComponent from './vuetify/BreadCrumbs/base-breadcrumbs';
import PaginationComponent from './shared/pagination/pagination.component';
import FullPageDialogComponent from './vuetify/Full Page Dialog/full-page-dialog.component';
import BaseTitleBoxComponent from './shared/base-title-box/base-title-box.component';
import DragDropUploadComponent from './shared/drag-drop-upload/drag-drop-upload.component';
import TitleBreadCrumbs from './shared/title-bread-crumbs/title-bread-crumbs.component';

import UserListingWrapperComponent from './shared/user-listing-wrapper/user-listing-wrapper.component';
import BaseTitleTextComponent from './shared/base-title-text/base-title-text.component';

import WysiwygEditorComponent from './shared/wysiwyg-editor/wysiwyg-editor.component';

// Vuetify Components
Vue.component('base-text-field', BaseTextField);
Vue.component('base-textarea', BaseTextarea);
Vue.component('base-menu', BaseMenu);
Vue.component('base-btn', BaseBtn);
Vue.component('base-switch', BaseSwitch);
Vue.component('base-checkbox', BaseCheckbox);
Vue.component('base-checkbox-group', BaseCheckboxGroup);
Vue.component('base-radio-group', BaseRadioGroup);
Vue.component('base-select', BaseSelect);
Vue.component('base-autocomplete', BaseAutocomplete);
Vue.component('base-combobox', BaseCombobox);
Vue.component('base-form', BaseFormComponent);
Vue.component('base-date-picker', BaseDatePickerComponent);
Vue.component('base-tooltip', BaseTooltip);
Vue.component('base-card', BaseCard);
Vue.component('base-dialog', BaseDialog);
Vue.component('base-title-text', BaseTitleTextComponent);

// Custom Components
Vue.component('search-component', SearchComponent);
Vue.component('listing-wrapper-component', ListingWrapperComponent);
Vue.component('user-listing-wrapper-component', UserListingWrapperComponent);
Vue.component('save-wrapper-component', SaveWrapperComponent);
Vue.component('pagination-component', PaginationComponent);
Vue.component('base-breadcrumbs-component', BaseBreadcrumbsComponent);
Vue.component('full-page-dialog', FullPageDialogComponent);
Vue.component('base-title-box', BaseTitleBoxComponent);
Vue.component('drag-drop-upload-component', DragDropUploadComponent);
Vue.component('title-bread-crumbs', TitleBreadCrumbs);

Vue.component('wysiwyg-editor-component', WysiwygEditorComponent);
