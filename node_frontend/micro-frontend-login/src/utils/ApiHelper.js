import {fetch} from "http";

function parseFormData(stringDataRaw) {

  console.log(stringDataRaw);

  try{
    let formData = stringDataRaw.split(/\r?\n/);

    let result = {};
    if (formData) {
      formData[formData.length - 1].split(`&`).forEach(function(item) {
        let [ name, ...rest] = item.split(`=`);
        name = name.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        result[name] = decodeURIComponent(value);
      });
    }
    return result;
  } catch (e) {
    console.log(e);
    return false
  }
}


export function  parseFormLoginData(stringDataRaw) {
    let result = parseFormData(stringDataRaw);
    console.log(result.login_name);
    if(result) {
      return {"login_name": result.login_name, "password": result.password};
    } else {
      return {}
    }
}

export function  parseFormRegisterData(stringDataRaw) {

  let result = parseFormData(stringDataRaw);
  if(result) {
    return {"login_name": result.login_name, "password": result.password, "password_repition": result.password_repition,
            "firstname": result.firstname, "lastname": result.lastname, "street": result.street, "house_number": result.house_number, "postal_code": result.postal_code,
            "email": result.email};

  } else {
    return {}
  }

}

export async function makeRequest(bodyData, headers, hostname, port, path, method) {
  let parsedBodyData = null
  if(method === "POST") {
    parsedBodyData = JSON.stringify(bodyData);
    console.log("ApiHelper: ParsedBodyData is " + parsedBodyData);
  }

  console.log("ApiHelper: Make " + method + " Request");
  console.log("ApiHelper: Request to " + "http://" + hostname + ":" + port + path );
  let resp = await fetch("http://" + hostname + ":" + port + path, { method: method, body: parsedBodyData, headers: headers });
  console.log("Return Status von Post Request ist " + resp.status);
  if(resp.status != 200) {
    return false;
  };
  const response = await resp.text();
  return response;
}

export function parseCookies(cookieHeaders) {
  const list = {};
  if (cookieHeaders) {
    cookieHeaders.split(`,`).forEach(function(cookie) {
      let [ name, ...rest] = cookie.split(`=`);
      name = name.trim();
      if (!name) return;
      const value = rest.join(`=`).trim();
      if (!value) return;
      list[name] = decodeURIComponent(value);
    });
  }

  return list;
}


export async function checkCookies(cookieList, cache, isAdmin, host, port) {
  if(cookieList.login_name == undefined || cookieList.auth_token == undefined) {
    return false;
  }

  let userCacheIndex = cache.getUserIndex(cookieList.login_name);
  if(userCacheIndex < 0) {
    // Das Token ist zwar in den Cookie Headern vorhanden, aber nicht im Cache gespeichert
    // Deshalb checkAuthUser von MS Benutzerverwaltung aufrufen aufrufen
    let response = await makeRequest({"login_name": cookieList.login_name, "auth_token": cookieList.auth_token, "isAdmin": isAdmin},
        { 'Content-Type': 'application/json'}, host, port,
        "/checkAuthUser", "POST");
    let parsedResponse = JSON.parse(response);
    if(!response) {return false};
    cache.updateOrInsertCachedUser(userCacheIndex, cookieList.login_name, cookieList.auth_token,
        parsedResponse.auth_token_timestamp, parsedResponse.is_admin);
    return true;

  } else {
    return cache.checkToken(userCacheIndex, cookieList.auth_token, isAdmin);
  }

}
