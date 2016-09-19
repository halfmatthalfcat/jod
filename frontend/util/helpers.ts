import * as $ from "jquery";

export function isNullOrEmpty(o: any): Boolean {
  try {
    return o === undefined || o === null || o === "";
  } catch (ex) {
    return true;
  }
}

export function chunk<T>(array: Array<T>, chunkSize: number, shift?: number): Array<Array<T>> {
  return array.reduce((acc, curr, i) => {
    if ((i + 1) % chunkSize === 0) {
      acc[acc.length - 1].push(curr);
      acc.push([]);
      return acc;
    } else {
      acc[acc.length - 1].push(curr);
      return acc;
    }
  }, [[]] as Array<Array<T>>);
}

export namespace Ajax {
  function buildParams(params?: Map<String, String>): String {
    if (!isNullOrEmpty(params)) {
      let paramString = "?";
      params.forEach((key, value) => {
        paramString = paramString + `${key}=${value}&`;
      });
      return paramString;
    } else {
      return "";
    }
  }

  export function get<T>(
    url: String,
    params?: Map<String, String>
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      $.get(
        `${url}${buildParams(params)}`
      ).then((data, textStatus, jqXHR) => {
        switch (jqXHR.status) {
          case 200:
          case 201: resolve(data as T); break;
          default: reject(jqXHR);
        }
      });
    });
  }

  export function post<A, B>(
    url: String,
    body: A,
    params?: Map<String, String>
  ): Promise<B> {
    return new Promise<B>((resolve, reject) => {
      $.ajax({
        url: `${url}${buildParams(params)}`,
        data: JSON.stringify(body),
        contentType: "application/json; charset=utf-8",
        type: "POST",
        dataType: "json"
      }).then((data, textStatus, jqXHR) => {
        switch (jqXHR.status) {
          case 200:
          case 201: resolve(data as B); break;
          default: reject(jqXHR); break;
        }
      });
    });
  }

  export function put<A, B>(
    url: String,
    body: A,
    params?: Map<String, String>
  ): Promise<B> {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${url}${buildParams(params)}`,
        data: JSON.stringify(body),
        method: "PUT",
        contentType: "application/json; charset=utf-8"
      }).then((data, textStatus, jqXHR) => {
        switch (jqXHR.status) {
          case 200:
          case 201: resolve(data as B); break;
          default: reject(jqXHR);
        }
      });
    });
  }

  export function del(
    url: String,
    params?: Map<String, String>
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      $.ajax({
        url: `${url}${buildParams(params)}`,
        method: "DELETE"
      }).then((data, textStatus, jqXHR) => {
        switch (jqXHR.status) {
          case 200:
          case 201: resolve(); break;
          default: reject(jqXHR);
        }
      });
    });
  }

}