/**
 * @Author Angus <angusyoung@mrxcool.com>
 * @Description 微信网页开发 API
 * @Since 2019/11/18
 */

import redirect from './api/redirect.js';
import token from './api/token.js';
import checkToken from './api/check-token.js';
import userInfo from './api/user-info.js';
import getTicket from './api/get-ticket.js';
import jsSdkConfig from './api/js-sdk-config.js';

export default class WebSDK {
	constructor(config) {
		this.config = Object.assign({}, config);
	}

	setConfig(config) {
		Object.assign(this.config, config);
	}

	redirect = redirect;
	token = token;
	checkToken = checkToken;
	userInfo = userInfo;
	getTicket = getTicket;
	jsSdkConfig = jsSdkConfig;
}
