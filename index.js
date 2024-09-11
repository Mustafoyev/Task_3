const Game = require('./Game');

function main() {
	const moves = process.argv.slice(2);

	if (moves.length < 3 || moves.length % 2 === 0) {
		console.log(
			'Error: You must provide an odd number of moves greater than or equal to 3.',
		);
		console.log('Example: node index.js rock paper scissors');
		return;
	}

	const uniqueMoves = new Set(moves);
	if (uniqueMoves.size !== moves.length) {
		console.log('Error: Moves must be unique.');
		return;
	}

	const game = new Game(moves);
	game.play();
}

main();
