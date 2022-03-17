import { ServiceClass } from '@/decorators';
import Swal from 'sweetalert2';

@ServiceClass()
export class AlertService {
    public show(
        type: 'success' | 'warning' | 'error' | 'info' | 'question',
        message: string,
        position?: 'top' | 'center' | 'bottom',
        timer?: number
    ) {
        return Swal.fire({
            icon: type,
            html: message,
            position: position ?? 'center',
            timer
        });
    }
}
