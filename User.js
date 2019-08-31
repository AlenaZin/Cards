'use strict';

class User {
    constructor(id, name, about, avatar) {
        this.id = id || null;
        this.name = name || null;
        this.about = about || null;
        this.avatar = avatar || null;
    }

    create() {
        return `
            <h1 class="user-info__name">${this.name}</h1>
            <p class="user-info__job">${this.about}</p>
        `;
    }
}
