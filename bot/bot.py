from flask import Flask, request
import telegram
import os

app = Flask(__name__)

# Configuração do bot do Telegram
BOT_TOKEN = os.getenv("BOT_TOKEN", "7538409346:AAEylYfp8OmYpynu5RCi-m0vFcKagr3rM0c")  # Substitua pelo token correto
CHAT_ID = os.getenv("CHAT_ID", "t.me/pedidosVelo_bot")  # Substitua pelo ID do chat da recepção
bot = telegram.Bot(token=BOT_TOKEN)

@app.route("/enviar-pedido", methods=["POST"])
def receber_pedido():
    data = request.json
    bike = data.get("bike")
    itens = ", ".join(data.get("itens", []))
    
    mensagem = f"🚴‍♂️ *Novo Pedido!*\n\nBike: {bike}\nItens: {itens}"
    bot.send_message(chat_id=CHAT_ID, text=mensagem, parse_mode=telegram.ParseMode.MARKDOWN)
    
    return "Pedido enviado!", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
