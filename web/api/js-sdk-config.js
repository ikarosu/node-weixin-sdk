
import util from '../../utils.js';

/**
 * @Author Angus <angusyoung@mrxcool.com>
 * @Description 获取 JS SDK 的配置（实际上这是公众号开放的接口，但是应用是在网页应用上）
 * @Group gzh
 * @Since 2020/2/4
 * @param {String} url - 当前页面 URL
 * @param {Array<string>} apiList - JS API 列表
 * @param {Array<string>} openTagList - 开放标签列表
 * @param {Boolean} debugMode - 是否开启调试模式
 */
export default function (url = '', apiList = [''], openTagList = [''], debugMode = false) {
	const conf = this.config;
	return new Promise((resolve, reject) => {
		this.getTicket().then(
			ticket => {
				const jsApiConfig = {
					debug    : debugMode,
					appid    : conf.appid,
					timestamp: util.wxTimestamp(),
					nonceStr : util.randomString(),
					jsApiList: apiList,
					openTagList: openTagList
				};
				const _sign = [
					`timestamp=${jsApiConfig.timestamp}`,
					`noncestr=${jsApiConfig.nonceStr}`,
					`jsapi_ticket=${ticket}`,
					`url=${url}`
				].sort().join('&');
				jsApiConfig.signature = util.sha1(_sign);
				resolve(jsApiConfig);
			},
			error => reject(error)
		);
	});
};
