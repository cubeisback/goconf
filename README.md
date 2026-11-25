# GoConf (Next.js версия)

- [goconf.ru](https://goconf.ru/)

## Деплой frontend

Push в `main` публикует dev.goconf.ru (`goconf-dev`, порт 3001).
Push в `prod` публикует goconf.ru (`goconf-prod`, порт 3000).
Оба workflow можно запустить вручную на соответствующей ветке.

GitHub Actions использует Secrets `SERVER_IP_DEV`, `SERVER_USER_DEV`,
`PRIVATE_KEY_DEV`, `ENV_DEV_CONTENT`, `ENV_PRODUCTION_CONTENT`.
Сервер: `141.98.190.155`, пользователь `thunder`. Публичный ключ сервера
закреплён в workflow; при замене сервера его нужно проверить и обновить.

Релизы собираются в `/home/thunder/web/<домен>/releases/<commit>-<run>-<attempt>`.
До переключения проверяются HTTP-ответы, HTML robots, X-Robots-Tag и robots.txt.
`app` указывает на активный релиз; исходный каталог сохраняется как `app-before-*`.
При ошибке активации скрипт возвращает предыдущий frontend. Старые релизы
сохраняются для отката; их очистка выполняется отдельно.

PM2 работает от `thunder`, сохраняется через `pm2 save` и восстанавливается
службой `pm2-thunder`. Проверка: `su - thunder -c 'pm2 status'`.
Workflow `Check deployment access` проверяет SSH без вывода секретов и деплоя.

Dev использует боевой API: действия в dev могут менять боевые данные.
Его Next.js-страницы закрыты от индексации. Backend и база не входят в деплой.
