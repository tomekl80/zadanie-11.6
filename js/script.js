'use scrict';

document.addEventListener('DOMContentLoaded', function(){

	// ID generating
	function randomString(){
		var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var str = '';
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	// Generate Mustache template
	function generateTemplate(name, data, basicElement) {
		var template = document.getElementById(name).innerHTML;
		var element = document.createElement(basicElement || 'div');

		Mustache.parse(template);
		element.innerHTML = Mustache.render(template, data);

		return element;
	}
	// Columns class
	function Column(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.element = generateTemplate('column-template', {name: this.name});

		this.element.querySelector('.column').addEventListener('click', function (event) {
			if (event.tatget.classList.contains('btn-delete')) {
				self.removeColumn();
			}

			if (event.target.classList.contains('add-card')) {
				self.addCard(new Card(prompt('Enter the name of the card')));
			}
		})
	}

	// Methods for Class function
	Column.prototype = {
		addCard: function(card) {
			this.element.querySelector('ul').appendChild(card.element);
		},
		removeColumn: function () {
			this.element.parentNode.removeChild(this.element);
		}
	};

	// Cards class
	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.element = generateTemplate('card-template', {description: this.description}, 'li');

		this.element.querySelector('.card').addEventListener('click', function (event) {
			event.stopPropagation();

			if (event.target.classList.contains('btn-delete')) {
				self.removeCard();
			}
		});
	}
});