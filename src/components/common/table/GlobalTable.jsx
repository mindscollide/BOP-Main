import { Table } from "antd";
import React from "react";
import "./GlobalTable.css";
const GlobalTable = ({
  columns,
  prefixCls,
  dataSource,
  bordered,
  pagination,
  footer,
  style,
  locale,
  rowClassName,
  dropdownPrefixCls,
  expandable,
  onChange,
  className,
  onHeaderRow,
  scroll,
  onScroll, rowHoverBg
}) => {
  return (
    <Table
      columns={columns}
      prefixCls={prefixCls}
      dataSource={dataSource}
      bordered={bordered}
      pagination={pagination}
      footer={footer}
      style={style}
      rowClassName={rowClassName}
      dropdownPrefixCls={dropdownPrefixCls}
      expandable={expandable}
      onChange={onChange}
      onHeaderRow={onHeaderRow}
      className={className}
      locale={locale}
      scroll={scroll}
      onScroll={onScroll}
      rowHoverBg={rowHoverBg}

    />
  );
};

export default GlobalTable;
