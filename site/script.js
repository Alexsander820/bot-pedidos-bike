document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("pedidoForm");
    const mensagem = document.getElementById("mensagem");

    // Pegando a bike do QR Code (Exemplo: /?bike=12)
    const params = new URLSearchParams(window.location.search);
    document.getElementById("bikeInput").value = params.get("bike") || "Desconhecida";

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const itensSelecionados = [];
        document.querySelectorAll("input[name='itens']:checked").forEach((item) => {
            itensSelecionados.push(item.value);
        });

        const bike = document.getElementById("bikeInput").value;

        if (itensSelecionados.length === 0) {
            mensagem.textContent = "Por favor, selecione pelo menos um item!";
            return;
        }

        fetch("https://SEU_DOMINIO/enviar-pedido", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bike: bike,
                itens: itensSelecionados
            }),
        })
        .then(response => response.text())
        .then(data => {
            mensagem.textContent = "✅ Pedido enviado com sucesso!";
        })
        .catch(error => {
            mensagem.textContent = "❌ Erro ao enviar o pedido!";
        });
    });
});
