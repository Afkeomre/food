function calculator() {
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
}

export default calculator;
