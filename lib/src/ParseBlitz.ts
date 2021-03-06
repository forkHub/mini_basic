namespace ha.parse {
	class Blitz {

		init(): void {
			gm2.init();
		}

		async parse(str: string): Promise<void> {
			data.dataStr = str;

			ha.comp.log.groupCollapsed('parse: ' + str);

			data.dataStr = data.dataStr.trim();

			while (data.token.length > 0) {
				data.token.pop();
			}

			ha.comp.log.log('str ' + data.dataStr);
			data.barisAktif = data.dataStr;

			if (data.ignore.indexOf(data.barisAktif) >= 0) {
				ha.comp.log.log('ignore: ' + data.barisAktif);
				data.jmlIgnore++;
				ha.comp.log.groupEnd();
				return;
			}

			lexer.lexer();

			data.barisObj = {
				baris: str,
				n: 0,
				terjemah: '',
				token: data.token
			}

			grammar.grammar();

			ha.comp.log.groupCollapsed("terjemah", "tj");
			terj.terjemah(data.barisObj.token[0]);
			ha.comp.log.groupEnd("tj");

			ha.comp.log.groupEnd();
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
				ha.comp.log.log('token to value');
				ha.comp.log.log(token);
				ha.comp.log.log(token.token);
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
			ha.comp.log.group('debug token:')
			token.forEach((item: IToken) => {
				ha.comp.log.log(this.tokenToValue(item));
			})
			ha.comp.log.groupEnd();
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
				ha.comp.log.log('index ' + idx);

				ha.comp.log.log('token:');
				ha.comp.log.log(token);

				ha.comp.log.log('kiri:');
				ha.comp.log.log(kiri);
				ha.comp.log.log('kiri l ' + kiri.length);

				ha.comp.log.log('kanan:');
				ha.comp.log.log('kanan l: ' + kanan.length);
				ha.comp.log.log(kanan);

				ha.comp.log.log('token2:');
				ha.comp.log.log(token2);
			}

			let hasil: IToken[] = kiri.concat(token2);
			hasil = hasil.concat(kanan);
			if (debug) {
				ha.comp.log.log('hasil length ' + hasil.length);
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

			kiri = this.kiri(token, idx);
			kanan = this.kanan(token, idx);

			hasil = kiri.concat(kanan);

			return hasil;
		}

	}

	export var ar: Arr = new Arr();
	export var parse: Blitz = new Blitz();
	parse.init();
}
