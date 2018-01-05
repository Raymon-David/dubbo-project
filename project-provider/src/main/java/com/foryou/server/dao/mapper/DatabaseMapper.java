package com.foryou.server.dao.mapper;

import org.apache.ibatis.annotations.ResultType;
import org.apache.ibatis.annotations.Select;

/**
 * 获取数据源
 */
public interface DatabaseMapper {

    String sql = "select database()";

    /**
     * 获取数据源
     *
     * @return
     */
    @Select(sql)
    @ResultType(String.class)
    String getDatabaseName();
}
