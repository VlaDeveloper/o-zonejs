'use strict';

// чекбокс

function toggleCheckbox() {
	const checkbox = document.querySelectorAll('.filter-check_checkbox');

	checkbox.forEach((element) => {
		element.addEventListener('change', function () {
			if (this.checked === true) {
				this.nextElementSibling.classList.add('checked');
			} else {
				this.nextElementSibling.classList.remove('checked');
			}
		});
	});
}
// end чекбокс

// корзина

function toggleCart() {
	const btnCart = document.getElementById('cart');
	const modalCart = document.querySelector('.cart');
	const closeBtn = document.querySelector('.cart-close');

	btnCart.addEventListener('click', () => {
		modalCart.style.display = 'flex';
		document.body.style.overflow = 'hidden';
	});

	closeBtn.addEventListener('click', () => {
		modalCart.style.display = 'none';
		document.body.style.overflow = '';
	});
}
// end корзина

// работа с корзиной

function addCart() {
	const cards = document.querySelectorAll('.goods .card'),
		cartWrapper = document.querySelector('.cart-wrapper'),
		cartEmpty = document.getElementById('cart-empty'),
		countGoods = document.querySelector('.counter');

	cards.forEach((card) => {
		const btn = card.querySelector('button');

		btn.addEventListener('click', () => {
			const cardClone = card.cloneNode(true);
			cartWrapper.appendChild(cardClone);
			showData();

			const removeBtn = cardClone.querySelector('.btn');
			removeBtn.textContent = 'Удалить из корзины';
			removeBtn.addEventListener('click', () => {
				cardClone.remove();
				showData();
			});
		});
	});

	function showData() {
		const cardsCart = cartWrapper.querySelectorAll('.card'),
			cardsPrice = cartWrapper.querySelectorAll('.card-price'),
			cardTotal = document.querySelector('.cart-total span');
		let sum = 0;
		countGoods.textContent = cardsCart.length;

		cardsPrice.forEach((cardPrice) => {
			let price = parseFloat(cardPrice.textContent);
			sum += price;
		});

		cardTotal.textContent = sum;

		if (cardsCart.length === 0) {
			cartWrapper.appendChild(cartEmpty);
		} else {
			cartEmpty.remove();
		}

	}
}
// end работа с корзиной

// фильтр акции

function actionPage(){

	const cards = document.querySelectorAll('.goods .card'),
				discountCheckbox = document.getElementById('discount-checkbox'),
				min = document.getElementById('min'),
				max = document.getElementById('max'),
				search = document.querySelector('.search-wrapper_input'),
				searchBtn = document.querySelector('.search-btn');

// фильтр по акции. Старый код.
	// discountCheckbox.addEventListener('click', () => {
	// 	cards.forEach((card) => {
	// 		if (discountCheckbox.checked){
	// 			if(!card.querySelector('.card-sale')){
	// 				card.parentNode.style.display = 'none';
	// 			}
	// 		} else {
	// 			card.parentNode.style.display = '';
	// 		}
	// 	});
	// });

// фильтр по цене. Старый код.
	// min.addEventListener('change', filterPrice);
	// max.addEventListener('change', filterPrice);

	// function filterPrice(){
	// 	cards.forEach((card) => {
	// 		const cardPrice = card.querySelector('.card-price');
	// 		const price = parseFloat(cardPrice.textContent);
			
	// 		if ((min.value && price < min.value) || (price > max.value && max.value)){
	// 			card.parentNode.style.display = 'none';
	// 		} else {
	// 			card.parentNode.style.display = '';
	// 		}
	// 	});
	// }

// общий фильтр
min.addEventListener('change', commonFilter);
max.addEventListener('change', commonFilter);
discountCheckbox.addEventListener('click', commonFilter)

function commonFilter(){
	cards.forEach((card) => {
		const cardPrice = card.querySelector('.card-price');
		const price = parseFloat(cardPrice.textContent);

		if (discountCheckbox.checked){
			if(!card.querySelector('.card-sale') || ((min.value && price < min.value) || (price > max.value && max.value))){
				card.parentNode.style.display = 'none';
			} else {
				card.parentNode.style.display = '';
			}
		} else if((min.value && price < min.value) || (price > max.value && max.value)) {
			card.parentNode.style.display = 'none';
		} else {
			card.parentNode.style.display = '';
		}
	});
}

// поиск
	searchBtn.addEventListener('click', () => {
		const searchText = new RegExp(search.value.trim(), 'i');
		cards.forEach((card) => {
			const title = card.querySelector('.card-title');
			if (!searchText.test(title.textContent)) {
				card.parentNode.style.display = 'none';
			} else {
				card.parentNode.style.display = '';
			}
		});
		search.value = '';
	});

}

// end фильтр акции

toggleCheckbox();
toggleCart();
addCart();
actionPage();