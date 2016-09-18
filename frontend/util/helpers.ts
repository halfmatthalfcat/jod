import * as $ from "jquery";

export function isNullOrEmpty(o: any): Boolean {
  try {
    return o === undefined || o === null || o === "";
  } catch (ex) {
    return true;
  }
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
  ): Promise<T | number> {
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
      $.post(
        `${url}${buildParams(params)}`,
        JSON.stringify(body)
      ).then((data, textStatus, jqXHR) => {
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
        method: "PUT"
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