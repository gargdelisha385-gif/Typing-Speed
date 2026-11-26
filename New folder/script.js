
const input = document.getElementById("input");
const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const result = document.getElementById("result");
const quote = document.getElementById("quote");

let time = 60;
let interval;
let started = false;

const text = quote.innerText.trim();

start.addEventListener("click", function () {
    if (started) return;

    started = true;
    input.disabled = false;
    input.focus();

    interval = setInterval(function () {
        time--;
        timer.innerText = time;

        if (time === 0) {
            clearInterval(interval);
            input.disabled = true;
            result.innerText = "Test completed!";
        }
    }, 1000);
});

input.addEventListener("input", function () {
    let typed = input.value;

    let correct = 0;

    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === text[i]) {
            correct++;
        }
    }

    let wrong = typed.length - correct;

    let elapsed = 60 - time;

    let minutes = elapsed / 60;

    if (minutes > 0) {
        wpm.innerText = Math.round((correct / 5) / minutes);
    }

    let accuracyValue = typed.length > 0
        ? (correct / typed.length) * 100
        : 100;

    accuracy.innerText = Math.round(accuracyValue) + "%";
});

restart.addEventListener("click", function () {
    clearInterval(interval);

    time = 60;
    started = false;

    timer.innerText = 60;
    wpm.innerText = 0;
    accuracy.innerText = "100%";

    input.value = "";
    input.disabled = true;

    result.innerText = "";
});
