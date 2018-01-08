package com.foryou.api.pojo;

public class SysConstant {
    /**
     * @Fields CHANNELCODE : (PC-WEB渠道编号)
     */
    public static String CHANNELCODE="01";

    //页面显示判断常量
    public static String CERTIFY="certify";//1实名认证
    public static String BINDBANKCARD="bindbankcard";//2绑定银行卡
    public static String SETPAYPASSWD="setpaypasswd";//3设置支付密码
    public static String APPLYGOLDCARD="applygoldcard";//4申领黄金卡

    public static String PHOTOPREFIX="cutout_";//剪切图片前缀

    //验证码常量
    public static String RANDOMCODE_KEY = "dbjbVC";//verify key
    public static String TOKEN_KEY="dbjb_token";
    public static String RANDOMCODE_OVERDUETIME = "dbjbODT";// overduetime

    public static String USERlOGIN_KEY_EXT="lg_counter_";

    public static String USERLOGIN_AGENT_EXT="agent";
}
