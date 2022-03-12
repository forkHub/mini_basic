namespace ha.parse {
    class Grammar {
        private _barisObj: IBarisObj;

        public get barisObj(): IBarisObj {
            return this._barisObj;
        }
        public set barisObj(value: IBarisObj) {
            this._barisObj = value;
        }

        isStmt(token: Itoken): boolean {
            if (token.type == Kons.Ty_VAR_ASSIGNMENT) return true;
            return false;
        }

        hapusSpace(): boolean {
            // console.group('hapus space');

            for (let i: number = 0; i < this._barisObj.token.length; i++) {

                if (this._barisObj.token[i].value == ' ') {

                    // console.log('idx ' + i);

                    // console.log('sebelum:');
                    // console.log(this._barisObj.token);

                    this._barisObj.token = ar.hapus(this._barisObj.token, i);

                    // console.log('sesudah:');
                    // console.log(this._barisObj.token);

                    // console.groupEnd();
                    return true;
                }

            }

            // console.groupEnd();
            return false;
        }

        grammar(): void {
            console.group('grammar');

            //TODO: else if diganti
            /*
                buat optimisasi
            */
            while (this._barisObj.token.length > 1) {
                if (false) { }

                //BASIC
                else if (exp.teks()) { }
                else if (this.hapusSpace()) { }
                else if (exp.exp2()) { }
                else if (exp.kataDotFinal()) { }
                else if (exp.kataDot()) { }
                else if (exp.arrayDot()) { }
                else if (exp.kataDotChain()) { }
                else if (exp.kurungKosong()) { }
                else if (exp.kurungSingle()) { }
                // else if (exp.kurungIsi()) { }
                else if (exp.panggilfungsi()) { }
                else if (exp.min()) { }
                else if (exp.binopIf()) { }
                else if (exp.binop()) { }
                else if (exp.not()) { }
                else if (exp.argument(this._barisObj.token)) { }
                else if (exp.kotak()) { }
                else if (exp.kotak2()) { }
                else if (exp.kotak3()) { }
                else if (exp.array2()) { }

                //EXP

                //STMT
                else if (stmt.return1()) { }
                else if (stmt.return2()) { }
                else if (stmt.new2()) { }
                else if (stmt.forPendek()) { }
                else if (stmt.varAssign()) { }
                else if (stmt.modifier()) { }
                else if (stmt.ifPendek()) { }
                else if (stmt.ifPendekThen()) { }
                else if (stmt.ifPendekPerintah()) { }
                else if (stmt.elseIf()) { }
                else if (stmt.funcDec()) { }
                else if (stmt.while2()) { }
                else if (stmt.perintah2()) { }
                else if (stmt.dimAssign()) { }
                else {
                    console.log("error:");
                    console.log(this._barisObj.token);
                    throw Error('');
                }
            }

            console.groupEnd();
        }
    }

    export var grammar: Grammar = new Grammar();
}