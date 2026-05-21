document.addEventListener('DOMContentLoaded', function () {
  var downloadCards = document.querySelectorAll('.opt-card[href^="https://huggingface.co"], .opt-pack-btn[href^="https://huggingface.co"]');

  downloadCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      var fileUrl = this.getAttribute('href');
      var fileName = fileUrl.split('/').pop().split('?')[0];

      this.style.opacity = '0.7';
      this.style.pointerEvents = 'none';

      fetch(fileUrl)
        .then(function (response) {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.blob();
        })
        .then(function (blob) {
          var blobUrl = window.URL.createObjectURL(blob);
          var tempLink = document.createElement('a');
          tempLink.href = blobUrl;
          tempLink.download = fileName;
          tempLink.style.display = 'none';
          document.body.appendChild(tempLink);
          tempLink.click();
          setTimeout(function () {
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobUrl);
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
          }, 100);
        })
        .catch(function (error) {
          console.error('Error descargando archivo:', error);
          alert('Error al descargar el archivo. Por favor, intenta de nuevo.');
          card.style.opacity = '1';
          card.style.pointerEvents = 'auto';
        });
    });
  });
});