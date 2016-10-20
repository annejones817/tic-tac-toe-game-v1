$(document).ready(function(event){
////Declare variables and set for first game
	var cellStates = [];
	var	game = {
		lastPlayer: 'O',
		};
	var	counter=0;
	var	turnCounter=0;
	var	winner='';
	createCellStates(3, 3);

////Create Initial cell states object
	function createCellStates(rows, columns) {
		for (var i=0; i<rows; i++) {
			cellStates.push([]);
		}
		cellStates.forEach(function(element){
			for (var j=0; j<columns; j++){
				element.push(0);
			}
		});
	}

/////Return index of a given cell
	function getCellIndex(cell) {
		var indexOne;
		var indexTwo;
		if (cell.parent().attr('class').split(' ')[0]==='top') {
			indexOne = 0;
		} else if (cell.parent().attr('class').split(' ')[0]==='middle') {
			indexOne = 1;
		} else {
			indexOne = 2;
		}

		var cellPosition = cell.attr('class').split(' ')[1];
		if (cellPosition==='left') {
			indexTwo = 0;
		} else if (cellPosition==='center') {
			indexTwo = 1;
		} else {
			indexTwo = 2;
		}	
		return [indexOne, indexTwo];
	}

//////Check whether all array elements are equal to the last player
	function arraySameValue(value) {
		return value == game.lastPlayer; 
	}

/////Handle winner
	function handleWinner() {
		$('header').append('<span class="winner">'+game.lastPlayer+ ' wins!</span>');
		winner=game.lastPlayer;
	}	

/////Check whether a player has won via column
	function columnCheck(player) {
		for (var j=0; j<cellStates[0].length; j++) {	
			var col=[];
			for (var i=0; i<cellStates.length; i++) {
				col.push(cellStates[i][counter]);
			}
			if (col.every(arraySameValue)) {
				handleWinner();
				return;
			}
		if (counter<2){
			counter++
			} else {counter=0}	
		}

	}

/////Check whether a player has won via row
	function rowCheck(player){
		for (var i=0; i<cellStates.length; i++){
			if (cellStates[i].every(arraySameValue)) {
				handleWinner();
				return;
			}
		}	
	}

//////Check whether a player has won via diagonal
	function diagonalCheck(player){
		var diag1 = []; 
		var diag2= [];
		for (var i=0; i<cellStates.length; i++) {
			diag1.push(cellStates[i][i]);
		}
		if (diag1.every(arraySameValue)) {
			handleWinner();
			return;
		}
		for (var j=0; j<cellStates.length; j++) {
			diag2.push(cellStates[j][2-j]);
		}
		if (diag2.every(arraySameValue)) {
			handleWinner();
			return;
		}
	}	

///////Event Listeners////////////////////////////
//////Start game
	$('.start-game-button').click(function(event){
		cellStates = [];
		game = {
		lastPlayer: 'O',
		};
		counter=0;
		turnCounter=0;
		winner='';
		//reset board
		$('.winner').remove();
		$('.tie').remove();
		$('.cell').text('');
		//create new cell states
		createCellStates(3, 3);
	});	

//////Handle cell clicks
	$('.cell').click(function(event){
		if (turnCounter<10 && winner=='') {		
				var cellIndex = getCellIndex($(this));
				if (cellStates[cellIndex[0]][cellIndex[1]] === 0) {
					if (game.lastPlayer==='O') {
							$(this).text('X');
							game.lastPlayer = 'X';
						} else {
							$(this).text('O');
							game.lastPlayer = 'O';
						}
					cellStates[cellIndex[0]][cellIndex[1]] = $(this).text();		
					turnCounter++; 
				} 			
				rowCheck(game.lastPlayer);
				columnCheck(game.lastPlayer);
				diagonalCheck(game.lastPlayer);
				
				
		} if (turnCounter==9 && winner=='') {	
			$('header').append('<span class="tie">The game is over! It is a tie.</span>');
			winner='tie';
		}	
	});
});

