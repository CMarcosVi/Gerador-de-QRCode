    document.getElementById('inputNumber').addEventListener('input', function(event) {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length > 11) {
            this.value = this.value.slice(0, 11);
        }
    });
    document.getElementById('inputMensagem').addEventListener('input', function(event) {
        this.value = this.value.replace(/<[^>]*>/g, '');
        this.value = this.value.replace(/[^\w\sá-úÁ-Ú]/g, ''); 
    });
    function gerarLinkWpp(){
        const numberPhone = document.getElementById('inputNumber').value;
        const mensagemWpp = document.getElementById('inputMensagem').value;
        const linkGenerator = document.getElementById('linkGenerator');

        if(!numberPhone){
            return false
        }
        if(!mensagemWpp){
            return false
        }
        linkGenerator.innerHTML = `https://api.whatsapp.com/send?phone=${numberPhone}&text=${mensagemWpp}`;

    }
    const btnGenertorWpp = document.getElementById("btnGenerator");
    btnGenertorWpp.addEventListener("click", () => {
        gerarLinkWpp()
    })

    function gerarQRCode() {
            const texto = document.getElementById('inputText').value;
            
            if (!texto) {
                alert("Por favor, insira um texto para gerar o QR Code.");
                return;
            }
            
            const qrCodeImage = document.getElementById('qrCodeImage');
            const downloadLink = document.getElementById('downloadLink');
            
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

                    // Criando o Blob para o download
                    const blob = new Blob([svg], { type: 'image/svg+xml' });
                    const url = URL.createObjectURL(blob);
                    
                    // Atualizando o link de download
                    downloadLink.href = url;
                    downloadLink.style.display = "inline"; // Exibindo o link de download
                }
            });
        }
