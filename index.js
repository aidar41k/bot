const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const cors = require('cors')
const botToken = "5924398361:AAEzfkyVFE5oudo-O294yeRJhzMV0IqufB8"; // Замените на токен вашего бота
const PORT = 3001
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const bot = new TelegramBot(botToken, { polling: true });

app.use(express.json());

app.post("/send-message", (req, res) => {
  const { phoneNumber, name } = req.body;

  const message = `Заказан звонок на номер: +${phoneNumber}, имя: ${name? name : "без имени"}`;

  bot
    .sendMessage("-881068248", message) // Замените на ваш идентификатор пользователя
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
