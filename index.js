        function gerarQRCode() {
            const texto = document.getElementById('inputText').value;
            
            if (!texto) {
                alert("Por favor, insira um texto para gerar o QR Code.");
                return;
            }
            
            const qrCodeImage = document.getElementById('qrCodeImage');
            
            QRCode.toString(texto, {
                errorCorrectionLevel: 'H',
                type: 'svg', // Definindo tipo como SVG
                color: {
                    dark: '#000000', // cor do código (preto)
                    light: '#0000'    // fundo transparente (sem cor)
                }
            }, (err, svg) => {
                if (err) {
                    console.error(err);
                    alert("Erro ao gerar o QR Code. Tente novamente.");
                } else {
                    qrCodeImage.innerHTML = svg; // Inserindo o SVG gerado dentro do div
                    qrCodeImage.style.display = "block"; // Exibindo o div com o SVG
                }
            });
        }
