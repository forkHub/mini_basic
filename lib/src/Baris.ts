namespace ha.parse {
	class Baris {
		// private ar: Arr = new Arr();

		pecahBaris(): void {
			let idx: number = 100000;
			let idxTerakhir: number = 0;
			// let ctr: number=

			console.group('lines');

			while (idx >= 0) {
				idx = this.getLineBreak(idxTerakhir);
				// console.log('line break ' + idx);

				if (idx >= 0) {
					let kiri: IToken[] = ar.ambilTengah(data.token, idxTerakhir, idx);
					kiri = this.bersih(kiri);
					// kiri = this.hapusComment(kiri);
					// kiri = exp.teks()

					if (kiri.length > 0) {
						data.barisAr.push({
							n: 0,
							token: kiri,
							baris: baris.getLine(kiri)
						});
						// this.renderLines(kiri);
					}

					idxTerakhir = idx + 1;
				}
			}

			console.groupEnd();
		}

		bersih(tokenAr: IToken[]): IToken[] {

			while ((tokenAr.length > 0) && tokenAr[0].type == Kons.TY_BARIS) {
				tokenAr = tokenAr.slice(1);
			}

			while ((tokenAr.length > 0) && tokenAr[tokenAr.length - 1].type == Kons.TY_BARIS) {
				tokenAr = tokenAr.slice(0, tokenAr.length - 1);
			}

			// tokenAr = this.hapusComment(tokenAr);

			// //bersihkan comment
			// let idx: number = -1;
			// for (let i: number = 0; i < tokenAr.length; i++) {
			// 	if (tokenAr[i].valueLowerCase == ";") {
			// 		idx = i;
			// 		break;
			// 	}
			// }

			// if (idx >= 0) {
			// 	tokenAr = tokenAr.slice(0, idx);
			// }

			if (!tokenAr) tokenAr = [];

			return tokenAr;
		}

		hapusComment(tokenAr: IToken[]): IToken[] {
			//bersihkan comment
			let idx: number = -1;
			for (let i: number = 0; i < tokenAr.length; i++) {
				if (tokenAr[i].valueLowerCase == ";") {
					idx = i;
					break;
				}
			}

			if (idx >= 0) {
				tokenAr = tokenAr.slice(0, idx);
			}

			if (!tokenAr) tokenAr = [];

			return tokenAr;
		}

		valid(token: IToken[]): boolean {
			token;
			return true;
		}

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