package com.foryou.api.dto;

import com.foryou.api.pojo.Role;
import com.google.common.collect.Lists;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.List;

public class UserObject implements java.io.Serializable{

    private static final long serialVersionUID = -5385122978774889667L;
    private Long id;
    private String usercode; 			//用户编码
    private String realName;			//姓名
    private String username;			//登录名

    private String phone;				//手机号码

    private String clientcode;			//客户编码

    private String idType;				//证件类型
    private String idCard;				//证件号码

    private String orgCode;				//总机构代码
    private String orgCodeName;			//总机构名称

    private String secondOrgCode;		//二级机构代码
    private String secondOrgCodeName;	//二级机构名称

    private String thirdOrgCode;		//三级机构代码
    private String thirdOrgCodeName;	//三级机构名称

    private String accountcode;			//账户编码

    private String dataSource; 			//数据来源 1：App(H5) ； 2 PC端; 3 WeiXin

    private RSAPublicKey publicKey;

    private RSAPrivateKey privateKey;

    private String userType;			//用户类型

    private String loginTime;			//登陆时间戳yyyymmddhhmmss
    private String sessionId;			//标记SessionId

    private UserObject agentUser;		//代理用户对象
    private String payPasswd;

    private String clientLevel;			//客户等级

    private String companyType;    //企业用户

    /*
     * wangkeyi add 2016.6.16
     * **/
    private String email;				//邮箱
    private String activestatus;		//激活状态 1:已激活 2:未激活BIGDECIMAL
    private Role role; // 根据用户ID查询角色列表
    private List<Role> roleList = Lists.newArrayList(); // 拥有角色列表
    private String roleIds; // 根据用户ID查询角色列表

    public String getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(String roleIds) {
        this.roleIds = roleIds;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getActivestatus() {
        return activestatus;
    }

    public void setActivestatus(String activestatus) {
        this.activestatus = activestatus;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Role> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<Role> roleList) {
        this.roleList = roleList;
    }

    public List<Long> getRoleIdList() {
        List<Long> roleIdList = Lists.newArrayList();
        for (Role role : roleList) {
            roleIdList.add(role.getId());
        }
        return roleIdList;
    }

    public void setRoleIdList(List<Long> roleIdList) {
        roleList = Lists.newArrayList();
        for (Long roleId : roleIdList) {
            Role role = new Role();
            role.setId(roleId);
            roleList.add(role);
        }
    }

    /**
     * 用户拥有的角色名称字符串, 多个角色名称用','分隔.
     */
    public String getRoleNames() {
        return "";
    }

    public UserObject(){

    }

    public UserObject(String usercode, String phone, String clientcode,
                      String accountcode, String dataSource, RSAPublicKey publicKey,
                      RSAPrivateKey privateKey) {
        super();
        this.usercode = usercode;
        this.phone = phone;
        this.clientcode = clientcode;
        this.accountcode = accountcode;
        this.dataSource = dataSource;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    public String getUsercode() {
        return usercode;
    }

    public void setUsercode(String usercode) {
        this.usercode = usercode;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getClientcode() {
        return clientcode;
    }

    public void setClientcode(String clientcode) {
        this.clientcode = clientcode;
    }

    public String getAccountcode() {
        return accountcode;
    }

    public void setAccountcode(String accountcode) {
        this.accountcode = accountcode;
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

    public RSAPublicKey getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(RSAPublicKey publicKey) {
        this.publicKey = publicKey;
    }

    public RSAPrivateKey getPrivateKey() {
        return privateKey;
    }

    public void setPrivateKey(RSAPrivateKey privateKey) {
        this.privateKey = privateKey;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public UserObject getAgentUser() {
        return agentUser;
    }

    public void setAgentUser(UserObject agentUser) {
        this.agentUser = agentUser;
    }

    public String getIdType() {
        return idType;
    }

    public void setIdType(String idType) {
        this.idType = idType;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getOrgCodeName() {
        return orgCodeName;
    }

    public void setOrgCodeName(String orgCodeName) {
        this.orgCodeName = orgCodeName;
    }

    public String getSecondOrgCode() {
        return secondOrgCode;
    }

    public void setSecondOrgCode(String secondOrgCode) {
        this.secondOrgCode = secondOrgCode;
    }

    public String getSecondOrgCodeName() {
        return secondOrgCodeName;
    }

    public void setSecondOrgCodeName(String secondOrgCodeName) {
        this.secondOrgCodeName = secondOrgCodeName;
    }

    public String getThirdOrgCode() {
        return thirdOrgCode;
    }

    public void setThirdOrgCode(String thirdOrgCode) {
        this.thirdOrgCode = thirdOrgCode;
    }

    public String getThirdOrgCodeName() {
        return thirdOrgCodeName;
    }

    public void setThirdOrgCodeName(String thirdOrgCodeName) {
        this.thirdOrgCodeName = thirdOrgCodeName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getPayPasswd() {
        return payPasswd;
    }

    public void setPayPasswd(String payPasswd) {
        this.payPasswd = payPasswd;
    }

    public String getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(String loginTime) {
        this.loginTime = loginTime;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getClientLevel() {
        return clientLevel;
    }

    public void setClientLevel(String clientLevel) {
        this.clientLevel = clientLevel;
    }

    public String getCompanyType() {
        return companyType;
    }

    public void setCompanyType(String companyType) {
        this.companyType = companyType;
    }
}
