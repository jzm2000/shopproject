<template>
	<section class="loginContainer">
		<div class="loginInner">
			<div class="login_header">
				<h2 class="login_logo">硅谷外卖</h2>
				<div class="login_header_title">
					<a
						href="javascript:;"
						:class="{ on: loginWay }"
						@click="loginWay = true"
						>短信登录</a
					>
					<a
						href="javascript:;"
						:class="{ on: !loginWay }"
						@click="loginWay = false"
						>密码登录</a
					>
				</div>
			</div>
			<div class="login_content">
				<form @submit.prevent="login">
					<div :class="{ on: loginWay }">
						<section class="login_message">
							<input
								type="tel"
								maxlength="11"
								placeholder="手机号"
								v-model.number="phone"
							/>
							<button
								:disabled="!rightPhone"
								class="get_verification"
								:class="{ right_phone: rightPhone }"
								@click.prevent="getCode"
							>
								{{ computeTime > 0 ? `已发送(${computeTime}s)` : "获取验证码" }}
							</button>
						</section>
						<section class="login_verification">
							<input
								type="tel"
								maxlength="8"
								placeholder="验证码"
								v-model="code"
							/>
						</section>
						<section class="login_hint">
							温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
							<a href="javascript:;">《用户服务协议》</a>
						</section>
					</div>
					<div :class="{ on: !loginWay }">
						<section>
							<section class="login_message">
								<input
									type="text"
									maxlength="11"
									placeholder="手机/邮箱/用户名"
									v-model="name"
								/>
							</section>
							<section class="login_verification">
								<input
									type="password"
									maxlength="8"
									placeholder="密码"
									v-if="!showPwd"
									v-model="pwd"
								/>
								<input
									type="tel"
									maxlength="8"
									placeholder="密码"
									v-model="pwd"
									v-else
								/>
								<div
									class="switch_button"
									:class="showPwd ? 'on' : 'off'"
									@click="showPwd = !showPwd"
								>
									<div class="switch_circle" :class="{ right: showPwd }"></div>
									<span class="switch_text">{{ showPwd ? "abc" : "" }}</span>
								</div>
							</section>
							<section class="login_message">
								<input
									type="text"
									maxlength="11"
									placeholder="验证码"
									v-model="captcha"
								/>
								<img
									class="get_verification"
									src="http://localhost:4000/captcha"
									alt="captcha"
									@click="getCaptcha"
									ref="captcha"
								/>
							</section>
						</section>
					</div>
					<button class="login_submit">登录</button>
				</form>
				<a href="javascript:;" class="about_us">关于我们</a>
			</div>
			<a href="javascript:" class="go_back" @click="$router.back()">
				<i class="iconfont icon-jiantou2"></i>
			</a>
		</div>
		<AlertTip :alertText="alertText" @closeTip="a" v-show="showAlert" />
	</section>
</template>
<script>
import AlertTip from "../components/AlertTip"
import { reqSendCode,reqSmsLogin,reqPwdLogin } from '../api'
export default {
	components: { AlertTip },
	name: "Login",
	data() {
		return {
			// true代表短信登录,false代表密码登录
			loginWay: true,
			phone: "", //手机号
			computeTime: 0,
			showPwd: false, //是否显示密码
			pwd: "", //密码
			code: '',//短信验证码
			name: '',//用户名
			captcha: '',//图形验证码
			alertText: '',//提示文本
			showAlert: false,//是否显示提示框
		};
	},
	computed: {
		//返回的是布尔值ture/false
		rightPhone() {
			return /^1\d{10}$/.test(this.phone);
		},
	},
	methods: {
		// 异步获取短信验证码
		async getCode() {
			if(!this.computeTime) {
				this.computeTime=30;
				this.timer=setInterval(() => {
					this.computeTime--;
					if(!this.computeTime) {
						clearInterval(this.timer);
					}
				},1000)
			}
			//发送ajax请求(向指定手机号发送验证码短信)
			const result=await reqSendCode(this.phone)
			if(result.code===1) {
				//显示提示
				this.alertText=result.msg
				//停止倒计时
				if(this.computeTime) {
					this.computeTime=0
					clearInterval(this.timer)
					this.timer=undefined
				}
			}
		},
		// 异步登录
		async login() {
			let result;
			//前台表单验证
			if(this.loginWay) {
				const { rightPhone,phone,code }=this
				if(!rightPhone) {
					//手机号不正确
					this.showAlert=true
					this.alertText='手机号不正确'

				} else if(!/^\d{6}$/.test(code)) {
					//验证码必须是6位数字
					this.showAlert=true
					this.alertText='验证码必须是6位数字'

				}
				// 发送ajax请求短信登录
				result=await reqSmsLogin(phone,code)
			} else {//密码登录
				const { name,pwd,captcha }=this
				if(!name) {
					//用户必须指定
					this.showAlert=true
					this.alertText='用户必须指定'

				} else if(!pwd) {
					//密码必须指定
					this.showAlert=true
					this.alertText='密码必须指定'

				} else if(!captcha) {
					//验证码必须指定
					this.showAlert=true
					this.alertText='验证码必须指定'

				}
				//停止计时
				if(this.computeTime) {
					this.computeTime=0
					clearInterval(this.timer)
					this.timer=undefined
				}
				// 根据结果数据处理
				result=await reqPwdLogin({ name,pwd,captcha })

			}
			//根据结果数据处理
			if(result.code===0) {
				const user=result.data
				//将user保存到vuex的state
				//去个人中心界面
				this.$store.dispatch('recordUser',user)

				this.$router.replace('/profile')
			} else {
				// 失败后显示新的图片验证码
				this.getCaptcha();
				//清空输入框
				this.captcha=''
				//显示错误信息
				const msg=result.msg
				this.alertText=msg
				this.showAlert=true

			}
		},
		// 关闭弹出框
		a() {
			this.showAlert=false;
			this.alertText=''
		},
		// 获取一个新的图片验证码
		getCaptcha() {
			this.$refs.captcha.src='http://localhost:4000/captcha?time='+Date.now()

		}
	},

};
</script>
<style scoped>
.loginContainer {
	width: 100%;
	height: 100%;
	background: #fff;
}
.loginContainer .loginInner {
	padding-top: 60px;
	width: 80%;
	margin: 0 auto;
}
.loginContainer .loginInner .login_header .login_logo {
	font-size: 40px;
	font-weight: bold;
	color: #02a774;
	text-align: center;
}
.loginContainer .loginInner .login_header .login_header_title {
	padding-top: 40px;
	text-align: center;
}
.loginContainer .loginInner .login_header .login_header_title > a {
	color: #333;
	font-size: 14px;
	padding-bottom: 4px;
}
.loginContainer .loginInner .login_header .login_header_title > a:first-child {
	margin-right: 40px;
}
.loginContainer .loginInner .login_header .login_header_title > a.on {
	color: #02a774;
	font-weight: 700;
	border-bottom: 2px solid #02a774;
}
.loginContainer .loginInner .login_content > form > div {
	display: none;
}
.loginContainer .loginInner .login_content > form > div.on {
	display: block;
}
.loginContainer .loginInner .login_content > form > div input {
	width: 100%;
	height: 100%;
	padding-left: 10px;
	box-sizing: border-box;
	border: 1px solid #ddd;
	border-radius: 4px;
	outline: 0;
	font: 400 14px Arial;
}
.loginContainer .loginInner .login_content > form > div input:focus {
	border: 1px solid #02a774;
}
.loginContainer .loginInner .login_content > form > div .login_message {
	position: relative;
	margin-top: 16px;
	height: 48px;
	font-size: 14px;
	background: #fff;
}
.loginContainer
	.loginInner
	.login_content
	> form
	> div
	.login_message
	.get_verification {
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	border: 0;
	color: #ccc;
	font-size: 14px;
	background: transparent;
}
.loginContainer
	.loginInner
	.login_content
	> form
	> div
	.login_message
	.right_phone {
	color: #000;
}
.loginContainer .loginInner .login_content > form > div .login_verification {
	position: relative;
	margin-top: 16px;
	height: 48px;
	font-size: 14px;
	background: #fff;
}
.loginContainer
	.loginInner
	.login_content
	> form
	> div
	.login_verification
	.switch_button {
	font-size: 12px;
	border: 1px solid #ddd;
	border-radius: 8px;
	transition: background-color 0.3s, border-color 0.3s;
	padding: 0 6px;
	width: 30px;
	height: 16px;
	line-height: 16px;
	color: #fff;
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
}
.loginContainer
	.loginInner
	.login_content
	> form
	> div
	.login_verification
	.switch_button.off {
	background: #fff;
}
.loginContainer
	.loginInner
	.login_content
	> form
	> div
	.login_verification
	.switch_button.off
	.switch_text {
	float: right;
	color: #ddd;
}
.loginContainer
	.loginInner
	.login_content
	> form
	> div
	.login_verification
	.switch_button.on {
	background: #02a774;
}
.loginContainer
	.loginInner
	.login_content
	> form
	> div
	.login_verification
	.switch_button
	> .switch_circle {
	position: absolute;
	top: -1px;
	left: -1px;
	width: 16px;
	height: 16px;
	border: 1px solid #ddd;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
	transition: transform 0.3s;
}
.loginContainer
	.loginInner
	.login_content
	> form
	> div
	.login_verification
	.switch_button
	.right {
	transform: translateX(26px);
}
.loginContainer .loginInner .login_content > form > div .login_hint {
	margin-top: 12px;
	color: #999;
	font-size: 14px;
	line-height: 20px;
}
.loginContainer .loginInner .login_content > form > div .login_hint > a {
	color: #02a774;
}
.loginContainer .loginInner .login_content > form .login_submit {
	display: block;
	width: 100%;
	height: 42px;
	margin-top: 30px;
	border-radius: 4px;
	background: #4cd96f;
	color: #fff;
	text-align: center;
	font-size: 16px;
	line-height: 42px;
	border: 0;
}
.loginContainer .loginInner .login_content .about_us {
	display: block;
	font-size: 12px;
	margin-top: 20px;
	text-align: center;
	color: #999;
}
.loginContainer .loginInner .go_back {
	position: absolute;
	top: 5px;
	left: 5px;
	width: 30px;
	height: 30px;
}
.loginContainer .loginInner .go_back > .iconfont {
	font-size: 20px;
	color: #999;
}
</style>