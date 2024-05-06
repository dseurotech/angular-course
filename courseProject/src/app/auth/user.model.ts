export class User {
    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            this._tokenExpirationDate = null;
            return null;
        }
        return this._token;
    }
    get tokenValidForMillis(): number {
        return this._tokenExpirationDate.getTime() - new Date().getTime();
    }
}