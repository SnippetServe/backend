import  express from "express"
const app = express();
const port = 8080;

// GET
app.get( "/", ( req:express.Request, res:express.Response ) => {
    res.json({"status":"get"})
} );

// POST
app.post("/",(req:express.Request,res:express.Response) =>{
    res.json({'status':'post'})
})

// PUT
app.put("/",(req:express.Request, res:express.Response ) => {
    res.json({"status":"put"})
} );

// DELETE
app.delete("/",(req:express.Request,res:express.Response) =>{
    res.json({"status":"delte"})
})

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );