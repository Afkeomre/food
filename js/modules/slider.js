function slider({
   container,
   slide,
   nextArrow,
   prevArrow,
   totalCounter,
   currentCounter,
   wrapper,
   field,
}) {
   const slides = document.querySelectorAll(slide);
   const slider = document.querySelector(container);
   const prev = document.querySelector(prevArrow);
   const next = document.querySelector(nextArrow);
   const slidesWrapper = document.querySelector(wrapper);
   const slidesField = document.querySelector(field);
   const width = window.getComputedStyle(slidesWrapper).width;
   let total = document.querySelector(totalCounter);
   let current = document.querySelector(currentCounter);
   let slideIndex = 1;
   let offset = 0;

   if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
   } else {
      total.textContent = slides.length;
   }

   setCurrent();

   slidesField.style.width = 100 * slides.length + '%';
   slidesField.style.display = 'flex';
   slidesField.style.transition = '0.5s all';

   slidesWrapper.style.overflow = 'hidden';

   slides.forEach((slide) => {
      slide.style.width = width;
   });

   slider.style.position = 'relative';

   const indicators = document.createElement('ol');
   let dots = [];
   indicators.classList.add('carousel-indicators');
   slider.append(indicators);

   for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');

      if (i == 0) {
         dot.style.opacity = 1;
      }

      indicators.append(dot);
      dots.push(dot);
   }

   next.addEventListener('click', () => {
      if (offset == parseInt(width) * (slides.length - 1)) {
         offset = 0;
      } else {
         offset += parseInt(width);
      }

      transformSlidesField();

      if (slideIndex == slides.length) {
         slideIndex = 1;
      } else {
         slideIndex++;
      }

      setCurrent();
      changeDot();
   });

   prev.addEventListener('click', () => {
      if (offset == 0) {
         offset = parseInt(width) * (slides.length - 1);
      } else {
         offset -= parseInt(width);
      }

      transformSlidesField();

      if (slideIndex == 1) {
         slideIndex = slides.length;
      } else {
         slideIndex--;
      }

      setCurrent();
      changeDot();
   });

   dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.dataset.slideTo;
         slideIndex = slideTo;
         offset = parseInt(width) * (slideTo - 1);

         transformSlidesField();
         setCurrent();
         changeDot();
      });
   });

   function setCurrent() {
      if (slideIndex < 10) {
         current.textContent = `0${slideIndex}`;
      } else {
         current.textContent = slideIndex;
      }
   }

   function changeDot() {
      dots.forEach((dot) => (dot.style.opacity = '.5'));
      dots[slideIndex - 1].style.opacity = 1;
   }

   function transformSlidesField() {
      slidesField.style.transform = `translateX(-${offset}px)`;
   }
}

export default slider;
