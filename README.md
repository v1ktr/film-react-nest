https://v1ktr.nomorepartiessite.ru/ - ссылка на задеплоенный проект.

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

* `DATABASE_DRIVER` - тип драйвера СУБД - в нашем случае это `postgres` 
* `DATABASE_URL` - адрес СУБД PostgreSQL, например `postgres://prac:prac@database:5432/prac`. database - имя контейнера postgres внутри docker network
* `LOGGER_TYPE` - тип логгирования. Может быть dev, json и tskv.

PostgreSQL должна быть установлена и запущена.

Запустите бэкенд:

`npm start:debug` или `npm start:dev`

Для проверки отправьте тестовый запрос с помощью Postman или `curl`.




