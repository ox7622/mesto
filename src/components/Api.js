export default class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers
    }

    getCardsInfo() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Что-то пошло не так: ${res.status}`);
                }
            })
            .catch((err) => console.log("запрос не выполнен: " + err))
    }

    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Что-то пошло не так: ${res.status}`);
                }
            })
            .catch(err => console.log("запрос не выполнен: " + err))
    }


    editProfileInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Что-то пошло не так: ${res.status}`);
                }
            })
            .catch(err => console.log("запрос edit profile не выполнен: " + err))
    }

    sendCardData(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Что-то пошло не так: ${res.status}`);
                }
            })
            .catch(err => console.log("запрос send card не выполнен: " + err))
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Что-то пошло не так: ${res.status}`);
                }
            })
            .catch(err => console.log("запрос на удаление карточки не выполнен: " + err))
    }


    setLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Что-то пошло не так: ${res.status}`);
                }
            })
            .catch(err => console.log("запрос send like не выполнен: " + err))
    }

    removeLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Что-то пошло не так: ${res.status}`);
                }
            })
            .catch(err => console.log("запрос на удаление лайка не выполнен: " + err))
    }

    changeAvatar(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(link)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Что-то пошло не так: ${res.status}`);
                }
            })
            .catch(err => console.log("запрос edit avatar не выполнен: " + err))
    }

}
