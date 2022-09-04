export default class UserInfo {
    constructor(nameSelector, roleSelector) {
        this._name = document.querySelector(nameSelector);
        this._role = document.querySelector(roleSelector);
    }
   
    getUserInfo() {
        return { name: this._name.textContent, role: this._role.textContent };
    }

    setUserInfo({name,role}) {
        this._name.textContent = name;
        this._role.textContent = role;
    }
}