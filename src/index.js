import "./style.css";
import logoSvg from './images/logo.svg';
import closeSvg from './images/close.svg';

import Popup from './classes/Popup';
import Api from './classes/Api';
import CardList from './classes/CardList';
import UserModule from './classes/UserModule';
import config from './configs/config';

const placePopup = new Popup(document.getElementById('popup_new-place'), 'user-info__button');
const profilePopup = new Popup(document.getElementById('popup_profile'), 'user-info__button_edit');
const imagePopup = new Popup(document.getElementById('popup_image'), 'place-card__image');
const form = document.forms.new;
const myUserId = '85e7c3deb26a2d73bd489542';

const newPlaceSubmitButton = document.getElementById('popup_new-place-submit');
const newPlaceNameError = document.getElementById('popup__input_type_name-error');
const newPlaceLinkError = document.getElementById('popup__input_type_link-error');

const baseHost = process.env.NODE_ENV === 'production' ? config.baseHostProd : config.baseHostDev;

const api = new Api({
    baseUrl: `${baseHost}/cohort1`,
    headers: {
      authorization: config.authorizationToken,
      'Content-Type': 'application/json'
    }
  });
const cardsList = new CardList(document.querySelector('.places-list'), api, imagePopup, myUserId);

const userModule = new UserModule(profilePopup, document.querySelector('.user-info__data'), api);

//  Функция валидации формы Card
function validatePopup() {
    const name = form.elements.name.value;
    const link = form.elements.link.value;
    let isValid = true;

    // обнуляем ошибки
    newPlaceNameError.textContent = '';
    newPlaceLinkError.textContent = '';

    // проверяем заполненность поля названия
    if (name.length === 0) {
        newPlaceNameError.textContent = 'Это обязательное поле';
        isValid = false;
    } else {
        // проверяем длину поля названия (от 2 до 30 включительно)
        if (name.length < 2 || name.length > 30) {
            newPlaceNameError.textContent = 'Должно быть от 2 до 30 символов';
            isValid = false;
        }
    }
    // проверяем заполненность поля ссылки
    if (link.length === 0) {
        newPlaceLinkError.textContent = 'Это обязательное поле';
        isValid = false;
    } else {
        // проверяем что поле ссылки - это ссылка с http:// или https://
        const regex = /(http|https):\/\//;
        if (!regex.test(link)) {
            newPlaceLinkError.textContent = 'Здесь должна быть ссылка';
            isValid = false;
        }
    }

    // деактивация или активация кнопки отправки формы
    if (isValid === false) {
        newPlaceSubmitButton.setAttribute('disabled', true);
    } else {
        newPlaceSubmitButton.removeAttribute('disabled');
    }
};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    cardsList.createCard(form.elements.name.value, form.elements.link.value);

    form.reset();
    placePopup.close();

    newPlaceSubmitButton.setAttribute('disabled', true); 
    newPlaceSubmitButton.classList.add('popup__button_disabled');
});

form.addEventListener('input', validatePopup);
