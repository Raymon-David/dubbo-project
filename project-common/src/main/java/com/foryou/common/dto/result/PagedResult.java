package com.foryou.common.dto.result;

import com.foryou.common.dto.request.PagedRequest;

import java.util.ArrayList;
import java.util.List;

/**
 * 分页查询结果
 *
 * @param <T>
 */
public class PagedResult<T> extends Result<List<T>> {

    private static final long serialVersionUID = 1L;

    /**
     * 是否查询了全部
     */
    private boolean fetchAll = false;

    /**
     * 当前页数
     */
    private int currentPage;

    /**
     * 当前分页大小
     */
    private int pageSize;

    /**
     * 总页数
     */
    private int totalPage;

    /**
     * 总条数
     */
    private long totalCount;

    /**
     * 构建请使用PagedResult.Builder构建
     */
    public PagedResult() {
    }

    public boolean isFetchAll() {
        return fetchAll;
    }

    public void setFetchAll(boolean fetchAll) {
        this.fetchAll = fetchAll;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    public static class Builder<T> {

        private PagedResult<T> pagedResult;

        public Builder() {
            this.pagedResult = new PagedResult<>();
        }

        public static <T> Builder<T> build(PagedRequest<T> request) {
            return new Builder<T>()
                    .ssid(request.getSsid())
                    .currentPage(request.getCurrentPage())
                    .pageSize(request.getPageSize())
                    .fetchAll(request.isFetchAll());
        }

        public Builder<T> ssid(String sid) {
            this.pagedResult.ssid(sid);
            return this;
        }

        public Builder<T> fetchAll(boolean fetchAll) {
            this.pagedResult.setFetchAll(fetchAll);
            return this;
        }

        public Builder<T> currentPage(int currentPage) {
            if (currentPage < 1) {
                throw new IllegalArgumentException("currentPage must be greater than 1 but " + currentPage);
            }
            this.pagedResult.setCurrentPage(currentPage);
            return this;
        }


        public Builder<T> pageSize(int pageSize) {
            if (pageSize < 1) {
                throw new IllegalArgumentException("pageSize must be greater than 1 but " + pageSize);
            }
            this.pagedResult.setPageSize(pageSize);
            return this;
        }

        public PagedResult<T> buildForFailed(String code, String description) {
            this.buildForEmpty();
            this.pagedResult.fail(code, description);

            return this.pagedResult;
        }

        public PagedResult<T> buildForSuccess(int totalPage, long totalCount, List<T> data) {
            if (null == data) {
                return this.buildForEmpty();
            }

            if (totalPage < 0) {
                throw new IllegalArgumentException("totalPage must be greater than 0 but " + totalPage);
            }
            this.pagedResult.setTotalPage(totalPage);
            if (totalCount < 0) {
                throw new IllegalArgumentException("totalCount must be greater than 0 but " + totalCount);
            }
            this.pagedResult.setTotalCount(totalCount);

            this.pagedResult.success(data);
            return this.pagedResult;
        }

        private PagedResult<T> buildForEmpty() {
            this.pagedResult.setTotalPage(0);
            this.pagedResult.setTotalCount(0);
            this.pagedResult.success(new ArrayList<>());

            return this.pagedResult;
        }
    }
}
