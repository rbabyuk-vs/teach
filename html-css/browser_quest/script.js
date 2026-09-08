"use strict";

const game = { level: 0, score: 0, answered: false, urlStep: 0, urlAnswers: {}, mission: { textChanged: false, elementAdded: false, elementRemoved: false, lastAction: "" } };

const urlBlocks = [
  { key: "protocol", value: "https", name: "Протокол", question: "Знайди блок протоколу. Він визначає спосіб зв’язку з сервером." },
  { key: "domain", value: "webdev.vpu29.com", name: "Домен", question: "Знайди блок домену. Він називає сервер, до якого йде запит." },
  { key: "path", value: "/courses/html", name: "Шлях", question: "Знайди блок шляху. Він визначає потрібний ресурс на сервері." }
];

const levels = [
  { id: "url", stage: "url", title: "URL-брама", type: "url" },
  { id: "dns", stage: "dns", title: "DNS-село", task: "Знайди IP-маяк для домену webdev.vpu29.com. Яку IP-адресу повертає DNS у цій симуляції?", options: ["203.0.113.29", "webdev.vpu29.com", "https://webdev.vpu29.com", "404"], correct: "203.0.113.29", success: "IP-маяк запалився. DNS змінив доменне ім’я на IP-адресу.", mistakes: { "webdev.vpu29.com": "Це домен. DNS шукає IP-адресу для домену.", "https://webdev.vpu29.com": "Це URL. DNS повертає IP-адресу, а не URL.", "404": "404 — це статус HTTP-відповіді, а не IP-адреса." } },
  { id: "port", stage: "port", title: "Порт-брама", task: "Відкрий правильну браму. HTTPS зазвичай використовує який порт?", options: ["80", "443", "404"], correct: "443", success: "Браму 443 відкрито. HTTPS зазвичай використовує цей порт.", mistakes: { "80": "Порт 80 зазвичай використовується для HTTP, а не HTTPS.", "404": "404 — це статус HTTP-відповіді, а не номер порту." } },
  { id: "method", stage: "request", title: "Рейка запиту", task: "Завантаж пакет на рейку. Браузер хоче отримати сторінку курсу. Який HTTP-метод потрібен?", options: ["GET", "POST"], correct: "GET", success: "Пакет GET поїхав до вежі сервера.", mistakes: { POST: "POST надсилає дані, наприклад дані форми. Тут браузер хоче отримати сторінку." } },
  { id: "status", stage: "response", title: "Міст відповіді", task: "Сервер працює, а сторінка існує. Який статус має пройти через міст відповіді?", options: ["200 OK", "404 Not Found", "500 Internal Server Error"], correct: "200 OK", success: "Міст відкрито. 200 OK означає успішну відповідь сервера.", mistakes: { "404 Not Found": "404 Not Found означає, що сервер не знайшов ресурс за цим шляхом.", "500 Internal Server Error": "500 Internal Server Error означає внутрішню проблему сервера." } },
  { id: "dom", stage: "dom", title: "DOM-майстерня", task: "HTML прибув до майстерні. Що браузер створює з HTML, щоб JavaScript міг працювати зі сторінкою?", options: ["Створює DOM-дерево", "DNS створює IP-адресу", "Сервер запускає JavaScript у браузері"], correct: "Створює DOM-дерево", success: "Майстерня створила DOM-дерево. JavaScript зможе змінити його.", mistakes: { "DNS створює IP-адресу": "DNS працює раніше. Він допомагає знайти сервер перед HTTP-запитом.", "Сервер запускає JavaScript у браузері": "JavaScript сторінки виконується в браузері. Сервер надсилає HTML." } },
  { id: "javascript", stage: "javascript", title: "JS-лабораторія", task: "Збери три інструменти. Кожен інструмент змінює сторінку в DOM.", type: "mission" }
];

const activeSteps = { url: 0, dns: 1, port: 3, request: 4, response: 6, dom: 7, javascript: 8 };
const completionSteps = { url: 0, dns: 2, port: 3, request: 5, response: 6, dom: 7, javascript: 8 };
const locationText = { url: "URL-брама", dns: "DNS-село", port: "Порт-брама", request: "Рейка запиту", response: "Міст відповіді", dom: "DOM-майстерня", javascript: "JS-лабораторія" };
const elements = {
  startScreen: document.querySelector("#start-screen"), gameScreen: document.querySelector("#game-screen"), finishScreen: document.querySelector("#finish-screen"), score: document.querySelector("#score"), finalScore: document.querySelector("#final-score"), levelLabel: document.querySelector("#level-label"), levelTitle: document.querySelector("#level-title"), progressNumber: document.querySelector("#progress-number"), progressBar: document.querySelector("#progress-bar"), progressTrack: document.querySelector(".progress-track"), mapStatus: document.querySelector("#map-status"), requestPath: document.querySelector("#request-path"), locationLabel: document.querySelector("#location-label"), taskTitle: document.querySelector("#task-title"), taskText: document.querySelector("#task-text"), levelVisual: document.querySelector("#level-visual"), answerArea: document.querySelector("#answer-area"), feedback: document.querySelector("#feedback"), nextButton: document.querySelector("#next-button"), requestPreview: document.querySelector("#request-preview"), responsePreview: document.querySelector("#response-preview"), domPreview: document.querySelector("#dom-preview"), domState: document.querySelector("#dom-state")
};

document.querySelector("#start-button").addEventListener("click", startGame);
document.querySelector("#next-button").addEventListener("click", nextLevel);
document.querySelector("#restart-button").addEventListener("click", restartGame);

function startGame() {
  Object.assign(game, { level: 0, score: 0, answered: false, urlStep: 0, urlAnswers: {}, mission: { textChanged: false, elementAdded: false, elementRemoved: false, lastAction: "" } });
  elements.startScreen.classList.add("hidden"); elements.finishScreen.classList.add("hidden"); elements.gameScreen.classList.remove("hidden");
  updateScore(0); renderLevel();
}
function restartGame() { startGame(); }

function renderLevel() {
  const level = levels[game.level];
  game.answered = false;
  elements.locationLabel.textContent = locationText[level.stage];
  elements.levelTitle.textContent = level.title;
  elements.nextButton.textContent = "Наступна станція →";
  elements.nextButton.classList.add("hidden"); clearFeedback(); renderProgress(); renderPath(level.stage); renderSimulation();
  if (level.type === "url") { renderUrlMission(); return; }
  elements.taskTitle.textContent = level.title; elements.taskText.textContent = level.task; renderVisual(level); renderAnswerTiles(level);
}

function renderUrlMission() {
  const block = urlBlocks[game.urlStep];
  elements.taskTitle.textContent = `Збери URL · блок ${game.urlStep + 1} з 3`;
  elements.taskText.textContent = block.question;
  elements.levelVisual.innerHTML = `<div class="backpack" aria-label="Рюкзак запиту"><span class="backpack-title">Рюкзак запиту</span>${urlBlocks.map((item) => `<span class="inventory-block ${game.urlAnswers[item.key] ? "stored" : ""}">${game.urlAnswers[item.key] || "?"}</span>`).join("")}</div>`;
  elements.answerArea.innerHTML = "";
  ["https", "webdev.vpu29.com", "/courses/html"].forEach((choice) => { const button = makeTile(choice); button.addEventListener("click", () => checkUrlBlock(choice)); elements.answerArea.append(button); });
}

function checkUrlBlock(choice) {
  const block = urlBlocks[game.urlStep];
  if (choice !== block.value) { updateScore(-2); showFeedback("wrong", `Це не ${block.name.toLowerCase()}. ${block.name} для цього кроку: ${block.value}.`); return; }
  game.urlAnswers[block.key] = choice;
  if (game.urlStep < urlBlocks.length - 1) { game.urlStep += 1; showFeedback("correct", `Блок «${block.name}» у рюкзаку. Шукай наступний блок.`); renderUrlMission(); return; }
  completeLevel("URL-браму відкрито. Ти зібрав повну адресу ресурсу.");
}

function renderVisual(level) {
  const visuals = { dns: "webdev.vpu29.com  →  DNS-село  →  ?", port: "https://203.0.113.29:<strong>?</strong>/courses/html", method: "? /courses/html HTTP/1.1\nHost: webdev.vpu29.com", status: "HTTP/1.1 ?\nContent-Type: text/html", dom: "&lt;h1&gt;Курс HTML&lt;/h1&gt;\n&lt;p&gt;Дізнайся, як працює веб.&lt;/p&gt;" };
  elements.levelVisual.innerHTML = `<div class="terminal-visual">${visuals[level.id] || ""}</div>`;
}
function renderAnswerTiles(level) {
  elements.answerArea.innerHTML = "";
  if (level.type === "mission") { renderMission(); return; }
  level.options.forEach((option) => { const button = makeTile(option); button.addEventListener("click", () => checkAnswer(option)); elements.answerArea.append(button); });
}
function makeTile(label) { const button = document.createElement("button"); button.className = "choice-button game-tile"; button.type = "button"; button.innerHTML = `<span class="tile-corner">◆</span><span>${label}</span>`; return button; }
function checkAnswer(answer) { if (game.answered) return; const level = levels[game.level]; if (answer === level.correct) { completeLevel(level.success); return; } updateScore(-2); showFeedback("wrong", level.mistakes[answer]); }
function completeLevel(message) { game.answered = true; updateScore(10); showFeedback("correct", message); elements.answerArea.querySelectorAll("button").forEach((button) => { button.disabled = true; }); renderProgress(); renderPath(levels[game.level].stage); renderSimulation(); elements.nextButton.classList.remove("hidden"); elements.nextButton.focus(); }

function renderProgress() { const stage = levels[game.level].stage; const completed = game.answered ? completionSteps[stage] + 1 : activeSteps[stage]; const percent = Math.round((completed / 9) * 100); elements.levelLabel.textContent = `Маршрут: ${completed} / 9 станцій`; elements.progressNumber.textContent = percent; elements.progressBar.style.width = `${percent}%`; elements.progressTrack.setAttribute("aria-valuenow", percent); }
function renderPath(stage) {
  const completedUntil = game.answered ? completionSteps[stage] : activeSteps[stage] - 1;
  const packetIndex = game.answered ? Math.min(completedUntil + 1, 8) : activeSteps[stage];
  elements.mapStatus.textContent = game.answered ? "Станцію завершено" : `Локація: ${locationText[stage]}`;
  elements.requestPath.querySelectorAll("li").forEach((item, index) => {
    item.classList.toggle("done", index <= completedUntil); item.classList.toggle("active", !game.answered && index === activeSteps[stage]); item.querySelector(".packet")?.remove();
    if (index === packetIndex) { const packet = document.createElement("span"); packet.className = "packet"; packet.textContent = "GET"; packet.setAttribute("aria-label", "Пакет запиту GET"); item.append(packet); }
  });
}
function renderSimulation() {
  const hasMethod = game.level > 3 || (game.level === 3 && game.answered); const hasResponse = game.level > 4 || (game.level === 4 && game.answered); const hasDom = game.level > 5 || (game.level === 5 && game.answered);
  elements.requestPreview.textContent = hasMethod ? "GET /courses/html HTTP/1.1\nHost: webdev.vpu29.com\nConnection: simulated" : "Термінал очікує пакет…";
  elements.responsePreview.textContent = hasResponse ? "HTTP/1.1 200 OK\nContent-Type: text/html\n\n<h1>Курс HTML</h1>\n<p>Дізнайся, як працює веб.</p>" : "Вежа сервера ще не відповіла.";
  elements.domPreview.textContent = hasDom ? "document\n└── body\n    ├── h1\n    └── p" : "document\n└── body"; elements.domState.textContent = hasDom ? "Створено" : "Ще не створено";
}

function renderMission() {
  const codeByAction = { text: 'heading.textContent = "Курс HTML: місію завершено";', add: 'const message = document.createElement("p");\nmessage.textContent = "JavaScript може змінювати DOM.";\npage.append(message);', remove: "originalText.remove();" };
  elements.levelVisual.innerHTML = `<div class="dom-mission workshop"><div class="page-preview workshop-board"><h3>${game.mission.textChanged ? "Курс HTML: місію завершено" : "Курс HTML"}</h3>${game.mission.elementRemoved ? "" : "<p>Дізнайся, як працює веб.</p>"}${game.mission.elementAdded ? "<p>JavaScript може змінювати DOM.</p>" : ""}</div><div class="mission-actions"><button class="mission-action game-tile" type="button" data-action="text" ${game.mission.textChanged ? "disabled" : ""}>⌨ Змінити текст</button><button class="mission-action game-tile" type="button" data-action="add" ${game.mission.elementAdded ? "disabled" : ""}>＋ Додати елемент</button><button class="mission-action game-tile" type="button" data-action="remove" ${game.mission.elementRemoved ? "disabled" : ""}>− Видалити елемент</button></div><p class="code-preview-title">Консоль інструмента</p><div class="dom-code">${codeByAction[game.mission.lastAction] || "Обери інструмент, щоб побачити JavaScript-код."}</div></div>`;
  elements.answerArea.innerHTML = ""; const actions = { text: changeText, add: addElement, remove: removeElement }; elements.levelVisual.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", actions[button.dataset.action]));
}
function changeText() { runMissionAction("text"); }
function addElement() { runMissionAction("add"); }
function removeElement() { runMissionAction("remove"); }
function runMissionAction(action) {
  if (action === "text") game.mission.textChanged = true; if (action === "add") game.mission.elementAdded = true; if (action === "remove") game.mission.elementRemoved = true; game.mission.lastAction = action; renderMission();
  const actionText = { text: "Текст змінено.", add: "Новий елемент додано.", remove: "Початковий елемент видалено." }; showFeedback("correct", actionText[action]);
  if (game.mission.textChanged && game.mission.elementAdded && game.mission.elementRemoved) { completeLevel("JS-лабораторію завершено. JavaScript може змінювати текст, додавати та видаляти DOM-елементи."); elements.nextButton.textContent = "Побачити результат →"; }
}
function showFeedback(type, message) { elements.feedback.className = `feedback ${type}`; elements.feedback.textContent = message; }
function clearFeedback() { elements.feedback.className = "feedback hidden"; elements.feedback.textContent = ""; }
function updateScore(change) { game.score = Math.max(0, game.score + change); elements.score.textContent = game.score; }
function nextLevel() { if (game.level === levels.length - 1) { finishGame(); return; } game.level += 1; renderLevel(); window.scrollTo({ top: 0, behavior: "smooth" }); }
function finishGame() { elements.gameScreen.classList.add("hidden"); elements.finishScreen.classList.remove("hidden"); elements.finalScore.textContent = `${game.score} / 70`; elements.finishScreen.scrollIntoView({ behavior: "smooth", block: "start" }); }
