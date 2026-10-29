# Toronto Residential Snow Force — сайт уборки снега в «вязаном» стиле

Второй сайт уборки снега (car dig-out, подъездные дорожки, windrow, тротуары, соль, крыши) для Toronto. Дизайн по картинке пользователя: тёмно-синее вязаное небо с CN Tower, шерстяной снег, рабочие в оранжевых жилетах. Картинка стоит в hero (`public/assets/img/hero-knit.jpg/.webp`).

Адрес: https://toronto-lizzy.unknwn-creation.workers.dev/ · Worker `toronto-lizzy` · телефон (365) 360-8470.

Репозиторий: `quant-develope/toronto-lizzy`. Сделан на основе сайта `quant-develope/Snowman-toronto` (Worker `snowman-toronto`).

## Деплой на Cloudflare

Worker `toronto-lizzy` → Settings → Build → Git repository: `quant-develope/toronto-lizzy`, ветка `main`, Root directory — пусто (корень), Build command — пусто (сборка указана в `wrangler.jsonc`), Deploy command — `npx wrangler deploy`. Каждый push в `main` обновляет сайт.

Заявки: в Variables and Secrets этого Worker добавить `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` (те же, что у `snowman-toronto`). В Telegram первой строкой заявки идёт домен сайта (`Site: toronto-lizzy.unknwn-creation.workers.dev`). В CRM `crm-toronto1` заявки идут через service binding `CRM` (секреты не нужны), видны в «Звонках» с хостом этого сайта.

## Как менять

Как в основном сайте: `src/config.mjs` (телефон, услуги, адрес сайта), `src/pages.mjs` (тексты), `public/assets/css/main.css` (стиль; блок «Knitted theme» в конце файла). Сборка: `npm run build` → `dist/`.
