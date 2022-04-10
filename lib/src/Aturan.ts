namespace ha.parse {
    class Aturan {
        private _daftar: IAturan[] = [];
        public get daftar(): IAturan[] {
            return this._daftar;
        }

        // async loads(namas: string[]): Promise<void> {
        //     for (let i: number = 0; i < namas.length; i++) {
        //         await this.load(namas[i]);
        //     }
        // }


        // async load(name: string): Promise<void> {
        //     let hasil: XMLHttpRequest = await ha.comp.Util.Ajax('get', name, '');
        //     if (200 == hasil.status) {
        //         try {
        //             let aturans: IAturan[] = JSON.parse(hasil.responseText);
        //             this._daftar.concat(aturans);
        //         }
        //         catch (e) {

        //         }
        //     }
        //     else {
        //         throw Error(hasil.responseText);
        //     }
        // }


    }

    export var aturan: Aturan = new Aturan();
}