namespace ha.parse {
    class Grammar {
        private _barisObj: IBarisObj;

        public get barisObj(): IBarisObj {
            return this._barisObj;
        }
        public set barisObj(value: IBarisObj) {
            this._barisObj = value;
        }

        // isStmt(token: IToken): boolean {
        //     if (token.type == Kons.TY_VAR_ASSIGNMENT) return true;
        //     return false;
        // }

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
                else if (exp.exp()) { }
                else if (exp.expKurungSingle()) { }
                else if (exp.expKata()) { }
                else if (exp.kataDot()) { }
                else if (exp.kurungKosong()) { }
                else if (exp.kurungSingle()) { }
                else if (exp.panggilfungsi()) { }
                else if (exp.panggilfungsiArg()) { }
                else if (exp.min()) { }
                // else if (exp.binopIf()) { }
                else if (exp.binop()) { }
                else if (exp.binopEq()) { }
                else if (exp.binopLogic()) { }
                else if (exp.not()) { }
                else if (exp.arg2()) { }
                else if (exp.args(this._barisObj.token)) { }
                // else if (exp.argument4(this._barisObj.token)) { }
                // else if (exp.argument5(this._barisObj.token)) { }
                // else if (exp.argument6(this._barisObj.token)) { }
                else if (exp.kurungArg2()) { }
                else if (exp.kurungArg()) { }
                else if (typeStmt.typeAkses()) { }

                //STMT
                else if (stmt.modifier()) { }
                else if (stmt.modIsi()) { }
                else if (stmt.returnExp()) { }
                else if (stmt.forPendek()) { }
                else if (stmt.forStep()) { }
                // else if (stmt.varAssign()) { }

                else if (ifStmt.ifExp()) { }
                else if (ifStmt.ifExpP()) { }
                else if (ifStmt.ifExpP2()) { }
                else if (ifStmt.ifThen()) { }
                else if (ifStmt.ifThenP()) { }
                else if (ifStmt.ifThenP2()) { }
                else if (ifStmt.ifElseThenP()) { }
                else if (ifStmt.ifElseThenP2()) { }

                else if (ifStmt.elseIfThen()) { }

                else if (stmt.funcDec()) { }
                else if (stmt.while2()) { }
                else if (stmt.perintah()) { }

                else if (typeStmt.typeNew()) { }

                else if (stmt.dimDec()) { }
                else if (stmt.dimAssign()) { }
                else if (caseStmt.caseDec()) { }
                else if (caseStmt.selectDec()) { }
                else if (stmt.stmtColon()) { }
                else if (stmt.stmtColon2()) { }
                else if (stmt.stmtMul()) { }

                else {
                    console.log("error:");
                    console.log(this._barisObj.token);
                    this._barisObj.token.forEach((token: IToken) => {
                        console.log(parse.tokenToValue(token));
                    })
                    throw Error('');
                }
            }

            console.groupEnd();
        }
    }

    export var grammar: Grammar = new Grammar();
}