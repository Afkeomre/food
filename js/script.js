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
   const modalCloseBtn = document.querySelector('[data-close]');
   const modal = document.querySelector('.modal');

   modalTriggers.forEach((btn) => {
      btn.addEventListener('click', openModal);
   });

   modalCloseBtn.addEventListener('click', closeModal);

   modal.addEventListener('click', (e) => {
      if (e.target === modal) {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
      }
   });

   //const modalTimerId = setTimeout(openModal, 5000);

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
         this.render();
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

   new MenuCard(
      'img/tabs/vegy.jpg',
      'vegy',
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      '.menu .container'
   );

   new MenuCard(
      'img/tabs/elite.jpg',
      'elite',
      'Меню "Премиум"',
      'В меню "Премиум" мы используем </br>не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - </br>ресторанное меню без похода в ресторан!',
      14,
      '.menu .container'
   );

   new MenuCard(
      'img/tabs/post.jpg',
      'post',
      'Меню "Постное"',
      'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      12,
      '.menu .container'
   );
});
