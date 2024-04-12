import { axios } from 'components/lib/npm';
import keys from 'config/keys';
import notificationService from 'services/shared/notification.service';

// const API_URL = process.env.NEXT_APP_END_POINT;

const API_URL = keys.app.apiURL;

const axiosClient = axios.create({
    baseURL: API_URL
});

axiosClient.interceptors.request.use(
    async (config) => {

        // const jwtData = BrowserStorageService.getCookie("next-auth.jwt");

        // if (jwtData && Object.keys(jwtData)?.length !== 0) {
        //     config.headers.auth = jwtData?.token;
        //     return config;
        // }

        // const session = await getSession();
        // config.headers.auth = session?.user?.token;

        // const jwtPayload = { token: session?.user?.token }

        // BrowserStorageService.setCookie("next-auth.jwt", jwtPayload);

        return config
    },
    (err) => Promise.reject(err)
)

axiosClient.interceptors.response.use(
    (response) => {

        if (response?.data) {
            response?.data?.notificationFlag && notificationService.showSuccessMessage(response.data.msg || 'Success..!')
        }

        return response;
    },

    async (error) => {

        let errorMessage = "";
        if (error && error.response && error.response.status) {
            errorMessage = error.response.data.msg;
            const status = error.response.status;

            switch (status) {
                case 400:
                    {
                        notificationService.showErrorMessage(errorMessage || 'Error...!');
                        break
                    }

                default:
                    break
            }
        }
        else {
            if (error?.code == "ERR_CANCELED") {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
)

export default axiosClient;