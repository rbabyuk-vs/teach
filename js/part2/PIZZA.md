# створити чи отримати API ключ для доступу до Google Maps
ми будемо використовувати Google Maps, щоб відобразити карту для користувача з зонами доставки і можливістю вводу адреси для перевірки.

Відповідно потрібно отримати ключ для доступу до сервісу Google Maps API and Google Places API

# Створити міні компонент з картою доставки
мені потрібен React міні компонент для того щоб відобразити зони доставки.

як приклад сторінки можна використати https://kebabtsia.com/delivery/
https://la.ua/delivery/

### Acceptance criteria:

карта маж мати мінімум дві зони для доставки, виділені різними кольорами

карта має містити форму для введення адреси, щоб користувач міг побачити чи можлива доставка на цю адресу, зрозуміти час доставки і вартість

міні компонент не має містити API ключ у відкритому вигляді, потрібно використати .env файл.

# Безпека міні компонента з картою
Для того щоб наш компонент був безпечний і ми не компроментували наш API ключ, потрібно використати міні бекенд аплікацію, щоб запити з нашого React додатку відправлялись до міні бекенду, і наш бекенд тримав цей ключ у своїй конфігурапції.

