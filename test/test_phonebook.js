// тестовая страница

class Phonebook {
    constructor(persons) {
        this.persons = persons || [];
    }
    addPerson(person) {
        this.persons.push(person);
    }
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age || 0;
    }
}

const alena = new Person('Alenka', 26);
const artem = new Person('Artem', 32);
const serg = new Person('Sergey', 29);
const boss = new Person('Mih mih');

const kniga = new Phonebook([alena, artem, serg, boss]);

// kniga.persons.push(alena);
// kniga.addPerson(artem);

//--------------------------------------------------------------------

const Phonebook = function() {
    this.persons = [];
};

Phonebook.prototype.addPerson = function (person) {
    this.persons.push(person);
}

const kniga2 = Phonebook();