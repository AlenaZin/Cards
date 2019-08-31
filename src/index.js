import "./style.css";
import logoSvg from './images/logo.svg';
import closeSvg from './images/close.svg';

import Popup from './classes/Popup';
import Api from './classes/Api';
import CardList from './classes/CardList';
import UserModule from './classes/UserModule';

const placePopup = new Popup(document.getElementById('popup_new-place'), 'user-info__button');
const profilePopup = new Popup(document.getElementById('popup_profile'), 'user-info__button_edit');
const imagePopup = new Popup(document.getElementById('popup_image'), 'place-card__image');
const form = document.forms.new;
const myUserId = '85e7c3deb26a2d73bd489542';

const newPlaceSubmitButton = document.getElementById('popup_new-place-submit');
const newPlaceNameError = document.getElementById('popup__input_type_name-error');
const newPlaceLinkError = document.getElementById('popup__input_type_link-error');

const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort1',
    headers: {
      authorization: '60f28af5-fb65-4707-b683-9c36600510df',
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




/**
 * Работа очень хорошая. Особенно порадовала разбивка на модули, неплохо.
 * Необходимо замените IP адрес для запросов к серверу и вынести отдельно в файл
 * Так же относится к UserId authorization и так далее
 * Необходимо добавить сборки для webpack, а не только для deploy
 * README.md необходимо указать что за проект. Представьте что вы посмотрите этот проект через 5 лет или вам зададут вопрос что за проект
 * Проект надо развернуть чтобы он открывался по адресу https://имя.github.io/название_репозитория/
 * 
 * 
 * Рекомендации. Любые названия которые прописываете в исходном коде лучше выносить отдельно в некий языковой файл в ввиде массива
 * Во первыйх вы сможете избежать дублей и переиспользовать
 * Во вторых если придёт задача добавить ещё один язык вы с элегантностью её решите
 * 
 * Ещё раз подчеркну, работа мне очень понравилась. Старайтесь у вас всё получится ;)
 * @koras
 */