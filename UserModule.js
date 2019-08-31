'use strict';

class UserModule {
    constructor(profilePopup, domContainer, api) {
        this.profilePopup = profilePopup;
        this.formProfile = profilePopup.domPopup.querySelector('form');
        this.errorName = this.formProfile.querySelector('.user__error-name');
        this.errorInfo = this.formProfile.querySelector('.user__error-info');
        this.submitButton = this.formProfile.querySelector('button');

        this.domContainer = domContainer;
        this.api = api;
        this.user = new User();

        this.loadUser();
        this.initEvents();
    }

    initEvents() {
        const self = this;
        this.formProfile.addEventListener('input', (e) => {
            self.validateForm(e);
        });
        this.formProfile.addEventListener('submit', (e) => {
            self.submitForm(e);
        });
    }

    loadUser() {
        this.api.getProfile()
            .then((data) => {
                console.log('getProfile: ', data);
                this.user.id = data._id;
                this.user.name = data.name;
                this.user.about = data.about;
                this.user.avatar = data.avatar;
            })
            .then(() => {
                this.render();
            })
            .then(() => {
                this.setupForm();
                this.validateForm();
            })
            .catch((err) => {
                throw err;
            });
    }

     // Функция сохранения на сервере данных формы
    submitForm(e) {
        e.preventDefault();
        const initialButtonText = this.submitButton.textContent;
        this.submitButton.textContent = 'Загрузка...';

        this.api.editProfile(this.formProfile.elements.profile.value, this.formProfile.elements.info.value)
            .then((data) => {
                this.submitButton.textContent = initialButtonText;
                console.log('editProfile: ', data);
                this.user.name = data.name;
                this.user.about = data.about;
                this.render();
                this.profilePopup.close();
            })
            .catch((err) => {
                this.submitButton.textContent = initialButtonText;
                throw err;
            });
    }

    setupForm() {
        // Изначальное значение форм профиля
        this.formProfile.elements.profile.value = this.user.name;
        this.formProfile.elements.info.value = this.user.about;
    }

    render() {
        this.resetUserHtml();
        this.domContainer.insertAdjacentHTML('beforeend', this.user.create());
    }

    resetUserHtml() {
        while (this.domContainer.firstChild) {
            this.domContainer.removeChild(this.domContainer.firstChild);
        }
    }

    //  Функция валидации формы
    validateForm(e) {
        const profile = this.formProfile.elements.profile.value;
        const info = this.formProfile.elements.info.value;
        let isValid = true;

        this.errorName.textContent = '';
        this.errorInfo.textContent = '';

        // проверяем заполненность поля имя
        if (profile.length === 0) {
            this.errorName.textContent = 'Это обязательное поле';
            isValid = false;
        } else {
            // проверяем длину поля имя (от 2 до 30 включительно)
            if (profile.length < 2 || profile.length > 30) {
                this.errorName.textContent = 'Должно быть от 2 до 30 символов';
                isValid = false;
            }
        }
        // проверяем заполненность поля о себе
        if (info.length === 0) {
            this.errorInfo.textContent = 'Это обязательное поле';
            isValid = false;
        } else {
            // Можно улучшить - else if {}
            // проверяем длину поля о себе (от 2 до 30 включительно)
            if (info.length < 2 || info.length > 30) {
                this.errorInfo.textContent = 'Должно быть от 2 до 30 символов';
                isValid = false;
            }
        }
        // деактивация или активация кнопки отправки формы
        if (isValid === false) {
            this.submitButton.setAttribute('disabled', true);
        } else {
            this.submitButton.removeAttribute('disabled');
        }
    };
}
