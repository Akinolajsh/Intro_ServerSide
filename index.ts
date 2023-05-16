import http from "http";

const food = ["Rice", "Beans", "Yam", "Eba", "Fufu", "Tea", "Bread"];

const data: any = [];

Array.from({ length: 5 }, () => {
  let numb = Math.floor(Math.random() * food.length);
  let cost = Math.floor(Math.random() * 1000);
  data.push({ item: food[numb], cost });
});

console.log(data);

const port: number = 5544;
const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(
  (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) => {
    // const { method, url } = req;
    // if (method === "GET" && url === "/") {
    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.write("We are Good.....!\n");
    //   res.write(JSON.stringify(data));
    //   res.end();
    // }

    let body: string = "";
    let collection: {}[] = [];

    req.on("data", (chunk: Buffer) => {
      body += chunk;
      //   console.log(chunk);
    });

    req.on("data", () => {
      let result: {} = JSON.parse(body);
      collection.push(result);
      res.write(JSON.stringify(collection));
      res.end();
    });
  }
);

server.listen(port, () => {
  console.log("Server listening on port");
});
