const crypto = require('crypto');

class CryptoHelper {
	generateKey() {
		return crypto.randomBytes(32).toString('hex');
	}

	generateComputerMove(moves) {
		const randomIndex = crypto.randomInt(0, moves.length);
		return moves[randomIndex];
	}

	generateHMAC(move, key) {
		const hmac = crypto.createHmac('sha256', key);
		hmac.update(move);
		return hmac.digest('hex');
	}
}

module.exports = CryptoHelper;
