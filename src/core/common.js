"use strict";

exports.CommonService = class CommonService {
  static responseData(data, statusCode = 200, errorCode, errorMessage, debug) {
    return {
      code: statusCode,
      data,
      errorCode,
      errorMsg: errorMessage,
      debug,
    };
  }
  static responseCount(data, statusCode = 200, errorCode, errorMessage, debug) {
    return {
      code: statusCode,
      count: data,
      errorCode,
      errorMsg: errorMessage,
      debug,
    };
  }

  // 获取分页代码
  static getPageOptions({ column, sort, page, pageSize }, extSortDict) {
    const options = {};
    if (column) {
      if (typeof extSortDict?.[column] === "object") {
        options.sort = extSortDict[column];
      } else {
        options.sort = {
          [column]: sort === "desc" ? -1 : 1,
        };
      }
    }

    if (typeof pageSize === "number") {
      if (typeof page === "number") {
        options.skip = page * pageSize;
      }
      options.limit = pageSize;
    }

    return options;
  }

  // 获取分页代码sql
  static getPageAggreateOpr({ column, sort, page, pageSize }, extSortDict) {
    const oprs = [];
    if (column) {
      const sortOpr = { $sort: null };
      if (typeof extSortDict?.[column] === "object") {
        sortOpr.$sort = extSortDict[column];
      } else {
        sortOpr.$sort = {
          [column]: sort === "desc" ? -1 : 1,
        };
      }
      oprs.push(sortOpr);
    }

    if (typeof pageSize === "number") {
      if (typeof page === "number") {
        oprs.push({
          $skip: page * pageSize,
        });
      }
      oprs.push({
        $limit: pageSize,
      });
    }

    return oprs;
  }

  static getAcceptLanguage(acceptLanguageHeader, defaultAcceptLanguage) {
    if (!acceptLanguageHeader) {
      return defaultAcceptLanguage;
    }
    const result = acceptLanguageHeader
      .split(",")
      .map((l) => {
        const result = l.split(";");
        result[0] = result[0].trim().toLowerCase();
        if (result[1]) {
          result[1] = Number(result[1].replace("q=", ""));
        }
        return result;
      })
      .sort((l1, l2) => l2[1] - l1[1])
      .map((l) => l[0]);
    return result;
  }
};
