export default class UserInfo {
    constructor(nameSelector, roleSelector) {
        this._name = document.querySelector(nameSelector);
        this._role = document.querySelector(roleSelector);
    }
   
    getUserInfo() {
        return { name: this._name.textContent, role: this._role.textContent };
    }

    setUserInfo(data) {
        data = { name: Object.values(data)[0], role: Object.values(data)[1] };
        this._name.textContent = data.name;
        this._role.textContent = data.role;
    }
}