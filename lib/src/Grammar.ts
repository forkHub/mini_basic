namespace ha.parse {
    class Grammar {

        hapusSpace(): boolean {
            // console.group('hapus space');

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let value: string = data.barisObj.token[i].value;

                if (value == ' ' || (value == '\t')) {

                    // console.log('idx ' + i);

                    // console.log('sebelum:');
                    // console.log(data.barisObj.token);

                    data.barisObj.token = ar.hapus(data.barisObj.token, i);

                    // console.log('sesudah:');
                    // console.log(data.barisObj.token);

                    // console.groupEnd();
                    return true;
                }

            }

            // console.groupEnd();
            return false;
        }

        grammar(): void {
            console.group('grammar');

            while (data.barisObj.token.length > 1) {
                if (false) { }

                else if (exp.hapusComment()) { }
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
                else if (exp.binop()) { }
                else if (exp.not()) { }
                else if (exp.arg2()) { }
                else if (exp.args(data.barisObj.token)) { }
                else if (exp.kurungArg2()) { }
                else if (exp.kurungArg()) { }
                else if (gm2.checkLog(gm2.aturanExpAr)) { }

                //STMT
                else if (stmt.modifier()) { }
                else if (stmt.modIsi()) { }
                else if (stmt.returnExp()) { }
                else if (stmt.forPendek()) { }
                else if (stmt.forStep()) { }

                else if (ifStmt.ifExp()) { }
                else if (ifStmt.ifThen()) { }

                else if (ifStmt.elseIfThen()) { }

                else if (stmt.funcDec()) { }
                else if (stmt.while2()) { }
                else if (stmt.dimDec()) { }
                else if (stmt.dimAssign()) { }
                else if (caseStmt.caseDec()) { }
                else if (caseStmt.selectDec()) { }
                else if (stmt.stmtColon()) { }
                else if (stmt.stmtColon2()) { }
                else if (stmt.stmtMul()) { }
                else if (gm2.checkLog(gm2.aturanStmtAr)) { }

                else if (data.barisObj.token.length > 1) {
                    console.log("error:");
                    console.log(data.barisObj.token);
                    data.barisObj.token.forEach((token: IToken) => {
                        console.log(parse.tokenToValue(token));
                    })
                    data.errList.push(data.barisAktif);
                    console.groupEnd();
                    return;
                }
            }

            console.groupEnd();
        }
    }

    export var grammar: Grammar = new Grammar();
}