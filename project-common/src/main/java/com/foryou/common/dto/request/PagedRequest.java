package com.foryou.common.dto.request;

/**
 * 分页查询请求
 *
 * @param <T>
 */
public class PagedRequest<T> extends BaseRequest {

    private static final long serialVersionUID = 1L;
    public static final int DEFAULT_CURRENT_PAGE = 1;
    public static final int DEFAULT_PAGE_SIZE = 10;

    /**
     * 当前页,默认第一页
     */
    private int currentPage = DEFAULT_CURRENT_PAGE;

    /**
     * 当前页大小，默认10条
     */
    private int pageSize = DEFAULT_PAGE_SIZE;

    /**
     * 是否查询全部，此参数为true，则会忽略page和pageSize参数
     */
    private boolean fetchAll = false;

    public PagedRequest() {
    }

    public void setPageParam(int currentPage, int pageSize) {
        setPageParam(currentPage, pageSize, false);
    }

    public void setPageParam(int currentPage, int pageSize, boolean fetchAll) {
        setCurrentPage(currentPage);
        setPageSize(pageSize);
        setFetchAll(fetchAll);
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = resolveCurrentPage(currentPage);
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = resolvePageSize(pageSize);
    }

    public boolean isFetchAll() {
        return fetchAll;
    }

    public void setFetchAll(boolean fetchAll) {
        this.fetchAll = fetchAll;
    }

    public int resolvePageSize(int pageSize) {
        if (pageSize <= 0) {
            pageSize = DEFAULT_PAGE_SIZE;
        }
        return pageSize;
    }

    public int resolveCurrentPage(int currentPage) {
        if (currentPage <= 0) {
            currentPage = 1;
        }
        return currentPage;
    }
}
