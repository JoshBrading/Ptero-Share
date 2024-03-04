import express from 'express';
import {getAllUserData, getSystemAllocationStatus} from "./pteroAPI.js";
import cors from 'cors';
import {createClient} from "@supabase/supabase-js";
import 'dotenv/config'

const app = express();
app.use(cors())
const port = process.env.PORT;



const supaClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
app.get('/', async (req, res) => {
    try{
        const userEmail = (await supaClient.auth.getUser(JSON.parse(req.headers.session).access_token)).data.user.email
        res.send(await getAllUserData(userEmail))
    }catch{
        res.send({status: "failed", response: "Invalid request"})
    }
    
})

app.get('/system/allocation', async (req, res) => {
    res.send(await getSystemAllocationStatus())
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})