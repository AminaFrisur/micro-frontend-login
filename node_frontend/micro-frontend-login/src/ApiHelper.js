import {fetch} from "http";

export function  parseFormLoginData(stringDataRaw) {

  // Hole dir aus dem Form Request die Nutzerdaten für den Login
  let position1 = stringDataRaw.search("loginName=") + 10;
  let position2 = stringDataRaw.search("&password=");
  let position3 = position2 + 10;
  let position4 = stringDataRaw.length;
  console.log(position4);
  let loginName = stringDataRaw.substring(position1, position2);
  let password = stringDataRaw.substring(position3, position4)
  console.log(loginName);
  console.log(password);
  return {"login_name": loginName, "password": password};

}

export async function makePostRequest(bodyData, headers, hostname, port, path) {
  let parsedBodyData = JSON.stringify(bodyData);
  console.log("ApiHelper: ParsedBodyData is " + parsedBodyData);
  console.log("ApiHelper: Make Post Request");
  console.log("ApiHelper: Request to" + "http://" + hostname + ":" + port + path );
  let resp = await fetch("http://" + hostname + ":" + port + path, { method: "POST", body: parsedBodyData, headers: headers });
  console.log("Return Status von Post Request ist " + resp.status);
  if(resp.status != 200) {
    return false;
  }
  const response = await resp.text();
  console.log("test");
  console.log(response);
  return response;
}