# FILM!

## Установка

### PostgreSQL

Установите PostgreSQL скачав дистрибутив с официального сайта или с помощью пакетного менеджера вашей ОС. Также можно воспользоваться Docker (см. ветку `feat/docker`.

Выполните скрипт `test/prac.init.sql`, `test/prac.films.sql`, `test/prac.schedules.sql` в консоли `posgresql`.

### Бэкенд

Перейдите в папку с исходным кодом бэкенда

`cd backend`

Установите зависимости (точно такие же, как в package-lock.json) помощью команд

`npm ci` или `yarn install --frozen-lockfile`

Создайте `.env` файл из примера `.env.example`, в нём укажите:

* `DATABASE_DRIVER` - тип драйвера СУБД - в нашем случае это `mongodb` 
* `DATABASE_URL` - адрес СУБД PostgreSQL, например `postgres://localhost:5432/prac`. 
* `DATABASE_USERNAME` - логин от базы данных. 
* `DATABASE_PASSWORD` - пароль от базы даннех.  

PostgreSQL должна быть установлена и запущена.

Запустите бэкенд:

`npm start:debug`

Для проверки отправьте тестовый запрос с помощью Postman или `curl`.




