    function gerarQRCode() {
        const texto = document.getElementById('inputText').value;

        if (!texto) {
            alert("Por favor, insira um texto para gerar o QR Code.");
            return;
        }

        const qrCodeImage = document.getElementById('qrCodeImage');
        const downloadLinkSVG = document.getElementById('downloadLinkSVG');
        const downloadLinkPNG = document.getElementById('downloadLinkPNG');

        // Gerando o QR Code em SVG
        QRCode.toString(texto, {
            errorCorrectionLevel: 'H',
            type: 'svg', // Definindo tipo como SVG
            color: {
                dark: '#000000', // cor do código (preto)
                light: '#ffffff' // fundo branco
            }
        }, (err, svg) => {
            if (err) {
                console.error(err);
                alert("Erro ao gerar o QR Code. Tente novamente.");
                return;
            }
            
            qrCodeImage.innerHTML = svg; // Inserindo o SVG gerado dentro do div
            qrCodeImage.style.display = "block"; // Exibindo o div com o SVG

            // Criando o Blob para o download do SVG
            const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
            const svgUrl = URL.createObjectURL(svgBlob);

            // Atualizando o link de download do SVG
            downloadLinkSVG.href = svgUrl;
            downloadLinkSVG.style.display = "inline"; // Exibindo o link de download do SVG
        });

        // Gerando o QR Code em PNG
        QRCode.toDataURL(texto, {
            errorCorrectionLevel: 'H',
            type: 'image/png', // Definindo tipo como PNG
            color: {
                dark: '#000000', // cor do código (preto)
                light: '#ffffff' // fundo branco
            }
        }, (err, url) => {
            if (err) {
                console.error(err);
                alert("Erro ao gerar o QR Code. Tente novamente.");
                return;
            }

            // Atualizando o link de download do PNG
            downloadLinkPNG.href = url;
            downloadLinkPNG.style.display = "inline"; // Exibindo o link de download do PNG
        });
    }
