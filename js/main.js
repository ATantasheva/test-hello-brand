"use strict"
//код для определения на каком усройтве открыт сайт
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};
// проверяем усл где открыт сайт и доб определенный класс
if (isMobile.any()) {
   document.body.classList.add('_touch');
} else {
   document.body.classList.add('_pc');
}

//Меню бургер

const htmlEl = document.documentElement;
const headEl = document.head;
const bodyEl = document.body;
console.log(bodyEl);
const header = document.querySelector('.header');


//получаем меню nav
const menuBody = document.querySelector('.menu__body');
console.log(menuBody);
//получаем бургер-меню
const menuIcon = document.querySelector('.menu__icon');
console.log(menuIcon);

//проверяем есть ли меню-бургер
if(menuIcon) {
//вешаем событие клик
   menuIcon.addEventListener('click', function(e) {
      //запрет скролла страницы под меню
      document.body.classList.toggle('lock');
      menuIcon.classList.toggle('active');
      menuBody.classList.toggle('active');
      console.log('клик');
   } );
   }
   //закрытие меню 
   //созд конст menuLinks которая будет искать класс .menu__link
const menuLinks = document.querySelectorAll('.menu__link');
//условие menuLinks существует
if (menuLinks) {
   //циклом перебираем все классы .menu__link
	menuLinks.forEach(menuLink => {
      //вешаем событие клик и функцию
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
      // при клике на конкретный линк
		const menuLink = e.target;
	// при условии что бургер актив
			if (menuIcon.classList.contains('active')) {
            //удаляем классы и меню боди уезжает
				document.body.classList.remove('lock');
				menuIcon.classList.remove('active');
				menuBody.classList.remove('active');
			}
		}
	}
   //поп-ап

   const popupLinks = document.querySelector('.popup-link');
   const popupShow = document.querySelector('.popup');
   console.log(popupShow);
   const body = document.querySelector('body');
   
   
   popupLinks.addEventListener('click', function(e) {
    body.classList.add('lock');
      popupShow.classList.add('open');
   });
   //закрытие поп-ап
   const popupCloseSend = document.querySelectorAll('.close-popup');
   console.log(popupCloseSend);
   popupCloseSend.forEach(close => {
      close.addEventListener('click' ,function () {
         if(popupShow.classList.contains('open')) {
            body.classList.remove('lock');
         popupShow.classList.remove('open');
         }
      })
   })
 
  //обработка формы

//для попап - конверт - обратная связь
//проверка что документ загружен
document.addEventListener('DOMContentLoaded', function () {
	//получаем всю форму в константу по id
   const form = document.getElementById('form');
	//вешаем событие submit и функцию formSend
   form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault(); //запрещаем стандартн поведение 'submit'

		let error = formValidate(form);
     let formData = new FormData(form);


//проверка  перед отправкой формы
if (error === 0) { 
   form.classList.add('_sending'); //доб класс - идет отправка формы
    let response = await fetch('sendmail.php', {
      method: 'POST',
      body: formData
   });
   if (response.ok) { //если все ок
      let result = await response.json(); //возвращается как ответ response.json
      alert(result.message);
      // formPreview.innerHTML = ''; очитска формы при отправке
      form.reset(); // очищаем поля формы 
      form.classList.remove('_sending');  //убираем класс отправки формы после того как отправилась
      body.classList.remove('lock');
         popupShow.classList.remove('open');
   } else {
      alert("Ошибка. Попробуйте еще раз!");
   form.classList.remove('_sending');
   } 
} else {
   alert('Заполните обязательные поля');
}

        //валидация (проверка заполненности полей)
      function formValidate(form) {
         let error = 0;
         //всем обязательным полям класс _req
         let formReq = document.querySelectorAll('.req');
   //цикл - будем проверять заполнено ли поле
   //бегаем по всем этим полям и получаем в конст кажд инпут
         for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            //изначлаьно удаляем класс Error
            formRemoveError(input);
   
            //проверка e-mail
            if (input.classList.contains('email')) {
                     //проверка по функции теста email
               if (emailTest(input)) {
                  
                  formAddError(input); 
                  error++; 
                  alert('Заполните обязательные поля. Например: example@gmail.com');
               }
            }  else { //если пустое поле
               if (input.value === '') {
                  formAddError(input); //вешаем ошибку
                  error++;   
                  alert('Заполните обязательные поля. Например: example@gmail.com');
               }
            }
           
               
           
         }
         return error; //возврашаем значение 
      }
      // функции удалить добавить класс Error на элемент и родителя
      function formAddError(input) {
         input.parentElement.classList.add('_error');
         input.classList.add('_error');
      }
      function formRemoveError(input) {
         input.parentElement.classList.remove('_error');
         input.classList.remove('_error');
      }
      //Функция теста email
      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }

   }
});   
