function gerarQRCode() {
    const texto = document.getElementById('inputText').value;
    
    if (!texto) {
        alert("Por favor, insira um texto para gerar o QR Code.");
        return;
    }
    const qrCodeImage = document.getElementById('qrCodeImage');
    
    QRCode.toDataURL(texto, {
        errorCorrectionLevel: 'H',
        type: 'image/svg',
        color: {
            dark: '#000000',
            light: '#0000'
        }
    }, (err, url) => {
        if (err) {
            console.error(err);
        } else {
            qrCodeImage.src = url;
            qrCodeImage.style.display = "block";
        }
    });
}
