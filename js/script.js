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

   const modalTimerId = setTimeout(openModal, 5000);

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
});