import {ServiceClass} from '@/decorators';
import {Subject} from 'rxjs';

@ServiceClass()
export class AppBarService {
    public submitBtn: Subject<boolean> = new Subject<boolean>();
}
