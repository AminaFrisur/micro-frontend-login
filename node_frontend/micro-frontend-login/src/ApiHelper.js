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
  return {"loginName": loginName, "password": password};

}