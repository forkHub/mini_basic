namespace ha.parse {
	class Blitz {

		init(): void {
			gm2.init();
		}

		async parse(str: string): Promise<void> {
			data.dataStr = str;

			console.groupCollapsed('parse: ' + str);

			data.dataStr = data.dataStr.trim();

			let idx: number = data.dataStr.indexOf(';');
			if (idx >= 0) {
				data.dataStr = data.dataStr.slice(0, idx);
			}

			while (data.token.length > 0) {
				data.token.pop();
			}

			console.log('str ' + data.dataStr);

			console.log('lexer sebelum:');
			console.log(data.token);
			lexer.lexer();
			console.log('lexer sesudah:');
			console.log(data.token);

			data.barisObj = {
				baris: str,
				n: 0,
				terjemah: '',
				token: data.token
			}

			console.log('sebelum:');
			console.log(data.barisObj);

			grammar.grammar();

			console.log("finish");
			console.log(data.barisObj);
			console.groupEnd();
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

		debugToken(token: IToken[]): void {
			console.group('debug token:')
			token.forEach((item: IToken) => {
				console.log(this.tokenToValue(item));
			})
			console.groupEnd();
			// return '';
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
	parse.init();
}
