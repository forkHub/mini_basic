namespace ha.parse {
    class Grammar {

        hapusSpace(): boolean {
            // ha.comp.log.group('hapus space');

            for (let i: number = 0; i < data.barisObj.token.length; i++) {

                let value: string = data.barisObj.token[i].value;

                if (value == ' ' || (value == '\t')) {

                    // ha.comp.log.log('idx ' + i);

                    // ha.comp.log.log('sebelum:');
                    // ha.comp.log.log(data.barisObj.token);

                    data.barisObj.token = ar.hapus(data.barisObj.token, i);

                    // ha.comp.log.log('sesudah:');
                    // ha.comp.log.log(data.barisObj.token);

                    // ha.comp.log.groupEnd();
                    return true;
                }

            }

            // ha.comp.log.groupEnd();
            return false;
        }

        grammar(): void {
            ha.comp.log.group('grammar');

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
                // else if (exp.not()) { }
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
                // else if (stmt.while2()) { }
                else if (stmt.dimDec()) { }
                else if (stmt.dimAssign()) { }
                else if (caseStmt.caseDec()) { }
                else if (caseStmt.selectDec()) { }
                // else if (stmt.stmtColon()) { }
                // else if (stmt.stmtColon2()) { }
                // else if (stmt.stmtMul()) { }
                else if (gm2.checkLog(gm2.aturanStmtAr)) { }

                else if (data.barisObj.token.length > 1) {
                    ha.comp.log.log("error:");
                    ha.comp.log.log(data.barisObj.token);
                    data.barisObj.token.forEach((token: IToken) => {
                        ha.comp.log.log(parse.tokenToValue(token));
                    })

                    if (data.ignore.indexOf(data.barisAktif) < 0) {
                        if (data.errGakIgnore) {
                            throw Error();
                        }
                    }

                    data.errList.push(data.barisAktif);
                    ha.comp.log.groupEnd();

                    return;
                }
            }

            ha.comp.log.groupEnd();
        }
    }

    export var grammar: Grammar = new Grammar();
}