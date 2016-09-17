import * as $ from 'jquery';

export function isNullOrEmpty(o: any): Boolean {
  try {
    return o === undefined || o === null || o === "";
  } catch(ex) {
    return true;
  }
}

export module Ajax {
  function buildParams(params?: Map<String, String>): String {
    if(!isNullOrEmpty(params)) {
      var paramString = "?";
      params.forEach((key, value) => {
        paramString = paramString + `${key}=${value}&`
      });
      return paramString
    } else {
      return "";
    }
  }

  export function get<T>(
    url: String,
    params?: Map<String, String>
  ): JQueryPromise<T | number> {
    return $.get(
      `${url}${buildParams(params)}`
    ).then((data, textStatus, jqXHR) => {
      switch(jqXHR.status) {
        case 200:
        case 201:
          return data as T;
        default:
          return jqXHR.status
      }
    });
  }

  export function post<A, B>(
    url: String,
    body: A,
    params?: Map<String, String>
  ): JQueryPromise<B | number> {
      return $.post(
        `${url}${buildParams(params)}`,
        JSON.stringify(body)
      ).then((data, textStatus, jqXHR) => {
        switch(jqXHR.status) {
          case 200:
          case 201:
            return data as B;
          default:
            return jqXHR.status
        }
      });
  }

  export function put<A, B>(
    url: String,
    body: A,
    params?: Map<String, String>
  ): JQueryPromise<B | number> {
      return $.ajax({
        url: `${url}${buildParams(params)}`,
        data: JSON.stringify(body),
        method: "PUT"
      }).then((data, textStatus, jqXHR) => {
        switch(jqXHR.status) {
          case 200:
          case 201:
            return data as B;
          default:
            return jqXHR.status
        }
      });
  }

  export function del(
    url: String,
    params?: Map<String, String>
  ): JQueryPromise<boolean> {
    return $.ajax({
      url: `${url}${buildParams(params)}`,
      method: "DELETE"
    }).then((data, textStatus, jqXHR) => {
      switch(jqXHR.status) {
        case 200:
        case 201:
          return true;
        default:
          return false;
      }
    });
  }

}