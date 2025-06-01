//carousel scrolling on click and drag//
const container = document.querySelector('.carousel-container');

let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
  isDown = true;
  container.classList.add('dragging');
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener('mouseleave', () => {
  isDown = false;
  container.classList.remove('dragging');
});

container.addEventListener('mouseup', () => {
  isDown = false;
  container.classList.remove('dragging');
});

container.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fastness
  container.scrollLeft = scrollLeft - walk;
});


//hjerte ikon skifter svg ved click//
const hearts = document.querySelectorAll('.hjerte-overlay');

hearts.forEach((heart) => {
  heart.addEventListener('click', () => {
    const isFavorite = heart.classList.toggle('favorited');
    
    // Swap the image source depending on the state
    if (isFavorite) {
      heart.src = './svg/HEART_FILLED.svg';
      heart.alt = 'Remove from favorites';
    } else {
      heart.src = './svg/HEART.svg';
      heart.alt = 'Add to favorites';
    }
  });
});