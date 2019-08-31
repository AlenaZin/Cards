

// тестовая страница

const addCounter = function() {
    let counter = 1;

    return function() {
        counter++;
        return counter;
    }
}
addCounter(); // 1
addCounter(); // 2
addCounter(); // 3

//----------------------------------

function print(data) {
    console.log(data);
}

const cards = ['1', '2', '3'];
const cardsJoin = cards.join(' '); // '1 2 3'

print(cards);

const name = 'Artem';
const age = 32;

const persion = { 
    name: name, 
    age: age 
};

const persons = {
    family: [
        {name:'Alena', age:26},
        {name:'Artem', age:32}
    ]
}

//-----------------------------------
const personsJson = JSON.stringify(person); // personJson = '{ name: 'Artem', age: 32 }'; 
person = JSON.parse(personJson);

//-----------------------------------
function Book() {
    this.persions = [];
    this.owner = '';
    this.updatedAt = '09.09.2019 13:50:00';
    this.add = function (name, age) {
        const person = { name: name, age: age };
        this.persios.push(persion);
    }
}

const bookArtem = new Book();
bookArtem.owner = 'Artem Zinoviev';
bookArtem.add('Andrey', 30);

const bookAlena = new Book();
bookAlena.owner = 'Alena Zinovieva';
bookAlena.add('Sergey', 29);
bookAlena.add('Svetlana', 50);


[1,2,3,4,5].filter(function(num) {
    return num > 2;
}); // [3,4,5]

[1,2,3,4,5].map(function(num) {
    return num * num;
}); // [1,4,9,16,25]

initialCards.map(function(card) {
    card.like = !card.like;
    return card;
});

8 == '8'; // true
8 === '8'; // false