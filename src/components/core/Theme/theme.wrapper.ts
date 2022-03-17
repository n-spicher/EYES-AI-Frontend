import { Vue } from 'vue-property-decorator';

/**
 * Super class in the application with extends Vue.
 * ### All theme settings must be done here.
 */
export default abstract class ThemeWrapper extends Vue {
  // Getter and Setters
  get IsDarkTheme() {
    return this.$vuetify.theme.dark;
  }
  set IsDarkTheme(value: boolean) {
    this.$vuetify.theme.dark = value;
  }
  get PrimaryColor() {
    return this.$vuetify.theme.currentTheme.primary?.toString();
  }

  // Methods
  public getBaseThemeColor(theme?: { light?: string; dark?: string }) {
    let light = 'white';
    let dark = '#212121';
    if (theme) {
      light = !!theme.light ? theme.light : light;
      dark = !!theme.dark ? theme.dark : dark;
    }
    return this.IsDarkTheme ? dark : light;
  }
}
