


window.addEventListener('scroll', () => {

    const section = document.getElementById('section2');
    const container = document.getElementsByClassName('container-section2')[0];


    if (container.getBoundingClientRect().top <= 0) {
        section.classList.add('fixed2');
    }else if (container.getBoundingClientRect().bottom >= window.innerHeight) {
        section.classList.remove('fixed2');
      }
      else{
        section.classList.remove('fixed2');
      }
});