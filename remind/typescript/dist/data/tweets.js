"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const tweets = [
    {
        id: '1',
        createAt: new Date(),
        text: '아무말 대잔치',
        name: '뚱이',
        username: '뚱이',
        url: '',
    },
    {
        id: '2',
        createAt: new Date(),
        text: '으하하하하하',
        name: '스펀지 밥',
        username: '스펀지 밥',
        url: '',
    },
];
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return tweets;
    });
}
exports.getAll = getAll;
//# sourceMappingURL=tweets.js.map