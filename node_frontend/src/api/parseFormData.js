export async function  parseFormData(req) {

  return new Promise((resolve,reject) => {
    var body = "";
    req.on("data", function(chunk){
      body += chunk;

    });
    req.on("end", function() {
      let noWhitespace = body.replace(/-[0-9]+-/, "");
      noWhitespace = noWhitespace.replace(/[0-9]+\s+Content-Disposition: form-data; /g, "");
      noWhitespace = noWhitespace.replace(/-+name=/g, "");
      noWhitespace = noWhitespace.replace(/-+name=/g, "");
      noWhitespace = noWhitespace.replace(/\s-+/g, "");
      noWhitespace = noWhitespace.replace(/\s/g, '');
      let position1 = noWhitespace.search("\"loginName\"") + 11;
      let position2 = noWhitespace.search("\"password\"")
      let loginName = noWhitespace.substring(position1, position2)
      let password = noWhitespace.substring(position2 + 10, noWhitespace.length)
      console.log(loginName);
      console.log(password);
      resolve({"loginName": loginName, "password": password});
    });

  });
}
