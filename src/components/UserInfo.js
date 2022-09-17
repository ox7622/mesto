export default class UserInfo {
    constructor(nameSelector, roleSelector, avatar) {
        this._name = document.querySelector(nameSelector);
        this._role = document.querySelector(roleSelector);
        this._avatar = document.querySelector(avatar);
    }
   
    
    getUserInfo() {
        return { name: this._name.textContent, role: this._role.textContent };
    }

    
    setUserInfo({ name, role, avatarLink }) {
        this._name.textContent = name;
        this._role.textContent = role;
        this._avatar.style.backgroundImage = `url(${avatarLink})`;
    }
}