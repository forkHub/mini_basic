namespace ha.parse {
	class Baris {
		// private ar: Arr = new Arr();

		// hapusComment(tokenAr: IToken[]): IToken[] {
		// 	//bersihkan comment
		// 	let idx: number = -1;
		// 	for (let i: number = 0; i < tokenAr.length; i++) {
		// 		if (tokenAr[i].valueLowerCase == ";") {
		// 			idx = i;
		// 			break;
		// 		}
		// 	}

		// 	if (idx >= 0) {
		// 		tokenAr = tokenAr.slice(0, idx);
		// 	}

		// 	if (!tokenAr) tokenAr = [];

		// 	return tokenAr;
		// }

		getLine(token: IToken[]): string {
			let str: string = '';
			token.forEach((token: IToken) => {
				str += token.value;
			});

			// console.log(str);
			return str;
		}

		getLineBreak(idx: number): number {
			for (let i: number = idx; i < data.token.length; i++) {
				if (data.token[i].type == Kons.TY_BARIS) {
					return i;
				}
			}

			return -1;
		}
	}

	export var baris: Baris = new Baris();
}