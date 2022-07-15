"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const http = require("http");
try {
    http.createServer((request, response) => {
        let reqBody = "";
        let method = request.method;
        let url = request.url;
        let resBody = "";
        let status = 200;
        request
            .on("data", (chunk) => {
            reqBody += chunk;
        })
            .on("error", (err) => {
            console.error(err);
            status = 500;
        })
            .on("end", () => {
            if (method === "POST") {
                if (url === "/encode") {
                    resBody = (0, base_1.encodeBase64)(reqBody);
                }
                else if (url === "/decode") {
                    try {
                        resBody = (0, base_1.decodeBase64)(reqBody);
                    }
                    catch (_a) {
                        resBody = "Invalid base64 string";
                    }
                }
                else {
                    status = 404;
                }
            }
            else {
                status = 404;
            }
            response.on("error", (err) => {
                console.error(err);
                status = 500;
            });
            response.writeHead(status, { "Content-Type": "text/plain" });
            response.write(resBody);
            response.write("\n");
            response.end();
        });
    }).listen(6464, () => {
        console.log("Server running at http://localhost:6464/");
    });
}
catch (e) {
    console.log(e);
}
