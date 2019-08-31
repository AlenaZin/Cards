import Card from './Card';

// Класс должен уметь: хранить массив каточек (Card), добавлять каточку, удалять карточку, отрисовывать все карточки
export default class CardList {
    constructor(placesList, api, imagePopup, myUserId) {
        this.api = api;
        this.cards = [];
        this.placesList = placesList;
        this.imagePopup = imagePopup;
        this.myUserId = myUserId;
        this.initEvents();
        this.loadCards();
    }

    loadCards() {
        this.api.getCards()
            .then((cardObjects) => {
                if (cardObjects.length > 0) {
                    for (let i = 0; i < cardObjects.length; i++) {
                        const cardObject = cardObjects[i];
                        const card = new Card(cardObject._id, cardObject.likes, cardObject.name, cardObject.link, cardObject.owner);
                        this.cards.push(card);
                    }
                    this.renderCards();
                }
            })
            .catch((err) => {
                throw err;
            });
    }
          /**
            * Надо исправить // Исправлено
            * Карточки выводим только при наличии данных в loadCards и успешности запроса в addCard
            * чтобы избежать ошибок и отрисовки элементов при отсутствии соединения с сервером
            */    
    addCard(card) {
        this.api.addCard(card.toArray()) 
            .then((responseCard) => {
                card.id = responseCard._id;
                this.cards.push(card);
                const htmlCard = card.create(true);
                this.placesList.insertAdjacentHTML('beforeend', htmlCard);
            })
            .catch((err) => {
                throw err;
            });
    }


    initEvents() {
        const self = this;

        this.placesList.addEventListener('click', function (e) {
            e.stopPropagation();
            // клик по сердечку
            if (e.target.classList.contains('place-card__like-icon')) {
                e.target.classList.toggle('place-card__like-icon_liked');
                const card = self.findCardByEvent(e);
                card.toggleLike();
            }
           // удаление карточки 
           if (e.target.classList.contains('place-card__delete-icon')) {
            const card = self.findCardByEvent(e);

            if (window.confirm("Вы действительно хотите удалить эту карточку?")) { 
                self.api.deleteCard(card.id) 
                .then((data) => {
                    console.log('deleteCard: ', data);
                    e.target.closest('.place-card').remove();
                    self.cards = self.cards.filter(c => c.id !== card.id);
                })
                .catch((err) => {
                    throw err;
                });
              }

        }
            // открытие картинки 
            if (e.target.classList.contains('place-card__image')) {
                const card = self.findCardByEvent(e);
                self.imagePopup.domPopup.querySelector('img.popup__picture').src = card.link;
                self.imagePopup.open();
            }
        });
    }

    // Функция находит карточку по id
    findCardByEvent(e) {
        const card = e.target.closest('.place-card');
        const id = card.dataset.id;
        return this.cards.find(card => card.id === id);
    }

    createCard(cardName, cardLink) {
        const card = new Card(null, [], cardName, cardLink);
        this.addCard(card);
    }

    // Функция должна отрисовать все карточки (this.cards) в контейнере DOM (this.placesList)
    renderCards() {
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            // находим, есть ли среди лайков карточки наш пользователь (лайк)
            let liked = false;
            for (let j = 0; j < card.likes; j++) {
                const user = card.likes[j];
                if (user._id === this.myUserId) {
                    liked = true;
                    break;
                }
            }
            // не красиво делать сравнение так как здесь сделано
            const htmlCard = card.create(card.owner._id === this.myUserId, liked);
            this.placesList.insertAdjacentHTML('beforeend', htmlCard);
        }
    }
}
