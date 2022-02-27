namespace ha.parse {
    class Test {

        async load(file: string): Promise<void> {
            let hsl: string = await ha.comp.Util.Ajax2('get', file, '');

            console.group("file");
            console.log(hsl);
            console.groupEnd();

            console.log(ha.parse.parse.parse(hsl));
        }

    }

    export var test: Test = new Test();
}

window.onload = () => {
    // ha.parse.test.load('./data/test2.txt');
    ha.parse.test.load('./data/test.txt');
}