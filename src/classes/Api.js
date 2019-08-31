export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl || '';
        this.headers = options.headers || [];
    }

    getProfile() {
        return this.getServerPromise('/users/me');
    }

    getCards() {
        return this.getServerPromise('/cards');
    }

    getServerPromise(path) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}${path}`, { headers: this.headers })
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        throw new Error('Response is not OK');
                    }
                     /**
                     * Надо исправить // Исправлено
                     * 
                     * Промис не может быть resolved при отсутствии данных
                     * 
                     * Следует или проверять что result не пустой или ставить resolve внутри проверки
                     * на response.ok и передавать response.json() в resolve
                     * 
                     * это поможет избежать ошибок в консоли, 
                     * если сервер не доступен или карточки не добавлены. 
                     * 
                     * 
                     */
                })
                .catch((err) => {
                    reject(err);
                });
       });
    }

    editProfile(name, about) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/users/me`, {
                 method: 'PATCH',
                 headers: this.headers,
                 body: JSON.stringify({ name, about })
            })
            .then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    throw new Error('Response is not OK');
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    addCard(card) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/cards`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(card)
            })
            .then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    throw new Error('Response is not OK');
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    deleteCard(cardId) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this.headers,
            })
            .then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    throw new Error('Response is not OK');
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
