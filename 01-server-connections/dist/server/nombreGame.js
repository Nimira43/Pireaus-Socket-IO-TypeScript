"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NombreGame {
    constructor() {
        this.LuckyNumbers = {};
    }
    GetWinners(number) {
        const winners = [];
        for (let id in this.LuckyNumbers) {
            if (number === this.LuckyNumbers[id]) {
                winners.push(id);
            }
        }
        return winners;
    }
}
exports.default = NombreGame;
