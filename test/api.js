class Api {
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
                        return response.json();
                    }
                })
                .then((result) => {
                    resolve(result);
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
                    return response.json();
                }
            })
            .then((result) => {
                resolve(result);
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
                    return response.json();
                }
            })
            .then((result) => {
                resolve(result);
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
                    return response.json();
                }
            })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}

const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort1',
    headers: {
      authorization: '60f28af5-fb65-4707-b683-9c36600510df',
      'Content-Type': 'application/json'
    }
  });

api.getProfile()
    .then((data) => {
        console.log('getProfile: ', data);
    })
    .catch((err) => {
        console.log(err);
    });

api.getCards()
.then((cards) => {
    console.log('getCards: ', cards);
})
.catch((err) => {
    console.log(err);
});

api.editProfile('David Beckhamm', 'Football player')
.then((data) => {
    console.log('editProfile: ', data);
})
.catch((err) => {
    console.log(err);
});

const card = {
    name: 'Озеро Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}

api.addCard(card) 
.then((data) => {
    console.log('addCard: ', data);
})
.catch((err) => {
    console.log(err);
});

api.deleteCard("5d1f0611d321eb4bdcd707dd") 
.then((data) => {
    console.log('deleteCard: ', data);
})
.catch((err) => {
    console.log(err);
});