package com.foryou.consumer.process.user;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.dubbo.config.annotation.Service;
import com.foryou.api.bean.ConstClass;
import com.foryou.api.bean.ErrorBean;
import com.foryou.api.bean.ResultBean;
import com.foryou.api.bean.SuccessResult;
import com.foryou.api.bean.error.ErrorDesc;
import com.foryou.api.bean.error.ErrorInfo;
import com.foryou.api.bean.success.StatusBean;
import com.foryou.api.constent.StatusCode;
import com.foryou.api.dto.ExecuteResult;
import com.foryou.api.dto.UserObject;
import com.foryou.api.jedis.JedisUtil;
import com.foryou.api.pojo.SysConstant;
import com.foryou.api.pojo.TUserLoginLog;
import com.foryou.api.session.UsernamePasswordToken;
import com.foryou.api.util.CookieTools;
import com.foryou.consumer.process.common.BaseProcess;
import com.foryou.consumer.process.common.CommonValidateMap;
import com.foryou.consumer.process.common.ICommonProcess;
import com.foryou.consumer.util.JsonTools;
import com.foryou.consumer.util.MemberTools;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserProcess extends BaseProcess {

    private Logger logger = Logger.getLogger(UserProcess.class);
    /**
     * 用户登录
     * @param request
     * @param response
     * @param callback
     * @param json 登录json
     * @throws Exception
     */
    public void login(HttpServletRequest request, HttpServletResponse response,
                      String callback, String json) throws Exception {
        ErrorBean error = new ErrorBean();
        Map<String, Map<String, String>> loginvalidateMap = new HashMap<String, Map<String, String>>();
        loginvalidateMap.put(ICommonProcess.DEFAULT_USER_NAME, CommonValidateMap.getValueByKey(ICommonProcess.DEFAULT_USER_NAME));
        loginvalidateMap.put(ICommonProcess.DEFAULT_LOGINPWD, CommonValidateMap.getValueByKey(ICommonProcess.DEFAULT_LOGINPWD));
        loginvalidateMap.put(ICommonProcess.DEFAULT_USER_TYPE, CommonValidateMap.getValueByKey(ICommonProcess.DEFAULT_USER_TYPE));
        loginvalidateMap.put(ICommonProcess.DEFAULT_MOBILECODE, CommonValidateMap.getValueByKey(ICommonProcess.DEFAULT_MOBILECODE));
        validate(error, json, loginvalidateMap, request);
        // 参数验证未通过
        if (null != error.getError()) {
            writeClientJson(response, error, callback);
            return;
        }
        Map<String, Object> resultmap = JsonTools.jsonToMap(json);
        Subject subject = SecurityUtils.getSubject();
        String userName = resultmap.get(ICommonProcess.DEFAULT_USER_NAME).toString();
        String passWord = resultmap.get(ICommonProcess.DEFAULT_LOGINPWD).toString();
        String verCode = resultmap.containsKey(ICommonProcess.DEFAULT_MOBILECODE) ? resultmap.get(ICommonProcess.DEFAULT_MOBILECODE).toString() : "";
        String userType = resultmap.containsKey(ICommonProcess.DEFAULT_USER_TYPE) ? resultmap.get(ICommonProcess.DEFAULT_USER_TYPE).toString() : ConstClass.USERTYPE_USER;
        String toUrl = resultmap.containsKey(ICommonProcess.DEFAULT_TO_URL) ? resultmap.get(ICommonProcess.DEFAULT_TO_URL).toString() : ConstClass.USERTYPE_USER;
        String type = resultmap.containsKey(ICommonProcess.DEFAULT_USER_LOGIN_TYPE) ? resultmap.get(ICommonProcess.DEFAULT_USER_LOGIN_TYPE).toString() : "1";

        ExecuteResult<UserObject> eResult = new ExecuteResult<UserObject>(StatusCode.OK);
        if (ConstClass.USERTYPE_USER.equals(userType)) {
            //后台判断验证码
            String trueCode = null;
            String cookValue = MemberTools.getImageV(request);
            if (cookValue != null && !cookValue.equals("")) {
                trueCode = (String) JedisUtil.get(cookValue);
                JedisUtil.del(cookValue);
            }
            /**
             * 	// 检查个人用户登录
             */
            Long startTime = System.currentTimeMillis();
            logger.info("用户登录开始:" + userName + " type:" + type + " " + startTime);
            //手机号登录
            if (type.equals("1")) {
               /* eResult = userServiceDubbo.checkUser(userName, passWord, verCode, trueCode);*/
            } else {
                //黄金卡用户
                /*eResult = userServiceDubbo.checkUserGold(userName, passWord, verCode, trueCode);*/
            }
            logger.info("用户登录结束:" + userName + " type:" + type + " " + (System.currentTimeMillis() - startTime));

        } else if (ConstClass.USERTYPE_COMMERCIA.equals(userType)) {
            // 检查商户登录
            /*eResult = userServiceDubbo.checkMerUser(userName, passWord);*/
        } else {
            eResult = new ExecuteResult<UserObject>(StatusCode.UserAccountNotExit);
        }
        /**
         * 参数初步规则验证通过，需要走正式的数据验证流程
         */
        SuccessResult result = new SuccessResult();
        StatusBean status = new StatusBean();
        status.setCode(StatusCode.OK.getValue() + "");
        status.setMessage(StatusCode.OK.GetDescription());
        if (StringUtils.isEmpty(toUrl) || toUrl.contains(ICommonProcess.DEFAULT_TO_LOGIN)) {
            toUrl = ICommonProcess.DEFAULT_INDEX_URL;
        }
        status.setToUrl(URLDecoder.decode(toUrl, DEFAULT_ENCODE));
        result.setStatus(status);
        ResultBean res = new ResultBean();
        res.setResult(result);
        if (eResult.getRntCode().equals(StatusCode.OK)) {
            TUserLoginLog loginlog = new TUserLoginLog();
            loginlog.setLoginName(userName);
            loginlog.setLoginTime(new Date());
            loginlog.setChannelCode(ConstClass.CHANNEL_FWEB);
            loginlog.setLoginIp(request.getHeader("x-forwarded-for"));
            loginlog.setStatus("成功");
            if (type.equals("1")) {
                loginlog.setLoginType(ConstClass.LOGIN_TYPE_PHONE);
            } else {
                loginlog.setLoginType(ConstClass.LOGIN_TYPE_GCARDNO);
            }
            loginlog.setUserName(eResult.getResponseParams().getUsername());
            loginlog.setUserCode(eResult.getResponseParams().getUsercode());
            loginlog.setUserType(eResult.getResponseParams().getUserType());
            loginlog.setOrgCode(eResult.getResponseParams().getOrgCode());
            //userLoginLogServiceDubbo.insertSelective(loginlog);
            //调用shiro验证
            UsernamePasswordToken token = new UsernamePasswordToken();
            //注意这里的username拼接了usertpe
            token.setUsername(eResult.getResponseParams().getUsername() + "#" + eResult.getResponseParams().getUserType() + "#" + MemberTools.getUserAgentIp(request));
            token.setPassword(passWord.toCharArray());
            token.setHost(MemberTools.getFingerprint(request, eResult.getResponseParams().getClientcode()));
            //logger.debug("登录认证通过,调用subject.login------------------------------------------------------!");
            subject.login(token);
            CookieTools.setCookie(SysConstant.USERlOGIN_KEY_EXT, token.getHost(), response);
            writeClientJson(response, res, callback);
            return;
        } else {
            if (type.equals("1")) {
                //userLoginLogServiceDubbo.insertSelective(userName, ConstClass.LOGIN_TYPE_PHONE, request.getHeader("x-forwarded-for"), "登录失败，" + eResult.getRntMsg());
            } else {
                //userLoginLogServiceDubbo.insertSelective(userName, ConstClass.LOGIN_TYPE_GCARDNO, request.getHeader("x-forwarded-for"), "登录失败，" + eResult.getRntMsg());
            }
            ErrorInfo info = new ErrorInfo();
            ErrorDesc desc = new ErrorDesc();
            info.setType("" + eResult.getRntCode().getValue());
            desc.setCode("" + eResult.getRntCode().getValue());
            String message = "用户名或密码错误";
            if (eResult.getRntCode().equals(StatusCode.UserNameIsEmpty)) {
                message = "用户帐号不存在";
            } else if (eResult.getRntCode().equals(StatusCode.PasswordIsEmpty)) {
                message = StatusCode.PasswordIsEmpty.GetDescription();
            } else if (eResult.getRntCode().equals(StatusCode.UserAccountNotExit)) {
                message = StatusCode.UserAccountNotExit.GetDescription();
            } else if (eResult.getRntCode().equals(StatusCode.noPassword)) {
                message = "您尚未设置登录密码，点击确认设置登录密码";
            } else if (eResult.getRntCode().equals(StatusCode.UserStatusError)) {
                message = StatusCode.UserStatusError.GetDescription();
            } else if (eResult.getRntCode().equals(StatusCode.UserIsLogout)) {
                message = "您的账户已被注销，请联系客服400-858-9955";
            } else if (eResult.getRntCode().equals(StatusCode.UserIsFreezed)) {
                message = "您的账户已被冻结，请联系客服400-858-9955";
            } else if (eResult.getRntCode().equals(StatusCode.LockUser)) {
                message = StatusCode.LockUser.GetDescription();
            } else if (eResult.getRntCode().equals(StatusCode.PasswordThereError)) {
                message = StatusCode.PasswordThereError.GetDescription();
            } else if (eResult.getRntCode().equals(StatusCode.PwdError)) {
                message = "用户名或密码错误";
            } else if (eResult.getRntCode().equals(StatusCode.VerifyCodeError)) {
                message = StatusCode.VerifyCodeError.GetDescription();
            } else if (eResult.getRntCode().equals(StatusCode.AppError)) {
                message = "用户名或密码错误";
            } else if (eResult.getRntCode().equals(StatusCode.UserCardUnbind)) {
                message = "此黄金卡号已解绑";
            } else if (eResult.getRntCode().equals(StatusCode.UserCardLoss)) {
                message = "此黄金卡号已挂失";
            }

            desc.setMessage(message);
            info.setErrDesc(desc);
            error.setError(info);
            writeClientJson(response, error, callback);
            return;
        }
    }
}
