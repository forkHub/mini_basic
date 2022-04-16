namespace ha.parse {
    class Test {
        private files: string[] = [
            ".\\data\\test2.txt",
            ".\\data\\test.txt",
            ".\\data\\data\\samples\\mak\\anim\\anim.bb",
            ".\\data\\data\\tutorials\\GCUK_Tuts\\animation.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\array.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\array1.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\array2.bb",
            ".\\data\\data\\samples\\Richard_Betson\\Big_Bang_1b\\Big_Bang_1b.bb",
            ".\\data\\data\\samples\\Richard_Betson\\Binary_Cage_12\\Binary_Cage_12.bb",
            ".\\data\\data\\samples\\AGore\\BirdDemo\\BirdDemo.bb",
            ".\\data\\data\\samples\\warpy\\blitzdoc.bb",
            ".\\data\\data\\samples\\RobHutchinson\\BloxAndSpheres\\blox&spheres.bb",
            ".\\data\\data\\samples\\MattDavey\\Matts Balls\\bouncey.bb",
            ".\\data\\data\\samples\\RobCummings\\Bumpy\\bumpyfun.bb",
            ".\\data\\data\\tutorials\\GCUK_Tuts\\camera.bb",
            ".\\data\\data\\samples\\mak\\castle\\castle.bb",
            ".\\data\\data\\samples\\mak\\collide\\collide.bb",
            ".\\data\\data\\tutorials\\GCUK_Tuts\\collision.bb",
            ".\\data\\data\\samples\\si\\matrix\\command_ref.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\counter.bb",
            ".\\data\\data\\samples\\RobHutchinson\\CraftFlare\\CraftFlare.bb",
            ".\\data\\data\\samples\\mak\\createanim\\createanim.bb",
            ".\\data\\data\\samples\\Hi-Toro\\Death Island\\deathisland.bb",
            ".\\data\\data\\samples\\mak\\detailtex\\detailtex.bb",
            ".\\data\\data\\samples\\birdie\\dolphin\\dolphin.bb",
            ".\\data\\data\\samples\\birdie\\dominos\\dominos.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\doublebuffering.bb",
            ".\\data\\data\\samples\\mak\\dragon\\dragon.bb",
            ".\\data\\data\\samples\\mak\\driver\\driver.bb",
            ".\\data\\data\\Games\\bb3d_asteroids\\EdzUpAsteroids.bb",
            ".\\data\\data\\samples\\Richard_Betson\\emerald_gate\\Emerald_Gate_1.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\end if.bb",
            ".\\data\\data\\samples\\si\\matrix\\example.bb",
            ".\\data\\data\\samples\\RobHutchinson\\BBLauncher\\example.bb",
            ".\\data\\data\\samples\\birdie\\Explode\\Explode.bb",
            ".\\data\\data\\samples\\mak\\fakelight\\fakelight.bb",
            ".\\data\\data\\samples\\mak\\firepaint3d\\firepaint3d.bb",
            ".\\data\\data\\samples\\mak\\flag\\flag.bb",
            ".\\data\\data\\samples\\Skully\\flares\\flares.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\for next loop.bb",
            ".\\data\\data\\samples\\si\\fps\\fps.bb",
            ".\\data\\data\\samples\\birdie\\Spherical Landscapes\\functions.bb",
            ".\\data\\data\\Games\\TunnelRun\\functions.bb",
            ".\\data\\data\\Games\\TunnelRun\\globs.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\goto.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\goto1.bb",
            ".\\data\\data\\samples\\AGore\\GrassDemo\\Grass.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\hello.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\if then.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\if then1.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\input.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\input1.bb",
            ".\\data\\data\\samples\\mak\\insaner\\insaner.bb",
            ".\\data\\data\\samples\\mak\\insectoids\\insectoids.bb",
            ".\\data\\data\\samples\\AGore\\HeadDemo\\KBSplines.bb",
            ".\\data\\data\\samples\\AGore\\BirdDemo\\KBSplines.bb",
            ".\\data\\data\\samples\\RobHutchinson\\BBLauncher\\launcher2d.bb",
            ".\\data\\data\\samples\\RobHutchinson\\SkyPlateau\\launcher3d.bb",
            ".\\data\\data\\samples\\RobHutchinson\\BBLauncher\\launcher3d.bb",
            ".\\data\\data\\samples\\Hi-Toro\\Death Island\\incs\\lensHowTo.bb",
            ".\\data\\data\\samples\\Hi-Toro\\Death Island\\incs\\lensIncs.bb",
            ".\\data\\data\\samples\\halo\\Lightmap\\lightmap.bb",
            ".\\data\\data\\samples\\birdie\\thunder\\lightning.bb",
            ".\\data\\data\\tutorials\\GCUK_Tuts\\lights.bb",
            ".\\data\\data\\samples\\mak\\lights\\lights.bb",
            ".\\data\\data\\samples\\birdie\\LodMesh\\lmesh.bb",
            ".\\data\\data\\samples\\birdie\\texpaint\\main.bb",
            ".\\data\\data\\samples\\birdie\\CameraPickST\\CameraPickST\\main.bb",
            ".\\data\\data\\samples\\birdie\\Jet Tails\\Main.bb",
            ".\\data\\data\\samples\\birdie\\Fire Effect\\Fire Effect\\Main.bb",
            ".\\data\\data\\samples\\mak\\anim\\makbot\\MAK-sfx.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\maths.bb",
            ".\\data\\data\\samples\\si\\matrix\\matrix.bb",
            ".\\data\\data\\mediaview\\mediaview.bb",
            ".\\data\\data\\Games\\wing_ring\\menus.bb",
            ".\\data\\data\\samples\\halo\\MeshFX\\meshfx.bb",
            ".\\data\\data\\samples\\birdie\\Mirror\\mirror.bb",
            ".\\data\\data\\samples\\RobHutchinson\\ModelChildren\\modelchildren.bb",
            ".\\data\\data\\tutorials\\GCUK_Tuts\\movement.bb",
            ".\\data\\data\\samples\\mak\\multi_tex\\multi_tex.bb",
            ".\\data\\data\\samples\\mak\\multicam\\multicam.bb",
            ".\\data\\data\\samples\\Richard_Betson\\orbit_nebula_source\\orbit.bb",
            ".\\data\\data\\samples\\mak\\pick\\pick.bb",
            ".\\data\\data\\Games\\wing_ring\\player2.bb",
            ".\\data\\data\\samples\\Richard_Betson\\Power_fountain_b\\power_fountian_b.bb",
            ".\\data\\data\\samples\\mak\\primitives\\primitives.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\print.bb",
            ".\\data\\data\\samples\\RobCummings\\PyromaniaBB\\PyromaniaBB-1.bb",
            ".\\data\\data\\samples\\birdie\\Quick Deform\\qd.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\random numbers.bb",
            ".\\data\\data\\Games\\wing_ring\\readme.bb",
            ".\\data\\data\\samples\\zenith\\scare\\scare.bb",
            ".\\data\\data\\Games\\wing_ring\\scenery.bb",
            ".\\data\\data\\tutorials\\GCUK_Tuts\\settingup.bb",
            ".\\data\\data\\samples\\halo\\Shadows\\shadows.bb",
            ".\\data\\data\\samples\\Hi-Toro\\Shooter\\Shooter\\shooter-testbed.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\simple maths.bb",
            ".\\data\\data\\samples\\RobHutchinson\\SkyPlateau\\SkyPlateau.bb",
            ".\\data\\data\\samples\\birdie\\2d-3dsprites\\sprites.bb",
            ".\\data\\data\\samples\\Skully\\start.bb",
            ".\\data\\data\\samples\\RobHutchinson\\WateryTerrain\\start.bb",
            ".\\data\\data\\samples\\RobHutchinson\\ModelChildren\\start.bb",
            ".\\data\\data\\samples\\RobHutchinson\\CraftFlare\\start.bb",
            ".\\data\\data\\samples\\RobCummings\\PyromaniaBB\\start.bb",
            ".\\data\\data\\samples\\Richard_Betson\\start.bb",
            ".\\data\\data\\samples\\mak\\start.bb",
            ".\\data\\data\\samples\\halo\\start.bb",
            ".\\data\\data\\samples\\AGore\\start.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\step.bb",
            ".\\data\\data\\samples\\birdie\\lodBalls\\subdiv.bb",
            ".\\data\\data\\samples\\birdie\\te\\TE.bb",
            ".\\data\\data\\samples\\mak\\teapot\\teapot.bb",
            ".\\data\\data\\samples\\birdie\\UVMapping\\UVMapping\\test.bb",
            ".\\data\\data\\samples\\birdie\\Spherical Landscapes\\testbed.bb",
            ".\\data\\data\\samples\\mak\\tex_render\\tex_render.bb",
            ".\\data\\data\\tutorials\\GCUK_Tuts\\texture.bb",
            ".\\data\\data\\samples\\AGore\\HeadDemo\\TheHead.bb",
            ".\\data\\data\\samples\\birdie\\thunder\\thunder.bb",
            ".\\data\\data\\Games\\TunnelRun\\tr.bb",
            ".\\data\\data\\samples\\mak\\tron\\tron.bb",
            ".\\data\\data\\samples\\birdie\\Terrain Tiling\\tt.bb",
            ".\\data\\data\\samples\\birdie\\Brush Tiles\\tt.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\types1.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\types2.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\variables.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\variables1.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\variables2.bb",
            ".\\data\\data\\tutorials\\basic_tuts\\variables3.bb",
            ".\\data\\data\\tutorials\\GCUK_Tuts\\vertex.bb",
            ".\\data\\data\\samples\\RobHutchinson\\WateryTerrain\\water.bb",
            ".\\data\\data\\Games\\wing_ring\\wing_ring.bb",
            ".\\data\\data\\samples\\RobHutchinson\\WingPilot\\WingPilotV0_01.bb",
            ".\\data\\data\\samples\\mak\\xfighter\\xfighter.bb",
        ];
        // private aturans: string[] = [
        //     "\\data\\aturan\\exp.json"
        // ];

        constructor() {
            this.debug();
        }

        async init(): Promise<void> {
            // await aturan.loads(this.aturans);
            // gm2.aturanAr.concat(aturan.daftar);
            await this.load2();
        }

        debug(): void {
            // this.files = [
            //     ".\\data\\testSingle.txt"
            // ];
        }

        async parse(file: string): Promise<void> {
            let hsl: string = await ha.comp.Util.Ajax2('get', file, '');
            let barisAr: string[] = hsl.split(/\r?\n/);

            for (let i: number = 0; i < barisAr.length; i++) {
                await ha.parse.parse.parse(barisAr[i]);
            }
        }

        async load2(): Promise<void> {
            let l: number = this.files.length;
            // l = 5;
            for (let i: number = 0; i < l; i++) {
                let file: string = this.files[i];
                console.log("File: " + file);
                try {
                    await this.parse(file);
                }
                catch (e) {
                    console.log('file: ' + file);
                    console.error(e);
                    break;
                }
            }
        }

    }

    export var test: Test = new Test();
}

window.onload = () => {
    ha.parse.test.init().catch((e) => {
        console.error(e);
    });
}