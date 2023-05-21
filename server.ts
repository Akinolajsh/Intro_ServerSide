import local from "http";
import online from "https";
import stream from "stream";
import fs from "fs";
import path from "path";

const port: number = 2221;
const URL: string =
  "https://api.nasa.gov/planetary/apod?api_key=1vQha29IYNyn1yhud8t5PniF4NNuwkyjzf9NLEXB";

const app: local.Server<
  typeof local.IncomingMessage,
  typeof local.ServerResponse
> = local.createServer(
  (
    req: local.IncomingMessage,
    res: local.ServerResponse<local.IncomingMessage>
  ) => {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    const { method, url } = req;

    if (method === "GET" && url === "/") {
      console.log(online);

      let body = "";
      online.get(URL, (response) => {
        response.on("data", (chunk) => {
          body += chunk;
        });

        response.on("end", () => {
          let result = JSON.parse(body).url;
          res.end(JSON.stringify(result));

          online.get(result, (respond) => {
            let image = new stream.Transform();
            respond.on("data", (chunk) => {
              image.push(chunk);
            });
            respond.on("end", () => {
                const file = path.join(__dirname, "Pix", "image.png");
                fs.writeFileSync(file, image.read());
            })
          });
        });
      });

      res.end(JSON.stringify(online));
    } else {
    }
  }
);

app.listen(port, () => {
  console.log("");
  console.log("Server is listening...!");
});
