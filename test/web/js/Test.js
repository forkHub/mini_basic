"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Test {
            files = [
                ".\\data\\test2.txt",
                ".\\data\\test.txt",
                // ".\\data\\samples\\mak\\castle\\castle.bb",
                // ".\\data\\samples\\mak\\collide\\collide.bb",
                // ".\\data\\tutorials\\GCUK_Tuts\\collision.bb",
                ".\\data\\samples\\si\\matrix\\command_ref.bb",
                ".\\data\\tutorials\\basic_tuts\\counter.bb",
                ".\\data\\samples\\RobHutchinson\\CraftFlare\\CraftFlare.bb",
                ".\\data\\samples\\mak\\createanim\\createanim.bb",
                ".\\data\\samples\\Hi-Toro\\Death Island\\deathisland.bb",
                ".\\data\\samples\\mak\\detailtex\\detailtex.bb",
                ".\\data\\samples\\birdie\\dolphin\\dolphin.bb",
                ".\\data\\samples\\birdie\\dominos\\dominos.bb",
                ".\\data\\tutorials\\basic_tuts\\doublebuffering.bb",
                ".\\data\\samples\\mak\\dragon\\dragon.bb",
                ".\\data\\samples\\mak\\driver\\driver.bb",
                ".\\data\\Games\\bb3d_asteroids\\EdzUpAsteroids.bb",
                ".\\data\\samples\\Richard_Betson\\emerald_gate\\Emerald_Gate_1.bb",
                ".\\data\\tutorials\\basic_tuts\\end if.bb",
                ".\\data\\samples\\si\\matrix\\example.bb",
                ".\\data\\samples\\RobHutchinson\\BBLauncher\\example.bb",
                ".\\data\\samples\\birdie\\Explode\\Explode.bb",
                ".\\data\\samples\\mak\\fakelight\\fakelight.bb",
                ".\\data\\samples\\mak\\firepaint3d\\firepaint3d.bb",
                ".\\data\\samples\\mak\\flag\\flag.bb",
                ".\\data\\samples\\Skully\\flares\\flares.bb",
                ".\\data\\tutorials\\basic_tuts\\for next loop.bb",
                ".\\data\\samples\\si\\fps\\fps.bb",
                ".\\data\\samples\\birdie\\Spherical Landscapes\\functions.bb",
                ".\\data\\Games\\TunnelRun\\functions.bb",
                ".\\data\\Games\\TunnelRun\\globs.bb",
                ".\\data\\tutorials\\basic_tuts\\goto.bb",
                ".\\data\\tutorials\\basic_tuts\\goto1.bb",
                ".\\data\\samples\\AGore\\GrassDemo\\Grass.bb",
                ".\\data\\tutorials\\basic_tuts\\hello.bb",
                ".\\data\\tutorials\\basic_tuts\\if then.bb",
                ".\\data\\tutorials\\basic_tuts\\if then1.bb",
                ".\\data\\tutorials\\basic_tuts\\input.bb",
                ".\\data\\tutorials\\basic_tuts\\input1.bb",
                ".\\data\\samples\\mak\\insaner\\insaner.bb",
                ".\\data\\samples\\mak\\insectoids\\insectoids.bb",
                ".\\data\\samples\\AGore\\HeadDemo\\KBSplines.bb",
                ".\\data\\samples\\AGore\\BirdDemo\\KBSplines.bb",
                ".\\data\\samples\\RobHutchinson\\BBLauncher\\launcher2d.bb",
                ".\\data\\samples\\RobHutchinson\\SkyPlateau\\launcher3d.bb",
                ".\\data\\samples\\RobHutchinson\\BBLauncher\\launcher3d.bb",
                ".\\data\\samples\\Hi-Toro\\Death Island\\incs\\lensHowTo.bb",
                ".\\data\\samples\\Hi-Toro\\Death Island\\incs\\lensIncs.bb",
                ".\\data\\samples\\halo\\Lightmap\\lightmap.bb",
                ".\\data\\samples\\birdie\\thunder\\lightning.bb",
                ".\\data\\tutorials\\GCUK_Tuts\\lights.bb",
                ".\\data\\samples\\mak\\lights\\lights.bb",
                ".\\data\\samples\\birdie\\LodMesh\\lmesh.bb",
                ".\\data\\samples\\birdie\\texpaint\\main.bb",
                ".\\data\\samples\\birdie\\CameraPickST\\CameraPickST\\main.bb",
                ".\\data\\samples\\birdie\\Jet Tails\\Main.bb",
                ".\\data\\samples\\birdie\\Fire Effect\\Fire Effect\\Main.bb",
                ".\\data\\samples\\mak\\anim\\makbot\\MAK-sfx.bb",
                ".\\data\\tutorials\\basic_tuts\\maths.bb",
                ".\\data\\samples\\si\\matrix\\matrix.bb",
                ".\\data\\mediaview\\mediaview.bb",
                ".\\data\\Games\\wing_ring\\menus.bb",
                ".\\data\\samples\\halo\\MeshFX\\meshfx.bb",
                ".\\data\\samples\\birdie\\Mirror\\mirror.bb",
                ".\\data\\samples\\RobHutchinson\\ModelChildren\\modelchildren.bb",
                ".\\data\\tutorials\\GCUK_Tuts\\movement.bb",
                ".\\data\\samples\\mak\\multi_tex\\multi_tex.bb",
                ".\\data\\samples\\mak\\multicam\\multicam.bb",
                ".\\data\\samples\\Richard_Betson\\orbit_nebula_source\\orbit.bb",
                ".\\data\\samples\\mak\\pick\\pick.bb",
                ".\\data\\Games\\wing_ring\\player2.bb",
                ".\\data\\samples\\Richard_Betson\\Power_fountain_b\\power_fountian_b.bb",
                ".\\data\\samples\\mak\\primitives\\primitives.bb",
                ".\\data\\tutorials\\basic_tuts\\print.bb",
                ".\\data\\samples\\RobCummings\\PyromaniaBB\\PyromaniaBB-1.bb",
                ".\\data\\samples\\birdie\\Quick Deform\\qd.bb",
                ".\\data\\tutorials\\basic_tuts\\random numbers.bb",
                ".\\data\\Games\\wing_ring\\readme.bb",
                ".\\data\\samples\\zenith\\scare\\scare.bb",
                ".\\data\\Games\\wing_ring\\scenery.bb",
                ".\\data\\tutorials\\GCUK_Tuts\\settingup.bb",
                ".\\data\\samples\\halo\\Shadows\\shadows.bb",
                ".\\data\\samples\\Hi-Toro\\Shooter\\Shooter\\shooter-testbed.bb",
                ".\\data\\tutorials\\basic_tuts\\simple maths.bb",
                ".\\data\\samples\\RobHutchinson\\SkyPlateau\\SkyPlateau.bb",
                ".\\data\\samples\\birdie\\2d-3dsprites\\sprites.bb",
                ".\\data\\samples\\Skully\\start.bb",
                ".\\data\\samples\\RobHutchinson\\WateryTerrain\\start.bb",
                ".\\data\\samples\\RobHutchinson\\ModelChildren\\start.bb",
                ".\\data\\samples\\RobHutchinson\\CraftFlare\\start.bb",
                ".\\data\\samples\\RobCummings\\PyromaniaBB\\start.bb",
                ".\\data\\samples\\Richard_Betson\\start.bb",
                ".\\data\\samples\\mak\\start.bb",
                ".\\data\\samples\\halo\\start.bb",
                ".\\data\\samples\\AGore\\start.bb",
                ".\\data\\tutorials\\basic_tuts\\step.bb",
                ".\\data\\samples\\birdie\\lodBalls\\subdiv.bb",
                ".\\data\\samples\\birdie\\te\\TE.bb",
                ".\\data\\samples\\mak\\teapot\\teapot.bb",
                ".\\data\\samples\\birdie\\UVMapping\\UVMapping\\test.bb",
                ".\\data\\samples\\birdie\\Spherical Landscapes\\testbed.bb",
                ".\\data\\samples\\mak\\tex_render\\tex_render.bb",
                ".\\data\\tutorials\\GCUK_Tuts\\texture.bb",
                ".\\data\\samples\\AGore\\HeadDemo\\TheHead.bb",
                ".\\data\\samples\\birdie\\thunder\\thunder.bb",
                ".\\data\\Games\\TunnelRun\\tr.bb",
                ".\\data\\samples\\mak\\tron\\tron.bb",
                ".\\data\\samples\\birdie\\Terrain Tiling\\tt.bb",
                ".\\data\\samples\\birdie\\Brush Tiles\\tt.bb",
                ".\\data\\tutorials\\basic_tuts\\types1.bb",
                ".\\data\\tutorials\\basic_tuts\\types2.bb",
                ".\\data\\tutorials\\basic_tuts\\variables.bb",
                ".\\data\\tutorials\\basic_tuts\\variables1.bb",
                ".\\data\\tutorials\\basic_tuts\\variables2.bb",
                ".\\data\\tutorials\\basic_tuts\\variables3.bb",
                ".\\data\\tutorials\\GCUK_Tuts\\vertex.bb",
                ".\\data\\samples\\RobHutchinson\\WateryTerrain\\water.bb",
                ".\\data\\Games\\wing_ring\\wing_ring.bb",
                ".\\data\\samples\\RobHutchinson\\WingPilot\\WingPilotV0_01.bb",
                ".\\data\\samples\\mak\\xfighter\\xfighter.bb",
                ".\\data\\samples\\mak\\anim\\anim.bb",
                ".\\data\\tutorials\\GCUK_Tuts\\animation.bb",
                ".\\data\\tutorials\\basic_tuts\\array.bb",
                ".\\data\\tutorials\\basic_tuts\\array1.bb",
                ".\\data\\tutorials\\basic_tuts\\array2.bb",
                ".\\data\\samples\\Richard_Betson\\Big_Bang_1b\\Big_Bang_1b.bb",
                ".\\data\\samples\\Richard_Betson\\Binary_Cage_12\\Binary_Cage_12.bb",
                ".\\data\\samples\\AGore\\BirdDemo\\BirdDemo.bb",
                ".\\data\\samples\\warpy\\blitzdoc.bb",
                ".\\data\\samples\\RobHutchinson\\BloxAndSpheres\\blox&spheres.bb",
                ".\\data\\samples\\MattDavey\\Matts Balls\\bouncey.bb",
                ".\\data\\samples\\RobCummings\\Bumpy\\bumpyfun.bb",
                ".\\data\\tutorials\\GCUK_Tuts\\camera.bb",
            ];
            // private aturans: string[] = [
            //     "\\data\\aturan\\exp.json"
            // ];
            constructor() {
                this.debug();
            }
            async init() {
                // await aturan.loads(this.aturans);
                // gm2.aturanAr.concat(aturan.daftar);
                await this.load2();
            }
            debug() {
                // this.files = [
                //     ".\\data\\testSingle.txt"
                // ];
            }
            async parse(file) {
                let hsl = await ha.comp.Util.Ajax2('get', file, '');
                let barisAr = hsl.split(/\r?\n/);
                for (let i = 0; i < barisAr.length; i++) {
                    await ha.parse.parse.parse(barisAr[i]);
                }
            }
            async load2() {
                let l = this.files.length;
                // l = 5;
                for (let i = 0; i < l; i++) {
                    let file = this.files[i];
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
        parse.test = new Test();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
window.onload = () => {
    ha.parse.test.init().catch((e) => {
        console.error(e);
    });
};
