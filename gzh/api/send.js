/**
 * @Author Angus <angusyoung@mrxcool.com>
 * @Description 微信公众号消息发送
 * @Since 2020/2/3
 * @param params object 消息参数
 * @param params.touser string 接收者（用户）的 OpenID
 * @param params.msgtype string 消息类型。
 * @param params.text object 文本消息，msgtype="text" 时必填
 * @param params.text.content string 文本消息内容
 * @param params.image object 图片消息，msgtype="image" 时必填
 * @param params.image.media_id string 图片消息媒体id，通过素材管理中的接口上传图片获得
 * @param params.voice object 语音消息，msgtype="voice" 时必填
 * @param params.voice.media_id string 语音消息媒体id，通过素材管理中的接口上传语音获得
 * @param params.video object 视频消息，msgtype="video" 时必填
 * @param params.video.media_id string 视频消息媒体id，通过素材管理中的接口上传视频获得
 * @param params.video.thumb_media_id string 视频消息缩略图媒体id，通过素材管理中的接口上传图片获得
 * @param params.video.title string 视频消息标题
 * @param params.video.description string 视频消息描述
 * @param params.music object 音乐消息，msgtype="music" 时必填
 * @param params.music.title string 音乐消息标题
 * @param params.music.description string 音乐消息描述
 * @param params.music.musicurl string 音乐url
 * @param params.music.hqmusicurl string 高品质音乐url
 * @param params.music.thumb_media_id string 音乐消息缩略图媒体id，通过素材管理中的接口上传图片获得
 * @param params.news object 图文消息（点击跳转到外链），msgtype="news" 时必填
 * @param params.news.articles array 图文消息列表，articles 中每一项是一个图文消息对象
 * @param params.news.articles.title string 图文消息标题
 * @param params.news.articles.description string 图文消息描述
 * @param params.news.articles.url string 图文消息点击跳转链接
 * @param params.news.articles.picurl string 图文消息图片链接
 * @param params.mpnews object 图文消息（点击跳转到图文消息页面），msgtype="mpnews" 时必填，图文消息条数限制在1条以内，注意，如果图文数超过1，则将会返回错误码45008。（草稿灰度完成后，此类型不再支持）
 * @param params.mpnews.media_id string 素材ID，通过素材上传接口获得。
 * @param params.mpnewsarticle object 图文消息（点击跳转到图文消息页面），msgtype="mpnewsarticle" 时必填，使用通过 “发布” 系列接口得到的 article_id
 * @param params.mpnewsarticle.article_id string 图文消息（点击跳转到图文消息页面），msgtype="mpnewsarticle" 时必填，使用通过 “发布” 系列接口得到的 article_id
 * @param params.msgmenu object 菜单消息，msgtype="msgmenu" 时必填
 * @param params.msgmenu.head_content string 菜单消息头内容
 * @param params.msgmenu.tail_content string 菜单消息尾内容
 * @param params.msgmenu.list array 菜单按钮列表，按钮个数限制在1个至3个之间
 * @param params.msgmenu.list.id string 菜单按钮id
 * @param params.msgmenu.list.content string 菜单按钮内容
 * @param params.wxcard object 卡券信息，msgtype="wxcard"时必填
 * @param params.wxcard.card_id string 卡券id
 * @param params.miniprogrampage object 小程序消息，msgtype="miniprogrampage"时必填
 * @param params.miniprogrampage.title string 小程序消息标题
 * @param params.miniprogrampage.appid string 小程序appid
 * @param params.miniprogrampage.pagepath string 小程序页面路径
 * @param params.miniprogrampage.thumb_media_id string 小程序消息缩略图媒体id，通过素材管理中的接口上传图片获得
 * @param params.customservice object 以某个客服账号来发消息
 * @param params.customservice.kf_account string 客服账号
 * @param params.aimsgcontext object ai 消息上下文
 * @param params.aimsgcontext.is_ai_msg number 消息下方增加灰色 wording “内容由第三方AI生成” 0 不增加 1 增加
 * @returns Promise
 */

const axios = require('axios');
module.exports = function (params) {
	return this.token().then(
		sToken => {
			return new Promise((resolve, reject) => {
				axios.post('https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' + sToken, params).then(
					({ data: jRes }) => {
						if (jRes.errcode) {
							reject(jRes);
						}
						else {
							resolve(jRes);
						}
					},
					error => {
						if (error.response) {
							let { status, statusText, data } = error.response;
							reject({ errcode: status, errmsg: statusText, data });
						}
						else {
							reject({ errcode: 400 });
						}
					}
				);
			});
		},
		error => {
			return Promise.reject(error);
		}
	);
};
