window.addEventListener('DOMContentLoaded', () => {
   //Tabs
   const tabs = document.querySelectorAll('.tabheader__item');
   const tabsContent = document.querySelectorAll('.tabcontent');
   const tabsParent = document.querySelector('.tabheader__items');

   function hideTabContent() {
      tabsContent.forEach((item) => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });

      tabs.forEach((tab) => {
         tab.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (e) => {
      const target = e.target;

      if (target?.classList.contains('tabheader__item')) {
         tabs.forEach((tab, i) => {
            if (target == tab) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });

   //Timer
   const deadline = '2023-12-31';

   function getTimeRemaining(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date());
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      const hours = Math.floor(((t / (1000 * 60 * 60)) % 24) - 3);
      const minutes = Math.floor((t / (1000 * 60)) % 60);
      const seconds = Math.floor((t / 1000) % 60);

      return {
         total: t,
         days: days,
         hours: hours,
         minutes: minutes,
         seconds: seconds,
      };
   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector);
      const days = timer.querySelector('#days');
      const hours = timer.querySelector('#hours');
      const minutes = timer.querySelector('#minutes');
      const seconds = timer.querySelector('#seconds');
      const timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
         const t = getTimeRemaining(endtime);

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }

   setClock('.timer', deadline);

   //Modal
   const modalTriggers = document.querySelectorAll('[data-modal]');
   const modal = document.querySelector('.modal');

   modalTriggers.forEach((btn) => {
      btn.addEventListener('click', openModal);
   });

   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') === '') {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
      }
   });

   const modalTimerId = setTimeout(openModal, 50000);

   window.addEventListener('scroll', showModalByScroll);

   function openModal() {
      modal.classList.add('show');
      document.body.classList.add('no-scroll');
      clearInterval(modalTimerId);
   }

   function closeModal() {
      modal.classList.remove('show');
      document.body.classList.remove('no-scroll');
   }

   function showModalByScroll() {
      if (
         window.scrollY + document.documentElement.clientHeight >=
         document.documentElement.scrollHeight
      ) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   //Classes for cards
   class MenuCard {
      constructor(src, alt, title, desc, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.desc = desc;
         this.price = price;
         this.transfer = 102;
         this.parent = document.querySelector(parentSelector);
         this.classes = classes;
         this.changeToRUB();
      }

      changeToRUB() {
         this.price *= this.transfer;
      }

      render() {
         const element = document.createElement('div');

         if (this.classes.length === 0) {
            this.classes = 'menu__item';
            element.classList.add(this.classes);
         } else {
            this.classes.forEach((className) =>
               element.classList.add(className)
            );
         }

         element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.desc}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> руб./день</div>
            </div>
         `;
         this.parent.append(element);
      }
   }

   const getResource = async (url) => {
      const res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      return await res.json();
   };

   getResource('http://localhost:3000/menu').then((data) => {
      data.forEach(({ img, altimg, title, descr, price }) => {
         new MenuCard(
            img,
            altimg,
            title,
            descr,
            price,
            '.menu .container'
         ).render();
      });
   });

   // axios.get('http://localhost:3000/menu').then((data) => {
   //    data.data.forEach(({ img, altimg, title, descr, price }) => {
   //       new MenuCard(
   //          img,
   //          altimg,
   //          title,
   //          descr,
   //          price,
   //          '.menu .container'
   //       ).render();
   //    });
   // });

   // getResource('http://localhost:3000/menu').then((data) => createCard(data));

   // function createCard(data) {
   //    data.forEach(({ img, altimg, title, descr, price }) => {
   //       const element = document.createElement('div');
   //       element.classList.add('menu__item');
   //       element.innerHTML = `
   //          <img src=${img} alt=${altimg}>
   //          <h3 class="menu__item-subtitle">${title}</h3>
   //          <div class="menu__item-descr">${descr}</div>
   //          <div class="menu__item-divider"></div>
   //          <div class="menu__item-price">
   //             <div class="menu__item-cost">Цена:</div>
   //             <div class="menu__item-total"><span>${price}</span> руб./день</div>
   //          </div>
   //       `;
   //       document.querySelector('.menu .container').append(element);
   //    });
   // }

   //Forms
   const forms = document.querySelectorAll('form');
   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...',
   };

   forms.forEach((item) => {
      bindPostData(item);
   });

   const postData = async (url, data) => {
      const res = await fetch(url, {
         method: 'POST',
         body: data,
         headers: {
            'Content-type': 'application/json',
         },
      });

      return await res.json();
   };

   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
            display: block;
            margin: 10px auto 0;
         `;
         form.after(statusMessage);

         const formData = new FormData(form);

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         postData('http://localhost:3000/requests', json)
            .then((data) => {
               console.log(data);
               showThanksModal(message.success);
            })
            .catch(() => {
               showThanksModal(message.failure);
            })
            .finally(() => {
               form.reset();
               statusMessage.remove();
            });
      });
   }

   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
         <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
         </div>
      `;

      document.querySelector('.modal').append(thanksModal);

      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.remove('hide');
         closeModal();
      }, 4000);
   }

   //Slider
   const slides = document.querySelectorAll('.offer__slide');
   const slider = document.querySelector('.offer__slider');
   const prev = document.querySelector('.offer__slider-prev');
   const next = document.querySelector('.offer__slider-next');
   const slidesWrapper = document.querySelector('.offer__slider-wrapper');
   const slidesField = document.querySelector('.offer__slider-inner');
   const width = window.getComputedStyle(slidesWrapper).width;
   let total = document.querySelector('#total');
   let current = document.querySelector('#current');
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

   //Calculator
   const result = document.querySelector('.calculating__result span');

   let sex, height, weight, age, ratio;

   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
   }

   if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
   }

   function initLocalSettings(
      selector,
      activeClass = 'calculating__choose-item_active'
   ) {
      const elements = document.querySelectorAll(selector);

      elements.forEach((el) => {
         el.classList.remove(activeClass);
         if (el.getAttribute('id') === localStorage.getItem('sex')) {
            el.classList.add(activeClass);
         }

         if (el.dataset.ratio === localStorage.getItem('ratio')) {
            el.classList.add(activeClass);
         }
      });
   }

   initLocalSettings('#gender div');
   initLocalSettings('.calculating__choose_big div');

   function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = '____';
         return;
      }

      if (sex === 'female') {
         result.textContent = Math.round(
            (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
         );
      } else {
         result.textContent = Math.round(
            (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
         );
      }
   }

   calcTotal();

   function getStaticInformation(
      selector,
      activeClass = 'calculating__choose-item_active'
   ) {
      const elements = document.querySelectorAll(selector);

      elements.forEach((el) => {
         el.addEventListener('click', (e) => {
            if (e.target.dataset.ratio) {
               ratio = +e.target.dataset.ratio;
               localStorage.setItem('ratio', +e.target.dataset.ratio);
            } else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', e.target.getAttribute('id'));
            }

            elements.forEach((el) => el.classList.remove(activeClass));
            e.target.classList.add(activeClass);

            calcTotal();
         });
      });
   }

   getStaticInformation('#gender div');
   getStaticInformation('.calculating__choose_big div');

   function getDynamicInformation(selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {
         if (input.value.match(/\D/gi)) {
            input.style.border = '2px solid red';
         } else {
            input.style.border = 'none';
         }

         switch (input.getAttribute('id')) {
            case 'height':
               height = +input.value;
               break;
            case 'weight':
               weight = +input.value;
               break;
            case 'age':
               age = +input.value;
               break;
         }

         calcTotal();
      });
   }

   getDynamicInformation('#height');
   getDynamicInformation('#weight');
   getDynamicInformation('#age');
});
