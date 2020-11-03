(()=>{"use strict";(()=>{const e=document.querySelector(".map"),n=e.querySelector(".map__pin--main"),t=document.querySelector(".ad-form"),o=document.querySelector(".map__filters"),a={width:n.offsetWidth,height:n.offsetHeight},i={X:n.style.left,Y:n.style.top},s={x:n.offsetLeft,y:n.offsetTop};window.constants={LEFT_MOUSE_BUTTON:[0,4],ENTER_KEY:"Enter",ESC_KEY:"Escape",PIN_POINTER_HEIGHT:18,MAX_PIN_ON_MAP:5,DEBOUNCE_INTERVAL:1500,mapDragArea:{Y:{TOP:130,BOTTOM:630},X:{LEFT:0,RIGHT:1200}},minPrice:{bungalow:0,flat:1e3,house:5e3,palace:1e4},priceLimits:{LOW:1e4,HIGH:5e4},adForm:t,map:e,mapPinMain:n,featuresClasses:{wifi:"popup__feature--wifi",dishwasher:"popup__feature--dishwasher",parking:"popup__feature--parking",washer:"popup__feature--washer",elevator:"popup__feature--elevator",conditioner:"popup__feature--conditioner"},mainPinSize:a,mainPinLocation:s,typesOfAccommodation:{palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},initialMainPinLocation:i,mapFilter:o,pinsData:[]}})(),(()=>{let e;window.util={getRandomFromNumbers:(e,n)=>Math.floor(Math.random()*(n-e))+e,getRandomFromArray:(e,n)=>e.sort((()=>Math.random()-Math.random())).slice(0,n),declension:(e,n)=>e[n%100>4&&n%100<20?2:[2,0,1,1,1,2][n%10<5?n%10:5]],setInputValue:(e,n)=>{e.value=n},checkFormValidation:e=>{Array.from(e.elements).forEach((e=>{(e=>{let n="";(e.minLength||e.maxLength)&&(n=window.util.declension(["символ","символа","символов"],e.value.length)),e.required&&e.validity.valueMissing?e.setCustomValidity("Пожалуйста, заполните это поле."):e.minLength&&e.validity.tooShort?e.setCustomValidity(`Пожалуйста введите минимум ${e.minLength} ${n} (введено ${e.value.length} ${n})`):e.maxLength&&e.validity.tooShort?e.setCustomValidity(`Пожалуйста введите максимум ${e.maxLength} ${n} (введено ${e.value.length} ${n})`):e.min&&e.validity.rangeUnderflow?e.setCustomValidity("Минимальное значение "+e.min):e.max&&e.validity.rangeOverflow?e.setCustomValidity("Максимальное значение "+e.max):e.setCustomValidity("")})(e)}))},debounce:n=>{e&&window.clearTimeout(e),e=window.setTimeout(n,window.constants.DEBOUNCE_INTERVAL)}}})(),(()=>{const e=e=>{const n="Пожалуйста, перегрузите страницу";let t;switch(e){case 400:t="Неверный запрос. "+n;break;case 401:t="Пользователь не авторизован.";break;case 403:t="Доступ запрещен.";break;case 404:t="Ничего не найдено.";break;default:t=`${e}. ${n}`}return t};window.errors={renderErrorNode:n=>{const t=document.createElement("div");t.classList.add("error","error-message"),t.textContent=e(n),document.body.insertAdjacentElement("afterbegin",t)},setErrorMessage:e}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking",n="https://21.javascript.pages.academy/keksobooking/data",t=(t,o,a,i=null)=>{const s=new XMLHttpRequest;s.responseType="json",s.addEventListener("load",(()=>{200===s.status?"GET"===t?o(s.response):o():a(s.status)})),s.addEventListener("error",(()=>{a("Произошла ошибка соединения")})),s.addEventListener("timeout",(()=>{a(`Запрос не успел выполниться за ${s.timeout} мс`)})),s.timeout=1e4,"GET"===t?s.open(t,n):"POST"===t&&s.open(t,e),s.send(i)};window.backend={load:(e,n)=>{t("GET",e,n)},save:(e,n,o)=>{t("POST",e,n,o)}}})(),(()=>{const e=document.querySelector(".map__filters"),n=e.querySelector("#housing-type"),t=e.querySelector("#housing-price"),o=e.querySelector("#housing-rooms"),a=e.querySelector("#housing-guests"),i=e.querySelector(".map__features");window.filters={applyAll:e=>e.filter((e=>{return s=e,("any"===n.value||n.value===s.offer.type)&&(e=>"any"===t.value||"low"===t.value&&e.offer.price<window.constants.priceLimits.LOW||"middle"===t.value&&e.offer.price>=window.constants.priceLimits.LOW&&e.offer.price<=window.constants.priceLimits.HIGH||"high"===t.value&&e.offer.price>window.constants.priceLimits.HIGH)(e)&&(e=>"any"===o.value||+o.value===e.offer.rooms)(e)&&(e=>"any"===a.value||+a.value===e.offer.guests)(e)&&(e=>{const n=i.querySelectorAll(".map__checkbox:checked");if(0===n.length)return!0;let t=!0;return n.forEach((n=>{e.offer.features.includes(n.value)||(t=!1)})),t})(e);var s})).slice(0,window.constants.MAX_PIN_ON_MAP),onMapFilterChange:()=>{window.map.deletePinsOnMap(),window.card.removeCard(),window.util.debounce(window.map.renderPinsOnMap(window.filters.applyAll(window.constants.pinsData)))}}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin"),n=[],t=(e,n)=>({x:e.x-Math.floor(n.width/2),y:e.y-n.height-window.constants.PIN_POINTER_HEIGHT});window.pin={pins:n,setPin:o=>{const a=e.cloneNode(!0),i={width:a.style.width,height:a.style.height},s=t(o.location,i);return a.style.left=s.x+"px",a.style.top=s.y+"px",a.querySelector("img").src=o.author.avatar,a.querySelector("img").alt=o.author.title,a.addEventListener("click",(()=>{window.map.renderCardOnMap(o)})),a.addEventListener("keydown",(e=>{e.code===window.constants.ENTER_KEY&&(e.preventDefault(),window.map.renderCardOnMap(o))})),n.push(a),a},getPinLocation:t}})(),window.dragging={draggingMainPin:e=>{e.preventDefault();let n={x:e.clientX,y:e.clientY};const t=e=>{e.preventDefault();const t=n.x-e.clientX,o=n.y-e.clientY;n={x:e.clientX,y:e.clientY};const a=window.constants.mapPinMain.offsetLeft-t,i=window.constants.mapPinMain.offsetTop-o,s=window.constants.mapDragArea.Y.TOP-(window.constants.mapPinMain.offsetHeight+window.constants.PIN_POINTER_HEIGHT),r=window.constants.mapDragArea.Y.BOTTOM-(window.constants.mapPinMain.offsetHeight+window.constants.PIN_POINTER_HEIGHT),d=window.constants.mapDragArea.X.LEFT-Math.floor(window.constants.mapPinMain.offsetWidth/2),c=window.constants.mapDragArea.X.RIGHT-Math.floor(window.constants.mapPinMain.offsetWidth/2);i>=s&&i<=r&&(window.constants.mapPinMain.style.top=i+"px"),a>=d&&a<=c&&(window.constants.mapPinMain.style.left=a+"px"),window.form.setAddress(a+Math.floor(window.constants.mapPinMain.offsetWidth/2),i+(window.constants.mapPinMain.offsetHeight+window.constants.PIN_POINTER_HEIGHT))},o=e=>{e.preventDefault(),document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",o)};document.addEventListener("mousemove",t),document.addEventListener("mouseup",o)}},(()=>{const e=e=>{e.key===window.constants.ENTER_KEY&&(e.preventDefault(),window.page.activatedPage(e))},n=e=>{window.constants.LEFT_MOUSE_BUTTON.includes(e.button)&&(e.preventDefault(),window.page.activatedPage())};window.constants.mapPinMain.addEventListener("mousedown",window.dragging.draggingMainPin),window.constants.mapPinMain.addEventListener("click",n),window.constants.mapPinMain.addEventListener("keydown",e),window.mainPin={onMainPinMouseClick:n,onMainPinEnterDown:e}})(),(()=>{const e=window.constants.map.querySelector(".map__filters-container");window.map={renderPinsOnMap:e=>{const n=window.constants.map.querySelector(".map__pins"),t=document.createDocumentFragment();window.util.getRandomFromArray(e).forEach((e=>{t.appendChild(window.pin.setPin(e))})),n.appendChild(t)},deletePinsOnMap:()=>{window.pin.pins.length>0&&window.pin.pins.forEach((e=>{e.remove()}))},renderCardOnMap:n=>{window.card.removeCard(),window.constants.map.insertBefore(window.card.setCard(n),e)}}})(),window.success={successHandler:e=>{window.constants.pinsData=e,window.map.renderPinsOnMap(window.filters.applyAll(window.constants.pinsData))}},(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),n=document.createDocumentFragment(),t=()=>{const e=window.constants.map.querySelector(".map__card");window.constants.map.contains(e)&&e.remove()},o=()=>{t(),document.removeEventListener("keydown",a)},a=e=>{e.code===window.constants.ESC_KEY&&t()};window.card={setCard:t=>{const i=e.cloneNode(!0),{title:s,address:r,price:d,type:c,rooms:w,guests:m,checkin:l,checkout:p,description:u,features:v,photos:y}=t.offer,f=window.util.declension(["комната","комнаты","комнат"],w),E=window.util.declension(["гостя","гостей","гостей"],m);return i.querySelector(".popup__title").textContent=s,i.querySelector(".popup__text--address").textContent=r,i.querySelector(".popup__text--price").firstChild.textContent=d+"₽",i.querySelector(".popup__type").textContent=window.constants.typesOfAccommodation[c],i.querySelector(".popup__text--capacity").textContent=`${w} ${f} для ${m} ${E}`,i.querySelector(".popup__text--time").textContent=`Заезд после ${l} выезд до ${p}`,i.querySelector(".popup__description").textContent=u,((e,n)=>{n.innerHTML="",e.forEach((e=>{const t=document.createElement("li");t.classList.add("popup__feature",window.constants.featuresClasses[e]),n.appendChild(t)}))})(v,i.querySelector(".popup__features")),((e,t)=>{const o=t.querySelector(".popup__photo");let a;t.innerHTML="",e.forEach((e=>{a=o.cloneNode(!1),a.src=e,n.appendChild(a)})),t.appendChild(n)})(y,i.querySelector(".popup__photos")),i.querySelector(".popup__avatar").src=t.author.avatar,i.querySelector(".popup__close").addEventListener("click",o),document.addEventListener("keydown",a),i},removeCard:t}})(),(()=>{const e=document.querySelector("#success").content.querySelector(".success"),n=document.querySelector("#error").content.querySelector(".error"),t=()=>{100===parseInt(window.constants.adForm.rooms.value,10)&&parseInt(window.constants.adForm.capacity.value,10)>0?window.constants.adForm.capacity.setCustomValidity("Не для гостей"):parseInt(window.constants.adForm.rooms.value,10)<parseInt(window.constants.adForm.capacity.value,10)?window.constants.adForm.capacity.setCustomValidity("На всех гостей комнат не хватит"):100===parseInt(window.constants.adForm.rooms.value,10)||parseInt(window.constants.adForm.capacity.value,10)?window.constants.adForm.capacity.setCustomValidity(""):window.constants.adForm.capacity.setCustomValidity("Для гостей")},o=()=>{const e=parseInt(window.constants.adForm.rooms.value,10);Array.from(window.constants.adForm.capacity.options).forEach((n=>{const t=parseInt(n.value,10);n.disabled=100===e?!!t:e<t||!t}))},a=()=>{window.constants.adForm.capacity.value=window.constants.adForm.rooms.value<100?window.constants.adForm.rooms.value:0},i=()=>{a(),o()},s=()=>{t()},r=()=>{window.constants.adForm.timeout.value=window.constants.adForm.timein.value},d=()=>{window.constants.adForm.timein.value=window.constants.adForm.timeout.value},c=()=>{window.constants.adForm.price.min=window.constants.minPrice[window.constants.adForm.type.value],window.constants.adForm.price.placeholder=window.constants.minPrice[window.constants.adForm.type.value]},w=()=>{window.page.setState(!0),window.page.deactivatedPage(),(()=>{const n=e.cloneNode(!0);document.body.appendChild(n);const t=e=>{e.code===window.constants.ESC_KEY&&(e.preventDefault(),document.querySelector(".success").remove(),document.removeEventListener("keydown",t))},o=e=>{e.preventDefault(),document.querySelector(".success").remove(),document.removeEventListener("click",o)};document.addEventListener("keydown",t),document.addEventListener("click",o)})()},m=()=>{(()=>{const e=n.cloneNode(!0);document.body.appendChild(e);const t=e=>{e.code===window.constants.ESC_KEY&&(e.preventDefault(),document.querySelector(".error").remove(),document.removeEventListener("keydown",t))},o=e=>{e.preventDefault(),document.querySelector(".error").remove(),document.removeEventListener("click",o)};document.addEventListener("keydown",t),document.addEventListener("click",o)})()};window.constants.mapFilter.addEventListener("change",window.filters.onMapFilterChange),window.form={setCapacityValue:a,setCapacityDisabled:o,onResetFormClick:()=>{window.page.setState(!0),window.page.deactivatedPage()},onResetFormKeydown:e=>{e.code===window.constants.ENTER_KEY&&(window.page.setState(!0),window.page.deactivatedPage())},setAddress:(e,n)=>{window.constants.adForm.address.value=`${e}, ${n}`},onAdFormSubmit:e=>{e.preventDefault(),window.util.checkFormValidation(window.constants.adForm),window.constants.adForm.checkValidity()&&window.backend.save(w,m,new FormData(window.constants.adForm))},onAdFormSubmitClick:()=>{t(),window.util.checkFormValidation(window.constants.adForm),window.constants.adForm.checkValidity()&&window.backend.save(w,m,new FormData(window.constants.adForm))},addListenersToFields:()=>{window.constants.adForm.capacity.addEventListener("change",s),window.constants.adForm.rooms.addEventListener("change",i),window.constants.adForm.type.addEventListener("change",c),window.constants.adForm.timein.addEventListener("change",r),window.constants.adForm.timeout.addEventListener("change",d)},removeListenersFromFields:()=>{window.constants.adForm.capacity.removeEventListener("change",s),window.constants.adForm.rooms.removeEventListener("change",i),window.constants.adForm.type.removeEventListener("change",c),window.constants.adForm.timein.removeEventListener("change",r),window.constants.adForm.timeout.removeEventListener("change",d)}}})(),(()=>{const e=window.pin.getPinLocation(window.constants.mainPinLocation,window.constants.mainPinSize),n=(e=!0)=>{e?(window.constants.adForm.classList.add("ad-form--disabled"),window.constants.map.classList.add("map--faded"),window.constants.adForm.querySelector(".ad-form__submit").removeEventListener("click",window.form.onAdFormSubmitClick),window.constants.adForm.removeEventListener("submit",window.form.onAdFormSubmit),document.querySelector(".ad-form__reset").removeEventListener("click",window.form.onResetFormClick),document.querySelector(".ad-form__reset").removeEventListener("keydown",window.form.onResetFormKeydown)):(window.constants.adForm.classList.remove("ad-form--disabled"),window.constants.map.classList.remove("map--faded"),window.constants.adForm.querySelector(".ad-form__submit").addEventListener("click",window.form.onAdFormSubmitClick),window.constants.adForm.addEventListener("submit",window.form.onAdFormSubmit),document.querySelector(".ad-form__reset").addEventListener("click",window.form.onResetFormClick),document.querySelector(".ad-form__reset").addEventListener("keydown",window.form.onResetFormKeydown),e=!!window.constants.pinsData.length||e),window.page.setDisabled(window.constants.mapFilter,e)};window.page={activatedPage:()=>{n(!1),window.util.setInputValue(window.constants.adForm.querySelector("#address"),`${e.x}, ${e.y}`),window.form.setCapacityValue(),window.form.setCapacityDisabled(),window.backend.load(window.success.successHandler,window.errors.renderErrorNode),window.constants.adForm.title.focus(),window.constants.adForm.capacity.style.outline="",window.form.addListenersToFields(),window.constants.mapPinMain.removeEventListener("click",window.mainPin.onMainPinMouseClick),window.constants.mapPinMain.removeEventListener("keydown",window.mainPin.onMainPinEnterDown)},deactivatedPage:()=>{n(!0),window.constants.adForm.reset(),window.map.deletePinsOnMap(),window.constants.mapPinMain.style.left=window.constants.initialMainPinLocation.X,window.constants.mapPinMain.style.top=window.constants.initialMainPinLocation.Y,window.util.setInputValue(window.constants.adForm.querySelector("#address"),`${e.x}, ${e.y}`),window.form.removeListenersFromFields(),window.constants.mapPinMain.addEventListener("click",window.mainPin.onMainPinMouseClick),window.constants.mapPinMain.addEventListener("keydown",window.mainPin.onMainPinEnterDown)},setState:n,setDisabled:(e,n=!0)=>{Array.from(e.children).forEach((e=>{e.disabled=n}))}}})(),window.page.setState()})();