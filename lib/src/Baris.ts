namespace ha.parse {
	class Baris {
		// private ar: Arr = new Arr();

		lines(): void {
			let idx: number = 100000;
			let idxTerakhir: number = 0;
			// let ctr: number=

			console.group('lines');

			while (idx >= 0) {
				idx = this.getLineBreak(idxTerakhir);
				console.log('line break ' + idx);

				if (idx >= 0) {
					let kiri: Itoken[] = ar.ambilTengah(data.token, idxTerakhir, idx);
					kiri = this.bersih(kiri);

					if (kiri.length > 0) {
						data.barisAr.push({
							n: 0,
							token: kiri,
							baris: baris.renderLines(kiri)
						});
						this.renderLines(kiri);
					}

					idxTerakhir = idx + 1;
				}
			}

			console.groupEnd();
		}

		bersih(tokenAr: Itoken[]): Itoken[] {

			// console.group('bersih');

			while ((tokenAr.length > 0) && tokenAr[0].type == Kons.TY_BARIS) {
				// tokenAr = tokenAr.slice(1);
				tokenAr = [];
			}

			while ((tokenAr.length > 0) && tokenAr[tokenAr.length - 1].type == Kons.TY_BARIS) {
				tokenAr = tokenAr.slice(0, tokenAr.length - 1);
			}

			//bersihkan comment
			let idx: number = -1;
			for (let i: number = 0; i < tokenAr.length; i++) {
				if (tokenAr[i].value == ';') {
					idx = i;
					break;
				}
			}

			if (idx >= 0) {
				// console.group('comment:');
				// console.log('sebelum');
				// console.log(tokenAr);

				tokenAr = tokenAr.slice(0, idx);

				// console.log('sesudah:');
				// console.log(tokenAr);
				// console.groupEnd();
			}

			if (!tokenAr) tokenAr = [];

			// console.groupEnd();
			return tokenAr;
		}

		valid(token: Itoken[]): boolean {
			token;
			return true;
		}

		renderLines(token: Itoken[]): string {
			let str: string = '';
			token.forEach((token: Itoken) => {
				str += token.value;
			});

			console.log(str);
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