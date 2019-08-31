export default class Popup {
    constructor(domPopup, openButtonClass) {
        this.domPopup = domPopup;
        this.openButtonClass = openButtonClass;
        this.initEvents();
    }
    initEvents() {
        const self = this;
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains(self.openButtonClass)) {
                self.open();
            }
        });
        this.domPopup.querySelector('.popup__close').addEventListener('click', function (e) {
            self.close();
        });
    }
    open() {
        this.domPopup.classList.toggle('popup_is-opened');
    }
    close() {
        this.domPopup.classList.toggle('popup_is-opened')
    }
}
