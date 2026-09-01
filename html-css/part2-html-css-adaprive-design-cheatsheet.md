# Адаптивна верстка HTML + CSS

## 1. Viewport

**Viewport** — видима область сторінки на екрані пристрою.

У `<head>` обов’язково додаємо:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Без цього мобільний браузер може показувати сторінку як зменшену десктопну версію.

### Маленький приклад

```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Viewport</title>
</head>
<body>
  <h1>Сторінка для мобільного екрана</h1>
</body>
</html>
```

---

## 2. Mobile-first

Спочатку пишемо стилі для маленького екрана, потім розширюємо їх для більших.

```css
/* Мобільна версія */
.container {
  padding: 16px;
}

/* Планшети й більші екрани */
@media (min-width: 768px) {
  .container {
    padding: 32px;
  }
}
```

Основний принцип:

```text
базові стилі → мобільний екран
min-width → більші екрани
```

### Маленький приклад

```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mobile-first</title>

  <style>
    /* Базові стилі — для мобільного екрана */
    .container {
      padding: 16px;
      background-color: lightblue;
    }

    /* Стилі для екранів від 768 px */
    @media (min-width: 768px) {
      .container {
        padding: 32px;
        background-color: lightgreen;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Привіт!</h1>
    <p>Зміни ширину вікна браузера.</p>
  </div>
</body>
</html>
```

`.container` — це звичайний CSS-клас, який ми створили самі. Він не потребує бібліотек.

---

## 3. Media queries

**Media query** застосовує CSS лише за певної умови.

```css
@media (min-width: 768px) {
  .menu {
    display: flex;
  }
}
```

Найчастіші варіанти:

```css
/* Від 768 px і більше */
@media (min-width: 768px) {}

/* До 767 px включно */
@media (max-width: 767px) {}

/* Від 768 до 1199 px */
@media (min-width: 768px) and (max-width: 1199px) {}
```

Breakpoint варто вибирати там, де верстка перестає нормально виглядати, а не лише під конкретну модель телефона.

### Маленький приклад

```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Media query</title>

  <style>
    .message {
      color: darkblue;
      font-size: 18px;
    }

    @media (min-width: 768px) {
      .message {
        color: darkred;
        font-size: 32px;
      }
    }
  </style>
</head>
<body>
  <p class="message">Мій вигляд залежить від ширини екрана.</p>
</body>
</html>
```

---

## 4. Flexbox

**Flexbox** використовується для розміщення елементів у рядок або колонку.

```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
```

### Маленький приклад

```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flexbox</title>

  <style>
    .cards {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .card {
      flex: 1 1 150px;
      padding: 16px;
      background-color: lightgray;
      border: 1px solid gray;
    }
  </style>
</head>
<body>
  <div class="cards">
    <div class="card">Картка 1</div>
    <div class="card">Картка 2</div>
    <div class="card">Картка 3</div>
  </div>
</body>
</html>
```

Основні властивості контейнера:

| Властивість | Що робить |
|---|---|
| `display: flex` | Вмикає Flexbox |
| `flex-direction` | Задає напрямок: `row` або `column` |
| `justify-content` | Вирівнює вздовж головної осі |
| `align-items` | Вирівнює вздовж поперечної осі |
| `gap` | Задає відстань між елементами |
| `flex-wrap: wrap` | Дозволяє перенесення елементів |

Приклад адаптивних карток:

```css
.cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 768px) {
  .cards {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .card {
    flex: 1 1 250px;
  }
}
```

---

## 5. Box model

Кожен HTML-елемент — це прямокутна коробка:

```text
content → padding → border → margin
```

- `content` — вміст;
- `padding` — внутрішній відступ;
- `border` — рамка;
- `margin` — зовнішній відступ.

```css
.box {
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  margin: 16px;
}
```

За замовчуванням реальна ширина буде:

```text
300 + 40 padding + 4 border = 344 px
```

Тому зазвичай додають:

```css
* {
  box-sizing: border-box;
}
```

Тепер `width: 300px` уже включає `padding` і `border`.

### Маленький приклад

```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Box model</title>

  <style>
    * {
      box-sizing: border-box;
    }

    .box {
      width: 300px;
      padding: 20px;
      border: 4px solid darkblue;
      margin: 20px;
      background-color: lightblue;
    }
  </style>
</head>
<body>
  <div class="box">
    Content розміщений усередині padding і border.
  </div>
</body>
</html>
```

---

## Ключова логіка

```text
viewport повідомляє браузеру ширину екрана
→ mobile-first задає базові мобільні стилі
→ media queries змінюють їх на більших екранах
→ Flexbox розміщує елементи
→ box model визначає їхні розміри й відступи
```
