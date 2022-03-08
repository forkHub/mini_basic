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

			baris.lines();

			console.group("grammar");
			for (let i: number = 0; i < data.barisAr.length; i++) {
				let barisObj: IBarisObj = data.barisAr[i];

				grammar.barisObj = barisObj;

				baris.renderLines(barisObj.token);
				grammar.grammar();

				console.group('terjemah:')
				barisObj.terjemah = terj.terjemah(barisObj.token[0]);
				console.groupEnd();

				console.log("hasil:");
				console.log(barisObj.terjemah);
				console.log("");
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

		getToken(idx: number, token: Itoken[]): Itoken {
			if (idx < 0) return null;
			if (idx >= token.length) return null;
			return token[idx];
		}

	}

	class Arr {
		kiri(token: Itoken[], idx: number): Itoken[] {
			return token.slice(0, idx);
		}

		kanan(token: Itoken[], idx: number): Itoken[] {
			return token.slice(idx + 1);
		}

		ambilTengah(token: Itoken[], idx: number, idx2: number): Itoken[] {
			return token.slice(idx, idx2 + 1);
		}

		ganti(token: Itoken[], idx: number, idx2: number, token2: Itoken): Itoken[] {
			let kiri: Itoken[] = this.kiri(token, idx)
			let kanan: Itoken[] = this.kanan(token, idx2);

			let hasil: Itoken[] = kiri.concat(token2).concat(kanan);

			return hasil;
		}

		hapus(token: Itoken[], idx: number): Itoken[] {
			let hasil: Itoken[];
			let kiri: Itoken[];
			let kanan: Itoken[];

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
