# Web Quest: Deliver a Request to the Server

## 1. Game concept

A browser learning game. The player sends one simulated web request from a URL to a finished web page.

The fixed example is:

`https://webdev.vpu29.com/courses/html`

The game shows the path:

```text
URL → DNS → IP → port → HTTP request → server
                                      ↓
                         HTTP response → HTML → DOM
                                                   ↓
                                             JavaScript
```

This is a simulation. It does not use a real server, DNS query, `fetch()`, or API.

## Visual gameplay direction — proposed update

### Purpose of this update

The first layout can look like a question form. Version 1 should instead feel like a short adventure game. The player moves one request character through a visible web world.

### Art direction

Use an original **voxel and pixel adventure** style. It can remind students of block-building games, but it must not copy Minecraft names, textures, icons, fonts, sounds, or other assets.

- Use CSS only. Do not add external images or libraries.
- Use square pixels, block shadows, limited color groups, and simple CSS shapes.
- Use a dark “web world” background with bright station colors.
- Use a small packet character, for example a glowing square with `GET` on it.
- Use Ukrainian labels in the interface. Keep code, HTTP methods, and status names in English.

### New game scene

The main screen is a horizontal or vertical map with nine stations:

```text
URL gate → DNS village → IP beacon → port gate → request rail
→ server tower → response bridge → DOM workshop → JavaScript lab
```

The packet character starts at the URL gate. A correct action moves it to the next station. A completed station changes from dim to bright and receives a check mark.

The route is always visible. On a phone it becomes a vertical route. On a wide screen it stays horizontal.

### Replace form-like interaction

Do not show a full group of fields or several questions at one time.

- Show one small mission card at the active station.
- Show one task and two to four large “action tiles”.
- Make each tile look like a game object: a sign, a block, a key, or a lever.
- After a wrong action, shake only the selected tile with a short CSS animation and show a small helper bubble.
- After a correct action, show a short success effect: the tile lights up, the station completes, and the packet moves forward.
- Do not use drag and drop.
- Do not use complex animation. CSS transitions and one small keyframe animation are enough.

### Level 1 change

Level 1 becomes three short micro-missions, not one multi-field form:

1. The player selects the **protocol block**: `https`.
2. The player selects the **domain block**: `webdev.vpu29.com`.
3. The player selects the **path block**: `/courses/html`.

The three correct blocks enter a small “request backpack”. The completed URL appears as one assembled route sign:

```text
https://webdev.vpu29.com/courses/html
```

The player receives one total level reward of `+10`, after all three blocks are correct. A wrong choice still gives `-2` and a short explanation.

### Game feedback

- Score becomes **data energy**. The number remains visible.
- Progress becomes **route completed**, for example `3 / 9 станцій`.
- The current level name appears as a location name, for example `DNS-село`.
- Correct feedback uses a short, concrete statement and visual station completion.
- Wrong feedback uses a short, concrete statement and a helper bubble. It must not hide the task.
- The request and response panels look like in-game terminals, not large form fields.

### Final DOM mission change

The DOM mission becomes a workshop scene.

- `Змінити текст` is a text-tool block.
- `Додати елемент` is an add-block tool.
- `Видалити елемент` is a remove-block tool.
- The page preview is a small web-page board in the workshop.
- Each action visibly changes the board and adds one completed tool to the workshop inventory.

### Accessibility and responsive rules for this direction

- Pixel styling must not reduce text contrast or button size.
- Each game tile must be a real `<button>` with a clear Ukrainian text label.
- Do not depend only on color: use a label, check mark, and active-state border.
- Keep reduced-motion support. When the system requests reduced motion, disable movement and shake animations.
- Keep the current mobile-first layout and readable code panels.

### Updated acceptance criteria for visual gameplay

- The first game screen does not look like a multi-field questionnaire.
- The player sees one active mission at a time.
- The map and packet character show the request journey.
- A correct action visibly completes a station and moves the packet forward.
- Level 1 uses three small sequential block selections, not three form groups.
- No external art asset, external font, library, or trademarked game asset is used.
- The game stays usable on a phone and with keyboard navigation.

## 2. Learning goal

After the game, the student can explain:

- client and server;
- protocol, domain, and path in a URL;
- DNS, IP address, and port;
- HTTP and HTTPS;
- request and response;
- `GET` and `POST`;
- `200`, `404`, and `500`;
- HTML to DOM;
- basic JavaScript changes to the DOM.

## 3. Target audience

Students who know basic HTML and CSS.

Students have not started systematic JavaScript study.

They use AI tools, but must understand the result.

## 4. Main user flow

1. The student opens the game.
2. The student sees the mission and the full web-request path.
3. The student completes seven levels in order.
4. Each answer updates the visual path and request data.
5. A correct answer gives 10 points.
6. A wrong answer removes 2 points, explains the error, and lets the student try again.
7. At the end, the student changes a simulated web page with DOM actions.
8. The student sees the final score and can restart.

## 5. Levels

| Level | Topic | Correct result |
|---|---|---|
| 1 | URL parts | `https`, `webdev.vpu29.com`, `/courses/html` |
| 2 | DNS | `203.0.113.29` |
| 3 | Port | `443` |
| 4 | HTTP method | `GET` |
| 5 | Response status | `200 OK` |
| 6 | HTML to DOM | Browser creates DOM from HTML |
| 7 | DOM mission | Change, add, and remove page elements |

## 6. Level details

### Level 1 — Read the URL

**Player sees**

- URL: `https://webdev.vpu29.com/courses/html`
- Three marked parts of the URL.
- A visual path where only `URL` is active.

**Task**

Match each value to a URL part.

**Actions**

The player selects an answer for each part.

**Correct answers**

- Protocol: `https`
- Domain: `webdev.vpu29.com`
- Path: `/courses/html`

**Typical wrong answers**

- `https` as a domain;
- `/courses/html` as a port;
- `webdev.vpu29.com` as a path.

**Explanation**

- Correct: “A URL tells the browser where to send the request. `https` is the protocol. The domain identifies the server name. The path identifies a resource.”
- Wrong protocol: “`https` is a protocol. It tells the browser to use HTTPS.”
- Wrong domain: “The domain is the server name. Here it is `webdev.vpu29.com`.”
- Wrong path: “The path identifies a resource on the server. Here it is `/courses/html`.”

**Visual change**

`URL` becomes complete. `DNS` becomes active.

**Score**

- Correct: `+10`
- Wrong: `-2`

### Level 2 — DNS finds an IP address

**Player sees**

- Domain: `webdev.vpu29.com`
- DNS panel: “Find the IP address for this domain.”
- Answer buttons.

**Task**

Select the IP address that DNS returns.

**Correct answer**

`203.0.113.29`

This address is a documentation-only example. It is not a real DNS result.

**Wrong answers**

- `webdev.vpu29.com`
- `https://webdev.vpu29.com`
- `404`

**Explanation**

- Correct: “DNS changes a domain name into an IP address. The browser uses the IP address to find the server.”
- Domain: “A domain is a human-readable server name. DNS finds its IP address.”
- URL: “A URL contains more than an IP address. DNS returns an IP address.”
- `404`: “`404` is an HTTP response status. It is not an IP address.”

**Visual change**

```text
webdev.vpu29.com → DNS → 203.0.113.29
```

`Port` becomes active.

**Score**

- Correct: `+10`
- Wrong: `-2`

### Level 3 — Select the port

**Player sees**

- Protocol: `https`
- IP address: `203.0.113.29`
- Port choices: `80`, `443`, `404`.

**Task**

Select the normal port for HTTPS.

**Correct answer**

`443`

**Wrong answers**

- `80`
- `404`

**Explanation**

- Correct: “HTTPS normally uses port `443`.”
- `80`: “Port `80` is normally used for HTTP, not HTTPS.”
- `404`: “`404` is an HTTP response status. It is not a port.”

**Visual change**

```text
203.0.113.29:443
```

`HTTP request` becomes active.

**Score**

- Correct: `+10`
- Wrong: `-2`

### Level 4 — Build the request

**Player sees**

- A task: “Open the HTML course page.”
- Method choices: `GET`, `POST`.
- A request preview with an empty method.

**Task**

Select the HTTP method.

**Correct answer**

`GET`

**Wrong answer**

`POST`

**Explanation**

- Correct: “Use `GET` to request and read a resource, such as a web page.”
- `POST`: “Use `POST` to send data to the server, for example a form submission. This task requests a page.”

**Visual change**

The request preview becomes:

```http
GET /courses/html HTTP/1.1
Host: webdev.vpu29.com
```

`Server` becomes active.

**Score**

- Correct: `+10`
- Wrong: `-2`

### Level 5 — Read the server response

**Player sees**

- Server result: “The page exists and the server works.”
- Status choices: `200`, `404`, `500`.

**Task**

Select the response status.

**Correct answer**

`200 OK`

**Wrong answers**

- `404 Not Found`
- `500 Internal Server Error`

**Explanation**

- Correct: “`200 OK` means that the server successfully found and returned the requested resource.”
- `404`: “`404 Not Found` means that the requested resource does not exist at this path.”
- `500`: “`500 Internal Server Error` means that the server had an internal problem.”

**Visual change**

The response panel becomes:

```http
HTTP/1.1 200 OK
Content-Type: text/html
```

`HTML` becomes active.

**Score**

- Correct: `+10`
- Wrong: `-2`

### Level 6 — HTML becomes DOM

**Player sees**

A small HTML example:

```html
<h1>HTML Course</h1>
<p>Learn how the web works.</p>
```

And three choices:

- “The browser creates a DOM tree.”
- “DNS creates an IP address.”
- “The server runs JavaScript in the browser.”

**Task**

Select what the browser does with received HTML.

**Correct answer**

“The browser creates a DOM tree.”

**Wrong answers**

- “DNS creates an IP address.”
- “The server runs JavaScript in the browser.”

**Explanation**

- Correct: “The browser reads HTML and creates the DOM. JavaScript can then read and change this DOM.”
- DNS: “DNS works earlier. It helps find the server before the HTTP request.”
- Server JavaScript: “Browser JavaScript runs in the browser. The server sends HTML to the browser.”

**Visual change**

The game displays a simple DOM tree:

```text
document
└── body
    ├── h1
    └── p
```

`JavaScript` becomes active.

**Score**

- Correct: `+10`
- Wrong: `-2`

### Level 7 — Final DOM mission

**Player sees**

A simulated final page:

```text
HTML Course
Learn how the web works.
```

And three action buttons:

- `Change text`
- `Add element`
- `Remove element`

A code preview updates after each action.

**Task**

Complete all three actions.

**Required actions and results**

1. `Change text`
   - Change heading to: `HTML Course: Mission Complete`
   - Code preview:

   ```js
   heading.textContent = "HTML Course: Mission Complete";
   ```

2. `Add element`
   - Add paragraph: `JavaScript can change the DOM.`
   - Code preview:

   ```js
   const message = document.createElement("p");
   message.textContent = "JavaScript can change the DOM.";
   page.append(message);
   ```

3. `Remove element`
   - Remove the original paragraph: `Learn how the web works.`
   - Code preview:

   ```js
   originalText.remove();
   ```

**Explanation**

“JavaScript can change the DOM after the browser creates it from HTML.”

**Visual change**

The full web-request path is complete.

**Score**

- First completion of all three actions: `+10`
- Repeated action: no score change
- No wrong-answer penalty on this level

## 7. Score and progress

- Start score: `0`
- Correct answer: `+10`
- Wrong answer: `-2`
- Minimum score: `0`
- Maximum score: `70`
- Progress: `level number / 7`
- A progress bar shows completed levels.

A wrong answer does not block the game. The player reads the explanation and tries again.

## 8. Game states

| State | System behavior |
|---|---|
| Start | Show title, learning goal, and `Start mission` button |
| Active level | Show current task and active path step |
| Correct answer | Show success message, add score, enable `Next level` |
| Wrong answer | Show correction, remove score, keep level active |
| Complete | Show final score, completed path, and final page |
| Restart | Reset score, level, request data, DOM mission, and progress |

## 9. HTTP request display

After level 4, show:

```http
GET /courses/html HTTP/1.1
Host: webdev.vpu29.com
Connection: simulated
```

The label must say: “Simulated HTTP request.”

## 10. HTTP response display

After level 5, show:

```http
HTTP/1.1 200 OK
Content-Type: text/html

<h1>HTML Course</h1>
<p>Learn how the web works.</p>
```

The label must say: “Simulated server response.”

## 11. Level data structure

Each level is one JavaScript object:

```js
{
  id: "port",
  title: "Select the port",
  task: "Select the normal port for HTTPS.",
  options: ["80", "443", "404"],
  correctAnswer: "443",
  correctMessage: "HTTPS normally uses port 443.",
  wrongMessages: {
    "80": "Port 80 is normally used for HTTP, not HTTPS.",
    "404": "404 is an HTTP response status. It is not a port."
  },
  scoreCorrect: 10,
  scoreWrong: -2
}
```

Level 1 can use three small objects, one for protocol, domain, and path.

Level 7 uses an action-state object:

```js
{
  textChanged: false,
  elementAdded: false,
  elementRemoved: false
}
```

## 12. Required HTML elements

- Main page container.
- Header with game title.
- Score display.
- Level display.
- Progress bar.
- Visual web-request path.
- Mission panel.
- Answer buttons area.
- Feedback panel.
- Explanation panel.
- Request panel.
- Response panel.
- DOM tree panel.
- Final page preview.
- JavaScript code preview.
- `Start mission`, `Next level`, and `Restart` buttons.

All visible learning text must be in Ukrainian. Code, status names, and method names stay in English.

## 13. Main JavaScript functions

| Function | Responsibility |
|---|---|
| `startGame()` | Reset state and start level 1 |
| `renderLevel()` | Show the current level |
| `renderProgress()` | Update level number and progress bar |
| `renderPath()` | Update the visual web-request path |
| `checkAnswer(answer)` | Check an answer and select feedback |
| `showFeedback(type, message)` | Show correct or wrong feedback |
| `updateScore(points)` | Change score; do not go below zero |
| `updateRequestPreview()` | Build the simulated HTTP request |
| `updateResponsePreview()` | Show the simulated response |
| `renderDomTree()` | Show the DOM tree |
| `changeText()` | Do DOM mission action 1 |
| `addElement()` | Do DOM mission action 2 |
| `removeElement()` | Do DOM mission action 3 |
| `checkMissionComplete()` | Complete level 7 after three actions |
| `restartGame()` | Return to initial state |

## 14. Responsive design rules

- Mobile-first CSS.
- One column on small screens.
- Two columns on wider screens:
  - left: mission and answers;
  - right: path, request, response, and preview.
- Buttons must have a clear size for touch input.
- Text must not depend only on color.
- Use strong contrast.
- Code panels can scroll horizontally on a small screen.
- The web-request path can wrap into multiple lines on a phone.

## 15. Unexpected actions

- Do not let the score go below zero.
- Disable `Next level` before a correct answer.
- Do not add score twice for the same correct answer.
- Do not add the same DOM element twice.
- If the player removes an already removed element, show a short message and do not change score.
- If JavaScript data is invalid, show: “The simulation has a problem. Restart the mission.”
- Restart must return all UI parts to the initial state.

## 16. Acceptance criteria

- The project has only `index.html`, `style.css`, and `script.js`.
- It works locally in a browser.
- It uses no framework, library, API, server, or `fetch()`.
- The game has seven levels.
- The game shows score, level, progress, feedback, explanation, request, response, and final page.
- Each wrong answer gives a correct short explanation.
- The HTTP request contains `GET`, path, and `Host`.
- The HTTP response contains `200 OK` and HTML.
- The DOM mission changes, adds, and removes visible elements.
- The UI works on phone and desktop.
- All UI learning text is Ukrainian.
- A restart gives a clean new game.

## 17. Test scenarios

1. Start the game and check that score is `0` and level is `1 / 7`.
2. Complete all levels with correct answers. Check final score: `70`.
3. Select `404` as a port. Check score decreases by `2` and explanation says it is a status, not a port.
4. Select `80` for HTTPS. Check explanation names HTTP and port `80`.
5. Select `POST` for page reading. Check explanation says `GET` requests a resource.
6. Select `404` for an existing page. Check explanation says the resource was not found.
7. Complete DOM actions in any order. Check final mission completes only after all three actions.
8. Press a DOM action twice. Check that duplicated content does not appear.
9. Restart after completion. Check score, level, path, request, response, and preview reset.
10. Test at phone width and desktop width. Check all controls remain usable.

## 18. Small implementation stages

1. Create static HTML layout and Ukrainian UI text.
2. Add CSS layout, responsive styles, and path visualization.
3. Add game state, score, progress, start, restart, and level rendering.
4. Add levels 1 to 5 with answer validation and feedback.
5. Add request and response previews.
6. Add level 6 with HTML and DOM tree.
7. Add final DOM mission and code preview.
8. Run all test scenarios and fix defects.

## Open questions

None for version 1.

## Assumptions

- The game uses `https://webdev.vpu29.com/courses/html`.
- DNS returns the simulated address `203.0.113.29`.
- HTTPS uses port `443`.
- The request uses `GET`.
- The server returns `200 OK`.
- Correct answers give `+10`; wrong answers give `-2`.
- The player can try again after a wrong answer.
- The final DOM mission uses action buttons, not a code editor.

## Not included in version 1

- Real DNS requests.
- Real server requests.
- `fetch()`.
- Authentication.
- Database.
- Drag and drop.
- Complex animation.
- Code editor.
- Multiple routes or random question sets.
- Saved progress.
