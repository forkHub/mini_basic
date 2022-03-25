namespace ha.parse {
    class Grammar2 {
        private _grammarAr: IGrammar[];

        check(rule: IGrammar, idx: number, tokenAr: Itoken[]): boolean {
            let ada: boolean = false;

            for (let i: number = 0; i < grammar.barisObj.token.length; i++) {

                console.group('check, type ' + rule.type);
                let hasil: boolean = true;

                for (let i: number = 0; i < rule.tokens.length; i++) {

                    let token: Itoken = ha.parse.parse.getToken(idx + i, tokenAr);
                    let type: number = rule.tokens[i];

                    console.log('check pada pos ' + i);

                    if (!token) {
                        console.log('token null ');
                        hasil = false;
                    }
                    else if (token.type != type) {
                        console.log('type gak cocok, type: ' + token.type + '/target: ' + type)
                        hasil = false;
                    }
                }

                //check sebelum
                if (rule.sebelum) {
                    let token: Itoken = ha.parse.parse.getToken(idx - 1, tokenAr);
                    if (token && (token.type == rule.sebelum)) {
                        console.log('tidak boleh didahuli: ' + token.type);
                        hasil = false;
                    }
                }

                //check setelah
                if (rule.setelah) {
                    let token: Itoken = ha.parse.parse.getToken(idx + rule.tokens.length, tokenAr);
                    if (token && (token.type == rule.setelah)) {
                        console.log('tidak boleh diikuti: ' + token.type);
                        hasil = false;
                    }
                }

                if (hasil) {
                    ada = true;
                    let tokenBaru: Itoken = {
                        type: rule.type,
                        token: []
                    }

                    for (let i: number = 0; i < rule.tokens.length; i++) {
                        tokenBaru.token.push(ha.parse.parse.getToken(idx + i, tokenAr));
                    }

                    console.log("token baru : " + rule.type);
                    console.log(tokenBaru);

                    grammar.barisObj.token = ar.ganti(grammar.barisObj.token, idx, idx + tokenBaru.token.length - 1, tokenBaru);
                }

                console.groupEnd();
            }

            return ada;
        }

        init(): void {
            // Type MyType
            this._grammarAr.push({
                type: Kons.TY_TYPE_DEF,
                tokens: [
                    Kons.TY_TYPE,
                    Kons.TY_KATA
                ]
            });

            //Field KATA
            this._grammarAr.push({
                type: Kons.TY_FIELD_DEF,
                tokens: [
                    Kons.TY_FIELD,
                    Kons.TY_KATA
                ]
            });

            //

        }

        public get grammarAr(): IGrammar[] {
            return this._grammarAr;
        }
        public set grammarAr(value: IGrammar[]) {
            this._grammarAr = value;
        }
    }

    export var grammar2: Grammar2 = new Grammar2();
}