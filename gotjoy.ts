import http from "http";

interface iDataEntry {
  index: number;
  name: string;
}

interface iData {
  message: string;
  name: string;
  status: number;
  success: boolean;
  data: iDataEntry | iDataEntry[] | null;
}

let dataEntry: iDataEntry[] = [
  { index: 1, name: "Akin" },
  { index: 2, name: "Dami" },
];

let data: iData = {
  message: "Request Not Found",
  name: "Error",
  status: 404,
  success: false,
  data: null,
};

const port = 5055;

const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(
  (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) => {
    const { method, url } = req;

    let body: any = [];

    req.on("data", (chunk) => {
      body.push(chunk);
      //   console.log(chunk);
      //   console.log(body);
    });

    req.on("data", () => {
      // Reading from static DB
      if (method === "GET" && url === "/") {
        data.message = "Reading from DataBase";
        data.name = "Get Request";
        data.status = 200;
        data.success = true;
        data.data = dataEntry;
      } // Writing to static DB
      else if (method === "POST" && url === "/") {
        dataEntry.push(JSON.parse(body));

        data.message = "Writing from DataBase";
        data.name = "Post Request";
        data.status = 201;
        data.success = true;
        data.data = dataEntry;
      }
      // Single from Static DB
      else if (method === "GET") {
        let id = req.url?.split("/")[1];
        console.log(id);

        data.message = "Writing from DataBase";
        data.name = "Post Request";
        data.status = 201;
        data.success = true;
        data.data = dataEntry[parseInt(id!) - 1];
      }
      // Delete from Static DB
      else if (method === "DELETE") {
        let id = parseInt(req.url?.split("/")[1]!) -1;
        let value = dataEntry.filter((el: any) => {
          return el.id !== id;
        });

        data.message = `Deleting "${dataEntry[id].name}"from DataBase`;
        data.name = "Delete_One Request";
        data.status = 201;
        data.success = true;
        data.data = value;

      } // Updating from Static DB
      else if (method === "DELETE") {
        const  {} = JSON.parse(body)
        let id = parseInt(req.url?.split("/")[1]!) -1;
        
       dataEntry[id].name = ;

   

        data.message = `Deleting "${dataEntry[id].name}"from DataBase`;
        data.name = "Delete_One Request";
        data.status = 201;
        data.success = true;
        data.data = dataEntry;

      }
      // Reading and Show Errors
      else {
        data.message = "Reques Not Found";
        data.name = "Error";
        data.status = 404;
        data.success = false;
        data.data = null;
      }
      res.writeHead(data.status, { "content-type": "application/json" });
      res.end(JSON.stringify(data));
    });
  }
);

server.listen(port, () => {
  console.log("");
  console.log(`Server is running on port ${port}`);
});
