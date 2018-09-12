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

	// Methods for Column function
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

	// Methods fo Card function
	Card.prototype = {
		removeCard: function () {
			this.element.parentNode.removeChild(this.element);
		}
	}

	// Object of board
	var board = {
		name: 'Kanban Board',
		addColumn: function (column) {
			this.element.appendChild(column.element);
			initSortable(column.id);
		},
		element: document.querySelector('#board .column-container')
	}

	// initSortable function
	function initSortable(id) {
		var el = document.getElementById(id);
		var sortable = Sortable.create(el, {
			group: 'kanban',
			sort: true
		});
	}

	// addEventListener for create new column
	document.querySelector('#board .create-column').addEventListener('click', function () {
		var name = prompt('Enter a column name');
		var column  = new Column(name);
		board.addColumn(column);
	});

// Creating defaults column and cards

	// Creating columns
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// Adding columns to the board
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// Creating cards
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// Adding cards to columns
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
});