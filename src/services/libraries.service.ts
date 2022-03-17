import {ServiceClass} from '@/decorators';
import {BehaviorSubject} from 'rxjs';

@ServiceClass()
export class LibrariesService {
    public ApiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
    public mapSearch = new BehaviorSubject<boolean>(false)

    public GoogleMapsLibraryLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {}

    loadGoogleMapsLibrary() {
        if (!this.GoogleMapsLibraryLoaded$.value) {
            const script = document.createElement('script');
            script.id = 'google-maps-library';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${this.ApiKey}&libraries=places`;
            script.onload = e => {
                this.GoogleMapsLibraryLoaded$.next(true);
            };
            document.getElementsByTagName('head')[0].appendChild(script);

           
        }
    }
}
