class MoveGenerator {
	constructor(moves) {
		this.moves = moves;
	}

	getRandomMove() {
		const randomIndex = Math.floor(Math.random() * this.moves.length);
		return this.moves[randomIndex];
	}
}

module.exports = MoveGenerator;
