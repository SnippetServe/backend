import  express from "express"
const app = express();
const port = 8080;

// Sample endpoint
app.get( "/", ( req:express.Request, res:express.Response ) => {
    res.send("Snippet Serve")
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );