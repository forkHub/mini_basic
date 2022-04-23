namespace ha.comp {
	export class Util {

		static readonly sUserId: string = 'user_id';
		static readonly sLevel: string = 'level';
		static readonly sFilter: string = 'filter';
		static readonly storageId: string = 'xyz.hagarden.tugas';

		static getEl(query: string, parent: HTMLElement = null, err: boolean = true): HTMLElement {
			let el: HTMLElement;
			if (!parent) parent = document.body;

			el = parent.querySelector(query);

			if (el) {
				return el
			} else {
				log.log(parent);
				log.log(query);
				if (err) {
					throw new Error('query not found ');
				}
				else {
					return null;
				}
			}
		}


		//default error
		static error(e: Error): void {
			console.error(e);
			dialog.tampil(e.message);
		}

		//shared
		static kirimWa(teks: string): string {
			return "whatsapp://send?text=" + teks;
		}

		static getUrl(url: string, params: any[]): string {
			let urlHasil: string = url;

			log.group('get url');
			log.log('url: ' + url);
			log.log('params: ' + JSON.stringify(params));

			params.forEach((item: string) => {
				log.log('reg: ' + urlHasil.search(/\:[a-zA-Z_0-9]+/));
				urlHasil = urlHasil.replace(/\:[a-zA-Z_0-9]+/, item + '');
				log.log('item: ' + item);
				log.log('url: ' + urlHasil);
			});

			log.log('url hasil: ' + urlHasil);
			log.groupEnd();

			return urlHasil;
		}

		static async AjaxLogin(type: string, urlServer: string, dataStr: string, loginUrl: string, pf: (p: ProgressEvent) => void = null): Promise<XMLHttpRequest> {
			let xml: XMLHttpRequest;

			xml = await this.Ajax(type, urlServer, dataStr, pf);
			if (401 == xml.status) {
				window.top.location.href = loginUrl
				return null;
			}
			else {
				return xml;
			}
		}

		static async Ajax2(type: string, url: string, dataStr: string, pf: (p: ProgressEvent) => void = null): Promise<string> {

			let x: XMLHttpRequest = await this.Ajax(type, url, dataStr, pf);
			if (x.status == 200 || x.status == 0) {
				return x.responseText;
			}
			log.log('error status code: ' + x.status);

			throw Error(x.responseText);
		}


		static async Ajax(type: string, url: string, dataStr: string, pf: (p: ProgressEvent) => void = null): Promise<XMLHttpRequest> {
			return new Promise((resolve: any, reject: any) => {
				try {
					log.group('send data');
					// console.log(dataStr);
					log.log("type " + type);

					loading.attach(document.body);

					let xhr: XMLHttpRequest = new XMLHttpRequest();


					xhr.onload = () => {
						loading.detach();
						resolve(xhr);
					};

					xhr.onerror = (e: any) => {
						log.log('xhr error');
						log.log(e);
						loading.detach();
						reject(new Error(e.message));
					}

					xhr.onprogress = (p: ProgressEvent) => {
						if (pf) {
							pf(p);
						}
					}

					xhr.open(type, url + "", true);
					xhr.setRequestHeader('Content-type', 'application/json');

					// xhr.setRequestHeader('from', window.sessionStorage.getItem(Util.sUserId));
					// xhr.setRequestHeader('id', window.sessionStorage.getItem(Util.sUserId));

					xhr.send(dataStr);

					// console.log("type " + type);
					// console.log("url " + url);
					log.groupEnd();
				}
				catch (e) {
					log.log('Util error');
					log.log(e);
					loading.detach();
					reject(new Error(e.message));
				}

			});
		}

	}
}

