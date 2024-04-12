"use client"

import { toast } from 'components/lib/npm';

class NotificationService {

    showSuccessMessage(titleOrMessage) {
        toast.success(titleOrMessage)
    }

    showErrorMessage(titleOrMessage) {
        toast.error(titleOrMessage)
    }


}

export default new NotificationService();