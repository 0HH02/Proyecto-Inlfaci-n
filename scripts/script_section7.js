document.querySelector('.div-click').addEventListener('click', function() {
    document.querySelector('.div-destino').classList.remove('displayNone');
    document.querySelector('.div-destino').scrollIntoView({ behavior: 'smooth' });
});
