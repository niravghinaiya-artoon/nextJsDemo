import { Cookies } from 'components/lib/npm'

const cookies = new Cookies();

class BrowserStorageService {

    getCookie = (key) => {
        const data = cookies.get(key);
        return data;
    };

    setCookie = (key, data, expiry) => {
        if (key && data) {
            cookies.set(key, data, { path: '/', expires: expiry ?? expireTime() });
        }
    };

    // ! ----------⬇ sessionStorage Section ⬇----------

    setSession(key, value) {
        const data = value === undefined ? "" : value;
        window?.sessionStorage.setItem(key, data);
    }

    getSession(key) {
        const data = window?.sessionStorage.getItem(key);
        if (data) {
            return data
        } else {
            return null;
        }
    }

}
export default new BrowserStorageService();