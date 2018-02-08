package com.foryou.consumer.controller.user;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Test {

    public static void main(String[] args){

    }

    public List queryData (){
        //驱动程序就是之前在 classpath中配置的jdbc的驱动程序jar中
        String drive = "oracle.jdbc.driver.OracleDriver" ;
        /**
         * 连接地址,各个厂商提供单独记住
         * jdbc:oracle:thin: @localhost:1521:ORCL localhost 是ip地址。
         */
        String url = "jdbc:oracle:thin:@//10.40.61.30:1521/iBiz" ;
        /**
         * 用户 密码
         */
        String DBUSER= "dcfl";
        String password= "dxb170s";
        List li = new ArrayList();
        TestPojo tp = new TestPojo();

        try{
            //表示数据库连接
            Connection conn = null;
            //表示数据库的更新
            Statement stmt= null;
            //查询数据库
            ResultSet result = null;
            //使用class类来加载程序
            Class. forName(drive);
            //连接数据库
            conn =DriverManager. getConnection(url,DBUSER,password);
            System.out.println("成功" + conn);
            //Statement接口要通过connection接口来进行实例化操作
            stmt = conn.createStatement();
            //执行SQL语句来查询数据库
            result =stmt.executeQuery( "   SELECT        " +
                    "		FIRM_CD	" +
                    "	,	CNTRT_NO	" +
                    "	,	EXT_CNT	" +
                    "	,	GOODS_CD	" +
                    "	,	CONT_FRM	" +
                    "	,	ACCT_PROC	" +
                    "	,	CUST_NO	" +
                    "	,	REQ_CUST_NO	" +
                    "	,	REQ_CLERK	" +
                    "	,	JUSO_GB	" +
                    "	,	USE_CLERK	" +
                    "	,	LS_RLS_GB	" +
                    "	,	SALE_CMP	" +
                    "	,	VNDR_CUST_NO	" +
                    "	,	CONT_DEPT	" +
                    "	,	MGT_DEPT	" +
                    "	,	BIZ_CLERK	" +
                    "	,	MGT_CLERK	" +
                    "	,	AGREE_REQ_YMD	" +
                    "	,	CONT_EMPNO	" +
                    "	,	PRODUCT_YN	" +
                    "	,	AUTO_AGREE_GB	" +
                    "	,	AGREE_YMD	" +
                    "	,	ACK_RST	" +
                    "	,	JUDGE_EMPNO	" +
                    "	,	COST_SET_DATE	" +
                    "	,	GOODS_SET_DATE	" +
                    "	,	DOC_SET_DATE	" +
                    "	,	CONT_SET_YMD	" +
                    "	,	CONT_SET_EMPNO	" +
                    "	,	CONT_VLT_YMD	" +
                    "	,	MRTG_GB	" +
                    "	,	CONT_YMD	" +
                    "	,	EXE_YMD	" +
                    "	,	EXPR_YMD	" +
                    "	,	END_YMD	" +
                    "	,	END_SLIP_NO	" +
                    "	,	END_GB	" +
                    "	,	ACCT_YMD	" +
                    "	,	SLIP_NO	" +
                    "	,	LMT_MGT_MTH	" +
                    "	,	DLY_RAT_CD	" +
                    "	,	DLY_REMIT_DD	" +
                    "	,	PAY_CYL	" +
                    "	,	NXT_PAY_YMD	" +
                    "	,	LST_DAT_YN	" +
                    "	,	REPAY_MTH	" +
                    "	,	FIRST_IJA_CALC_MTH	" +
                    "	,	FIRST_IJA_AMT	" +
                    "	,	RCP_MTH	" +
                    "	,	CHRG_ASST_YN	" +
                    "	,	CHARGE_NO	" +
                    "	,	PRE_DEF_GB	" +
                    "	,	REQ_SND_YN	" +
                    "	,	EQUIPT_CD	" +
                    "	,	ASSU_STTL_WAY	" +
                    "	,	ASSU_RAT	" +
                    "	,	ASSRN_AMT	" +
                    "	,	ASSU_SETOFF_WAY	" +
                    "	,	ASS_STFF_RAT	" +
                    "	,	ASSRN_SETOFF_AMT	" +
                    "	,	UARV_RTN_RAT	" +
                    "	,	UARV_PAY_AMT	" +
                    "	,	IMP_FEE_RAT	" +
                    "	,	IMP_FEE	" +
                    "	,	PAY_FEE_RAT	" +
                    "	,	PAY_FEE_AMT	" +
                    "	,	OBTN_CST	" +
                    "	,	STD_RAT_CD	" +
                    "	,	STD_RAT	" +
                    "	,	FTP_CD	" +
                    "	,	FTP_RAT	" +
                    "	,	FTP_ADST_RAT	" +
                    "	,	SBZ_DAY_BEF	" +
                    "	,	TRM_CALC_WAY	" +
                    "	,	MIN_RAT	" +
                    "	,	INHR_RAT	" +
                    "	,	BFR_IRR	" +
                    "	,	AFT_IRR	" +
                    "	,	PR_PT_RAT	" +
                    "	,	USE_RAT	" +
                    "	,	BIZ_LS_PT	" +
                    "	,	EARN_AMT	" +
                    "	,	DSP_LSS_PRF	" +
                    "	,	PRS_VAL	" +
                    "	,	TERM1_MM	" +
                    "	,	TERM1_DD	" +
                    "	,	TERM1_WW	" +
                    "	,	T1_PAY_RAT	" +
                    "	,	T1_PAY_AMT	" +
                    "	,	T1_SPREAD	" +
                    "	,	T1_CAP_INT_AMT	" +
                    "	,	T1_CAR_TAX	" +
                    "	,	T1_INSU_AMT	" +
                    "	,	TERM2_MM	" +
                    "	,	T2_PAY_RAT	" +
                    "	,	T2_PAY_AMT	" +
                    "	,	T2_SPREAD	" +
                    "	,	T2_CAP_INT_AMT	" +
                    "	,	T2_CAR_TAX	" +
                    "	,	T2_INSU_AMT	" +
                    "	,	TERM3_MM	" +
                    "	,	T3_PAY_RAT	" +
                    "	,	T3_PAY_AMT	" +
                    "	,	T3_SPREAD	" +
                    "	,	T3_CAP_INT_AMT	" +
                    "	,	T3_CAR_TAX	" +
                    "	,	T3_INSU_AMT	" +
                    "	,	RLS_TRM	" +
                    "	,	RLS_SPR_RAT	" +
                    "	,	RLR_CPIN_AMT	" +
                    "	,	RLS_CAR_TAX	" +
                    "	,	RLS_INS_RAT	" +
                    "	,	SNGL_UNT_CD	" +
                    "	,	SNGL_PRC_CD	" +
                    "	,	STM_AMT	" +
                    "	,	BIZ_MTH_CD	" +
                    "	,	DLR_CUST_NO	" +
                    "	,	DLR_PAY_MTH	" +
                    "	,	DLR_INC_RAT	" +
                    "	,	DLR_INC_AMT	" +
                    "	,	AGNT_CUST_NO	" +
                    "	,	AGT_PAY_MTH	" +
                    "	,	AGT_INCN_RAT	" +
                    "	,	AGT_INCN_AMT	" +
                    "	,	DEAL_YMD	" +
                    "	,	DEAL_SEQ	" +
                    "	,	GRP_YN	" +
                    "	,	CLS_OBJ_STD	" +
                    "	,	APP_CRR_RAT	" +
                    "	,	RV_INCL_MTH	" +
                    "	,	SIL_RAT_APP_CD	" +
                    "	,	FR_FIX_MM	" +
                    "	,	LIQ_TERM	" +
                    "	,	ADD_RAT	" +
                    "	,	PRPY_YN	" +
                    "	,	STATUS	" +
                    "	,	DOC_NO	" +
                    "	,	VIR_ACCNT_NO	" +
                    "	,	SETTLE_DAY	" +
                    "	,	RSLT_DEPT	" +
                    "	,	RSLT_CLERK	" +
                    "	,	RSLT_AMT1	" +
                    "	,	RSLT_YMD1	" +
                    "	,	RSLT_AMT2	" +
                    "	,	RSLT_YMD2	" +
                    "	,	RSLT_AMT3	" +
                    "	,	RSLT_YMD3	" +
                    "	,	REMARK1	" +
                    "	,	REMARK2	" +
                    "	,	SEND_MTH	" +
                    "	,	CHG_MTH	" +
                    "	,	EXPD_AMT	" +
                    "	,	CNV_AMT	" +
                    "	,	NOTARIAL_FEE	" +
                    "	,	PNT_PRC_MSG	" +
                    "	,	EXE_GB	" +
                    "	,	CNTR_TRM	" +
                    "	,	CONT_END_YMD	" +
                    "	,	CLS_YMD	" +
                    "	,	CLS_WHY	" +
                    "	,	MNGR_CUST_NO	" +
                    "	,	LST_EXE_YN	" +
                    "	,	RENT_FRM	" +
                    "	,	DC_DD_CNT	" +
                    "	,	STTL_MTH	" +
                    "	,	BUY_AMT	" +
                    "	,	SALE_AMT1	" +
                    "	,	FEE_CUST_NO	" +
                    "	,	NOTARIAL_PAY_SUBJ	" +
                    "	,	STM_PAY_SUBJ	" +
                    "	,	RE_FIX_YMD	" +
                    "	,	LST_MREPAY_YMD	" +
                    "	,	EXE_NO	" +
                    "	,	JDG_SEQ	" +
                    "	,	CAR_TAX_REQYN	" +
                    "	,	THPY_INSU_AMT	" +
                    "	,	RTL_CALC_MTH	" +
                    "	,	INS_EMPNO	" +
                    "	,	INS_DT	" +
                    "	,	LST_UDT_EMPNO	" +
                    "	,	LST_UDT_DT	" +
                    "	,	ESCAPE_FEE	" +
                    "	,	FEE_CD	" +
                    "	,	DEBT_STYLE	" +
                    "	,	UARV_RTN_RAT2	" +
                    "	,	UARV_PAY_AMT2	" +
                    "	,	RETURN_AMT	" +
                    "	,	RETURN_YMD	" +
                    "	,	PER_PAY_YN	" +
                    "	,	PER_PAY_YMD1	" +
                    "	,	PER_PAY_YMD2	" +
                    "	,	PER_PAY_YMD3	" +
                    "	,	PER_PAY_YMD4	" +
                    "	,	PER_PAY_AMT	" +
                    "	,	PER_PAY_AMT1	" +
                    "	,	PER_PAY_AMT2	" +
                    "	,	PER_PAY_AMT3	" +
                    "	,	PER_PAY_AMT4	" +
                    "	,	IMP_FEE1_CD	" +
                    "	,	IMP_FEE2_CD	" +
                    "	,	IMP_FEE3_CD	" +
                    "	,	IMP_FEE4_CD	" +
                    "	,	IMP_FEE_1	" +
                    "	,	IMP_FEE_2	" +
                    "	,	IMP_FEE_3	" +
                    "	,	IMP_FEE_4	" +
                    "	,	IMP_FEE_YN	" +
                    "	,	AGT_ASSRN_RAT	" +
                    "	,	AGT_ASSRN_AMT	" +
                    "	,	S_LOAN_MGT_NO	" +
                    "	,	AGNT_CNTRT_NO	" +
                    "	,	AGNT_EXT_CNT	" +
                    "	,	EXT_GB	" +
                    "	,	REAL_USER	" +
                    "	,	RENT_TXT	" +
                    "	,	EN_INDUST_FORM0	" +
                    "	,	EN_INDUST_TXT	" +
                    "	,	INDUST_ADDR	" +
                    "	,	NOLOCAL_YN	" +
                    "	,	INDUST_MONTH	" +
                    "	,	INDUST_INCOME	" +
                    "	,	INDUST_ACCOUNT	" +
                    "	,	IDEA	" +
                    "	,	SYS_LEVEL	" +
                    "	,	SYS_RESULT	" +
                    "	,	FINAL_STATUS	" +
                    "	,	SEQ_NO	" +
                    "	,	APPLY_NO	" +
                    "	,	EN_INDUST_FORM1	" +
                    "	,	EN_INDUST_FORM2	" +
                    "	,	EN_INDUST_FORM3	" +
                    "	,	EN_INDUST_FORM4	" +
                    "	,	EN_INDUST_FORM5	" +
                    "	,	EN_INDUST_FORM6	" +
                    "	,	EN_INDUST_FORM7	" +
                    "	,	STD_RAT_CD_ADD	" +
                    "	,	PAY_CYL_TYPE	" +
                    "	,	RLS_PAY_RAT	" +
                    "	,	RLS_PAY_AMT	" +
                    "	,	T1_APP_RAT	" +
                    "	,	T2_APP_RAT	" +
                    "	,	T3_APP_RAT	" +
                    "	,	RLS_APP_RAT	" +
                    "	,	AGNT_CUST_NM	" +
                    "	,	FINALLY_NO	" +
                    "	,	CALC_WAY	" +
                    "	,	CLOSE_STATE	" +
                    "	,	SYND_CUST_NO	" +
                    "	,	SYND_CUST_CNT	" +
                    "	,	SORT_NO	" +
                    "	,	IMP_FEE1_CD_RAT	" +
                    "	,	IMP_FEE2_CD_RAT	" +
                    "	,	CNTRT_EMPNO	" +
                    "	,	CNTRT_INS_DT	" +
                    "	,	OBTN_CST_NET_AMT	" +
                    "	,	OBTN_CST_VAT_AMT	" +
                    "	,	IMP_FEE_NET_AMT	" +
                    "	,	IMP_FEE_VAT_AMT	" +
                    "	,	PAK_INFO	" +
                    "	,	INSUR_YN	" +
                    "	,	INSUR_RAT	" +
                    "	,	INSUR_FEE	" +
                    "	,	CNTRT_TYPE	" +
                    "	,	SUNSHIDANBAO_YN	" +
                    "	,	DC_CSSH_INSTALLMENT_TYPE	" +
                    "	,	DC_CSSH_INSTALLMENT_RATE	" +
                    "	,	DC_CSSH_INSTALLMENT_AMT	" +
                    "	,	DC_CSSH_INSTALLMENT_MM	" +
                    "	,	INSTALLMENT_RAT_CD	" +
                    "	,	INSTALLMENT_RAT	" +
                    "	,	INSTALLMENT_RAT_CD_ADD	" +
                    "	,	TRADE_TYPE	" +
                    "	,	FIX_RENT_AMT	" +
                    "	,	RENT_ASSRN_AMT	" +
                    "	,	SMS_SEND_YN	" +
                    "	,	DCS_NO	" +
                    "	,	DC_CSSH_AMT_ZE	" +
                    "	,	PAY_INT_ZE	" +
                    "	,	GOODS_CD_2	" +
                    "	,	ADVANCES_YN	" +
                    "	,	ADVANCES_AMT	" +
                    "	,	DIR_IMP_FEE_YN	" +
                    "	,	DIR_IMP_FEE_SUB_YN	" +
                    "	,	DIR_IMP_FEE_RAT	" +
                    "	,	DIR_IMP_FEE_AMT	" +
                    "   FROM BEX1000T       "
            );

            //判断有没有下一行
            while(result.next()){
                String EMAIL = result.getString(1);
                String USER_PWD = result.getString(2);

                Map<String,Object> mp1 = new HashMap();
                mp1.put( "EMAIL", EMAIL);
                mp1.put( "USER_PWD", USER_PWD);
                System.out.println(mp1);

                li.add(mp1);
            }
            result.close(); //数据库先开后关
            stmt.close();
            conn.close(); //关闭数据库
        }catch (Exception e){

        }
        return li;
    }

}
