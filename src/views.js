import { html, render } from "../node_modules/lit-html/lit-html.js";
import { generateNumbers } from "./math.js";

const divContainer = document.querySelector('.container');

export function showGreetingMessage() {
    const greetTamplate = html`
        <section id="greeting-msg">
            <h1>Нати, хайде да посмятаме!</h1>
            <button class="btn" @click=${showFormEl}>Да започваме !</button>
        </section>
    `;
    render(greetTamplate, divContainer);
};

export function showFormEl() {
    const [a, b] = generateNumbers();

    const formTamplate = html`
        <section id="form">
            <form class="form" @submit=${mathFunc}>
                <h4 class="score" id="score">точки: <span id="points">0</span></h4>
                <h1 id="question">Нати, колко е <span id="first-num">${a}</span> + <span id="second-num">${b}</span> ?</h1>
                <input type="text" class="input" id="input" name="answer" placeholder="Въведи отговор" autofocus autocomplete="off">
                <button type="submit" class="btn" id="submit">Изпрати</button>
            </form>
        </section>
    `
    render(formTamplate, divContainer);

    function mathFunc(e) {
        e.preventDefault();
        const scoreEl = document.querySelector('#points');
        const formData = new FormData(e.target);
        const natiAnswer = Number(formData.get('answer'));
        
        const correctResult = a + b;
        if (natiAnswer === correctResult) {
            scoreEl.textContent = Number(scoreEl.textContent) + 1;
            e.target.reset();
            if (Number(scoreEl.textContent) === 10) {
                showWinMessage();
                return;
            } 
            showFormEl();
        } else {
            scoreEl.textContent = 0;
            e.target.reset();
            showDefeatMessage();
        }
    };
};

function showWinMessage() {
    const winMassageTamplate = html`
        <section id="you-win">
            <h1>Бравоооо!!! Ти победи, спечели <span>10</span> точки!!! </h1>
            <button class="btn" @click=${showFormEl}>Да играем отново?</button>
        </section>
    `;
    render(winMassageTamplate, divContainer);
};

function showDefeatMessage() {
    const winMassageTamplate = html`
        <section id="wrong-answer">
            <h1>Грешен отговор :(</h1>
            <button class="btn" id="start" @click=${showFormEl}>Опитай отново :)</button>
        </section>
    `;
    render(winMassageTamplate, divContainer);
};