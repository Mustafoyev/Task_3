class HelpTable {
	constructor(moves) {
		this.moves = moves;
		this.size = moves.length;
	}

	generateTable() {
		const table = Array(this.size + 1)
			.fill(null)
			.map(() => Array(this.size + 1).fill(''));

		table[0][0] = 'v PC\\User >';
		for (let i = 1; i <= this.size; i++) {
			table[0][i] = this.moves[i - 1];
			table[i][0] = this.moves[i - 1];
		}

		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				if (i === j) {
					table[i + 1][j + 1] = 'Draw';
				} else if (
					(j > i && j <= i + this.size / 2) ||
					(j < i && i - j > this.size / 2)
				) {
					table[i + 1][j + 1] = 'Win';
				} else {
					table[i + 1][j + 1] = 'Lose';
				}
			}
		}
		return table;
	}

	printTable() {
		const table = this.generateTable();

		console.log('\nHelp Table:');

		table.forEach((row, rowIndex) => {
			const formattedRow = row.map((cell) => cell.padEnd(10)).join(' | ');
			console.log(formattedRow);

			if (rowIndex === 0) {
				console.log('-'.repeat(formattedRow.length));
			}
		});
		console.log();
	}
}

module.exports = HelpTable;
