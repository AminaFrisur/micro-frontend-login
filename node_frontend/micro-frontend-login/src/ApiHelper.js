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

export function  parseFormRegisterData(stringDataRaw) {

  // Hole dir aus dem Form Request die Nutzerdaten für die Registrierung
  let positionLogin1 = stringDataRaw.search("login_name=") + "login_name=".length;
  let positionLogin2 = stringDataRaw.search("&password=");
  let loginName = stringDataRaw.substring(positionLogin1, positionLogin2);

  let positionPassword1 = positionLogin2 + "&password=".length;
  let positionPassword2 = stringDataRaw.search("&passwordrepetition=");
  let password = stringDataRaw.substring(positionPassword1, positionPassword2);

  let positionPasswordRepition1 = positionPassword2 + "&passwordrepetition=".length;
  let positionPasswordRepition2 = stringDataRaw.search("&email=");
  let passwordRepition = stringDataRaw.substring(positionPasswordRepition1, positionPasswordRepition2);

  let positionEmail1 = positionPasswordRepition2 + "&email=".length;
  let positionEmail2 = stringDataRaw.search("&firstname=");
  let email = stringDataRaw.substring(positionEmail1, positionEmail2);

  let positionFirstname1 = positionEmail2 + "&firstname=".length;
  let positionFirstname2 = stringDataRaw.search("&lastname=");
  let firstname = stringDataRaw.substring(positionFirstname1, positionFirstname2);

  let positionLastname1 = positionFirstname2 + "&lastname=".length;
  let positionLastname2 = stringDataRaw.search("&street=");
  let lastname = stringDataRaw.substring(positionLastname1, positionLastname2);

  let positionStreet1 = positionLastname2 + "&street=".length;
  let positionStreet2 = stringDataRaw.search("&house_number=");
  let street = stringDataRaw.substring(positionStreet1, positionStreet2);

  let positionHouseNumber1 = positionStreet2 + "&house_number=".length;
  let positionHouseNumber2 = stringDataRaw.search("&postal_code=");
  let houseNumber = stringDataRaw.substring(positionHouseNumber1, positionHouseNumber2);

  let positionPostalCode1 = positionHouseNumber2 + "&postal_code=".length;
  let positionPostalCode2 = stringDataRaw.length
  let postalCode = stringDataRaw.substring(positionPostalCode1, positionPostalCode2);

  email = email.replace("%40", "@");
  street = street.replaceAll("+", " ");

  console.log(loginName);
  console.log(password);
  console.log(passwordRepition)
  console.log(email);
  console.log(firstname);
  console.log(lastname);
  console.log(street);
  console.log(houseNumber);
  console.log(postalCode);


  return {"login_name": loginName, "password": password, "passwordRepition": passwordRepition,
          "firstname": firstname, "lastname": lastname, "street": street, "house_number": houseNumber, "postal_code": postalCode,
          "email": email};

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
  return response;
}