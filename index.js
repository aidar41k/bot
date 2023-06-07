require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");
const app = express();
const botToken = process.env.BOT_KEY;

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bot = new TelegramBot(botToken, { polling: true });
app.use(express.json());

app.post("/", (req, res) => {
  //вытаскиваем данные из запроса
  let { phoneNumber, name, square, cleanType, finishPrice } = req.body;
  //если данные не заполнены, то меняем их на пустую строку
  name = name || "";
  square = square || "";
  cleanType = cleanType || "";
  finishPrice = finishPrice || "";

  //в переменную кладем сообщение. Если данные заполнены то вставляем их + тип данных (имя: Имя, площадь: 20м2 и тд).
  const message = `Заказан звонок на номер: +${phoneNumber}${
    name && `, имя: ${name}`
  }${square && `, площадь: ${square} м2`}${
    cleanType && `, Тип уборки: ${cleanType}`
  }${finishPrice && `, цена: ${finishPrice} сом`}`;

  bot
    .sendMessage("-881068248", message)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.listen(() => {
  console.log("Server started");
});
