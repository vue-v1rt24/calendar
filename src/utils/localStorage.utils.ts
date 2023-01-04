export class LocalStorageUtils {
    static setLocal(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static getLocal(key: string) {
        return JSON.parse(localStorage.getItem(key)!);
    }
}