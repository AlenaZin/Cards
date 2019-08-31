// Класс карточки, умеет: конструктором инициализировать свойства, лайкать/дизлайкать карточку
export default class Card {
    constructor(id, likes, name, link, owner) {
        this.id = id || null;
        this.likes = likes || [];
        this.name = name || null;
        this.link = link || null;
        this.owner = owner || null;
    }

    toggleLike() {
        // TODO: реализовать через API
    }
    // Функция создает одну карточку
    create(withDeleteButton, withLike) {
        withDeleteButton = withDeleteButton || false;
        withLike = withLike || false;

        return `
        <div class="place-card" data-id="${this.id}">
            <div class="place-card__image" style="background-image: url(${this.link});">
                ${withDeleteButton ? '<button class="place-card__delete-icon"></button>' : '' }
            </div>
            <div class="place-card__description">
                <h3 class="place-card__name">${this.name}</h3>
                <button class="place-card__like-icon ${ withLike ? 'place-card__like-icon_liked' : '' }"></button>
            </div>
        </div>`;
    }

    toArray() {
        return {
            name: this.name,
            link: this.link,
            id: this.id
        }
    }
}
