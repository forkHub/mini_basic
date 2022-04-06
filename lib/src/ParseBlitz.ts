namespace ha.parse {
	class Blitz {

		async parse(str: string): Promise<string> {
			data.dataStr = str;
			data.dataStr += ";;";
			data.dataStr += "\r\n";

			while (data.barisAr.length > 0) {
				data.barisAr.pop();
			}

			while (data.token.length > 0) {
				data.token.pop();
			}

			lexer.lexer();
			baris.pecahBaris();

			console.group("grammar");
			for (let i: number = 0; i < data.barisAr.length; i++) {
				let barisObj: IBarisObj = data.barisAr[i];

				// grammar.barisObj = barisObj;
				data.barisObj = barisObj;

				console.log(baris.getLine(barisObj.token));
				grammar.grammar();

				// console.group('terjemah:')
				// barisObj.terjemah = terj.terjemah(barisObj.token[0]);
				// console.groupEnd();

				// console.log("hasil:");
				// console.log(barisObj.terjemah);
				// console.log("");
			}
			console.groupEnd();

			console.group("hasil:");
			for (let i: number = 0; i < data.barisAr.length; i++) {
				// console.log(data.barisAr[i].baris);
				// console.log(data.barisAr[i].terjemah);
				// console.log("");
			}
			console.groupEnd();

			console.log("finish");

			return ha.parse.parse.blijs();
		}

		blijs(): string {
			let hsl: string = '';
			console.log('blijs');

			hsl += "async function Start() {\n";
			data.barisAr.forEach((barisObj: IBarisObj) => {
				hsl += barisObj.terjemah + "\n";
			});
			hsl += `
                if (Loop) {
                    window.Loop = async () => {
                        await Loop();
                    }
                }
                else {
                    console.log("Loop doesn't exists");
                }
            `;
			hsl += "}\n";

			return hsl;
		}

		getToken(idx: number, token: IToken[]): IToken {
			if (idx < 0) return null;
			if (idx >= token.length) return null;
			return token[idx];
		}

		tokenToAr(token: IToken): any[] {
			let ar: any[] = [];

			if (token.value) {
				ar.push(token.valueLowerCase);
			}
			else if (token.token) {
				token.token.forEach((token2: IToken) => {
					ar.push(this.tokenToAr(token2));
				});
			}

			return ar;
		}

		tokenToValue(token: IToken, debug: boolean = false): string {
			let hasil: string = '';

			if (debug) {
				console.log('token to value');
				console.log(token);
				console.log(token.token);
			}

			if (!token) throw Error();

			if (token.valueLowerCase) {
				if (token.valueLowerCase != '') {
					hasil += ' ';
					hasil += token.valueLowerCase;
					return hasil;
				}
			}

			if (token.token) {
				token.token.forEach((token2: IToken) => {
					hasil += parse.tokenToValue(token2);
				});
				return hasil;
			}

			throw new Error('');
		}

	}

	class Arr {
		kiri(token: IToken[], idx: number): IToken[] {
			return token.slice(0, idx);
		}

		kanan(token: IToken[], idx: number): IToken[] {
			return token.slice(idx + 1);
		}

		ambilTengah(token: IToken[], idx: number, idx2: number): IToken[] {
			return token.slice(idx, idx2 + 1);
		}

		ganti(token: IToken[], idx: number, idx2: number, token2: IToken, debug: boolean = false): IToken[] {
			let kiri: IToken[] = this.kiri(token, idx)
			let kanan: IToken[] = this.kanan(token, idx2);

			if (debug) {
				console.log('index ' + idx);

				console.log('token:');
				console.log(token);

				console.log('kiri:');
				console.log(kiri);
				console.log('kiri l ' + kiri.length);

				console.log('kanan:');
				console.log('kanan l: ' + kanan.length);
				console.log(kanan);

				console.log('token2:');
				console.log(token2);
			}

			let hasil: IToken[] = kiri.concat(token2);
			hasil = hasil.concat(kanan);
			if (debug) {
				console.log('hasil length ' + hasil.length);
			}

			if (hasil.length > token.length) {
				throw Error('');
			}

			return hasil;
		}

		hapus(token: IToken[], idx: number): IToken[] {
			let hasil: IToken[];
			let kiri: IToken[];
			let kanan: IToken[];

			// console.group('hapus');

			kiri = this.kiri(token, idx);
			kanan = this.kanan(token, idx);

			// console.log('kiri:');
			// console.log(kiri);
			// console.log('kanan:');
			// console.log(kanan);

			hasil = kiri.concat(kanan);

			// console.log('hasil');

			// console.groupEnd();

			return hasil;
		}

	}

	export var ar: Arr = new Arr();
	export var parse: Blitz = new Blitz();
}
