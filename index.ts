//we have four operations
//write
//read
//update
//delete
//message, name, status, success, data
import http from 'http'

interface iData {
    message: string,
    name: string,
    status: number,
    success: boolean,
    data: any
}

let data: iData = {
    message: '',
    name: '',
    status: 0,
    success: false,
    data: null
}

interface iDataEntry {
    index: number,
    name: string
}

let dataEntry: iDataEntry[] = [
    { index: 1, name: 'Jecinta' },
    { index: 2, name: 'Jemima' },
]

const server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
        const { method, url } = req;

        let body: any = []
        req.on("data", (chunk) => {
            body += chunk
            console.log(body)
        })
        req.on("data", () => {
            // for Reading
            if (method === 'GET' && url === '/') {
                data.name = "GET method"
                data.message = "GET is working"
                data.status = 200
                data.success = true
                data.data = dataEntry
                // for writing
            } else if (method === 'POST' && url === '/') {

                data.name = "POST method"
                data.message = "POST is working"
                data.status = 201
                data.success = true
                data.data = dataEntry
            }
            else {
                data.name = "Error"
                data.message = "404 Error"
                data.status = 404
                data.success = false
                data.data = null
            }
            res.writeHead(data.status, { "content-type": "application/json" })
            res.end(JSON.stringify(data))
        })
    }
);

const port: number = 1111;

server.listen(port, () => {
    console.log('Listening on :', port)
})