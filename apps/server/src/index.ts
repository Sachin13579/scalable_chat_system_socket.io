import http from "http";
import SocketService from "./services/socket";


async function init() {
    const socketService = new SocketService()
    const httpServer = http.createServer((req, res) => {
        if (req.url == "/") {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            return res.end("hello world!");
        }
    });
    const PORT = 8000;
    socketService.io.attach(httpServer);
    httpServer.listen(PORT, () => {
        console.log(`sever is listening on ${PORT}`)
    });
    socketService.initListeners()
}
init();
