        function gerarQRCode() {
            const texto = document.getElementById('inputText').value;
            
            if (!texto) {
                alert("Por favor, insira um texto para gerar o QR Code.");
                return;
            }
            
            const qrCodeImage = document.getElementById('qrCodeImage');
            const downloadLinkSVG = document.getElementById('downloadLinkSVG');
            const downloadLinkPNG = document.getElementById('downloadLinkPNG');
            
            // Gerar o QR Code em formato SVG
            QRCode.toString(texto, {
                errorCorrectionLevel: 'H',
                type: 'svg', // Definindo tipo como SVG
                color: {
                    dark: '#000000', // cor do código (preto)
                    light: '#ffffff'    // fundo branco
                }
            }, (err, svg) => {
                if (err) {
                    console.error(err);
                    alert("Erro ao gerar o QR Code. Tente novamente.");
                } else {
                    qrCodeImage.innerHTML = svg; // Inserindo o SVG gerado dentro do div
                    qrCodeImage.style.display = "block"; // Exibindo o div com o SVG

                    // Criando o Blob para o download do SVG
                    const blobSVG = new Blob([svg], { type: 'image/svg+xml' });
                    const urlSVG = URL.createObjectURL(blobSVG);
                    downloadLinkSVG.href = urlSVG; // Atualizando o link de download para SVG
                    downloadLinkSVG.style.display = "inline"; // Exibindo o link de download SVG
                }
            });

            // Gerar o QR Code em formato PNG
            QRCode.toDataURL(texto, {
                errorCorrectionLevel: 'H',
                type: 'image/png', // Definindo tipo como PNG
                color: {
                    dark: '#000000', // cor do código (preto)
                    light: '#ffffff'    // fundo branco
                }
            }, (err, urlPNG) => {
                if (err) {
                    console.error(err);
                    alert("Erro ao gerar o QR Code em PNG. Tente novamente.");
                } else {
                    // Atualizando o link de download para PNG
                    downloadLinkPNG.href = urlPNG;
                    downloadLinkPNG.style.display = "inline"; // Exibindo o link de download PNG
                }
            });
        }
