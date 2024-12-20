// Validação para o campo de número de telefone
document.getElementById('inputNumber').addEventListener('input', function(event) {
    this.value = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (this.value.length > 11) {
        this.value = this.value.slice(0, 11); // Limita a 11 dígitos
    }
});

// Validação para o campo de mensagem (removendo HTML e caracteres não alfanuméricos)
document.getElementById('inputMensagem').addEventListener('input', function(event) {
    this.value = this.value.replace(/<[^>]*>/g, ''); // Remove tags HTML
    this.value = this.value.replace(/[^a-zA-Z0-9\sá-úÁ-Ú!?.,;:'"-]/g, ''); // Permite letras, números e alguns caracteres especiais
});

// Função para gerar o link do WhatsApp
function gerarLinkWpp() {
    const numberPhone = document.getElementById('inputNumber').value;
    const mensagemWpp = document.getElementById('inputMensagem').value;
    const linkGenerator = document.getElementById('linkGenerator');

    // Validação para garantir que o número e a mensagem não estão vazios
    if (!numberPhone || numberPhone.length !== 11) {
        alert("Por favor, insira um número de telefone válido com 11 dígitos.");
        return;
    }
    if (!mensagemWpp) {
        alert("Por favor, insira uma mensagem.");
        return;
    }

    // Gerando o link do WhatsApp com número e mensagem
    linkGenerator.innerHTML = `https://api.whatsapp.com/send?phone=+55${numberPhone}&text=${encodeURIComponent(mensagemWpp)}`;
}

const btnGeneratorWpp = document.getElementById("btnGenerator");
btnGeneratorWpp.addEventListener("click", () => {
    gerarLinkWpp(); // Chama a função para gerar o link de WhatsApp
});

// Função para gerar o QR Code
function gerarQRCode() {
    const texto = document.getElementById('inputText').value;

    if (!texto) {
        alert("Por favor, insira um texto para gerar o QR Code.");
        return;
    }

    const qrCodeImage = document.getElementById('qrCodeImage');
    const downloadLinkSVG = document.getElementById('downloadLinkSVG');
    const downloadLinkPNG = document.getElementById('downloadLinkPNG');

    // Gerar QR Code em SVG
    QRCode.toString(texto, {
        errorCorrectionLevel: 'H',
        type: 'svg', // Tipo como SVG
        color: {
            dark: '#000000', // Cor do QR code (preto)
            light: '#0000'   // Fundo transparente
        }
    }, (err, svg) => {
        if (err) {
            console.error(err);
            alert("Erro ao gerar o QR Code. Tente novamente.");
        } else {
            qrCodeImage.innerHTML = svg; // Insere o SVG dentro da div
            qrCodeImage.style.display = "block"; // Exibe a div com o SVG

            // Criando o Blob para o download do SVG
            const blobSVG = new Blob([svg], { type: 'image/svg+xml' });
            const urlSVG = URL.createObjectURL(blobSVG);

            // Atualizando o link de download para SVG
            downloadLinkSVG.href = urlSVG;
            downloadLinkSVG.style.display = "inline"; // Exibe o link de download para SVG

            // Gerar QR Code em PNG
            QRCode.toDataURL(texto, {
                errorCorrectionLevel: 'H',
                type: 'image/png',
                color: {
                    dark: '#000000', // Cor do QR code (preto)
                    light: '#0000'   // Fundo transparente
                }
            }, (err, png) => {
                if (err) {
                    console.error(err);
                    alert("Erro ao gerar o QR Code. Tente novamente.");
                } else {
                    // Criando o Blob para o download do PNG
                    const blobPNG = new Blob([png], { type: 'image/png' });
                    const urlPNG = URL.createObjectURL(blobPNG);

                    // Atualizando o link de download para PNG
                    downloadLinkPNG.href = urlPNG;
                    downloadLinkPNG.style.display = "inline"; // Exibe o link de download para PNG
                }
            });
        }
    });
}
