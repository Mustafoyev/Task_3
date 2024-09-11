const prompt = require('prompt-sync')();
const CryptoHelper = require('./CryptoHelper');
const HelpTable = require('./HelpTable');

class Game {
	constructor(moves) {
		this.moves = moves;
		this.cryptoHelper = new CryptoHelper();
		this.helpTable = new HelpTable(moves);
	}

	getUserMove() {
		while (true) {
			const input = prompt('Enter your move: ');

			if (input === '0') {
				console.log('Exiting the game. Goodbye!');
				process.exit(0);
			} else if (input === '?') {
				this.helpTable.printTable();
				continue;
			} else {
				const moveIndex = parseInt(input, 10);
				if (
					!isNaN(moveIndex) &&
					moveIndex >= 1 &&
					moveIndex <= this.moves.length
				) {
					return this.moves[moveIndex - 1];
				} else {
					console.log('Invalid input. Please choose a valid move.');
				}
			}
		}
	}

	play() {
		const key = this.cryptoHelper.generateKey();
		const computerMove = this.cryptoHelper.generateComputerMove(this.moves);
		const hmac = this.cryptoHelper.generateHMAC(computerMove, key);

		console.log(`HMAC: ${hmac}`);
		console.log('Available moves:');
		this.moves.forEach((move, index) => {
			console.log(`${index + 1} - ${move}`);
		});
		console.log('0 - exit');
		console.log('? - help');

		const userMove = this.getUserMove();

		console.log(`Your move: ${userMove}`);
		console.log(`Computer move: ${computerMove}`);

		this.determineWinner(userMove, computerMove);

		console.log(`HMAC key: ${key}`);
	}

	determineWinner(userMove, computerMove) {
		const userIndex = this.moves.indexOf(userMove);
		const computerIndex = this.moves.indexOf(computerMove);

		if (userIndex === computerIndex) {
			console.log('Draw!');
		} else if (
			(computerIndex > userIndex &&
				computerIndex <= userIndex + this.moves.length / 2) ||
			(computerIndex < userIndex &&
				userIndex - computerIndex > this.moves.length / 2)
		) {
			console.log('You win!');
		} else {
			console.log('You lose!');
		}
	}
}

module.exports = Game;
