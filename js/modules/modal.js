function openModal(modalSelector, modalTimerId) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('show');
   document.body.classList.add('no-scroll');

   console.log(modalTimerId);
   if (modalTimerId) {
      clearTimeout(modalTimerId);
   }
}

function closeModal(modalSelector) {
   const modal = document.querySelector(modalSelector);
   modal.classList.remove('show');
   document.body.classList.remove('no-scroll');
}

function modal(triggerSelector, modalSelector, modalTimerId) {
   const modalTriggers = document.querySelectorAll(triggerSelector);
   const modal = document.querySelector(modalSelector);

   modalTriggers.forEach((btn) => {
      btn.addEventListener('click', () =>
         openModal(modalSelector, modalTimerId)
      );
   });

   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') === '') {
         closeModal(modalSelector);
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal(modalSelector);
      }
   });

   window.addEventListener('scroll', showModalByScroll);

   function showModalByScroll() {
      if (
         window.scrollY + document.documentElement.clientHeight >=
         document.documentElement.scrollHeight
      ) {
         openModal(modalSelector, modalTimerId);
         window.removeEventListener('scroll', showModalByScroll);
      }
   }
}

export default modal;
export { closeModal };
export { openModal };
