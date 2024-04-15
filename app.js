require('dotenv').config();
const SMTPServer = require("smtp-server").SMTPServer;
// const express = require('express');

// const app = express();

// app.listen(process.env.PORT, () => {
//     console.log("server started on 5000")
// })

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, callBack) {
        console.log("onConnect", session.id);
        // accept the connection
        callBack()
    },

    onMailFrom(address, session, callBack) {
        console.log("onMailFrom", address.address, session.id);
        callBack()
    },

    onRcptTo(address, session, callBack) {
        console.log("onRcptTo", address.address, session.id);
        callBack();
    },
    onData(stream, session, callBack) {
        stream.on('data', (data) => {
            console.log(`onData ${data.toString()}`)
        })
        stream.on('end', callBack);
    }
});

server.listen(process.env.PORT, () => {
    console.log("Server listening on ", process.env.PORT)
})