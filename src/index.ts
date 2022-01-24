import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient();

const app = express();
app.use(express.json());


//Fetch all artists and their songs
app.get('/artists', async(req, res)=>{
    const artists = await prisma.artist.findMany();
    res.json({
        success: true,
        payload: artists,
        message: "Operation Succesful"

    })
})

//Fetch all released Songs
app.get('/playlist', async(req, res)=>{
    const song = await prisma.song.findMany({
        where: {released: true},
        include: {singer: true}
    })
})

//Fetch  a specific song by Id
app.get(`/song/:id`, async(req, res)=>{
    const {id}= req.params
    const song = await prisma.song.findFirst({
        where: {id: Number(id)},
    })
    res.json({
        success: true,
        payload: song
    })
})

//Create a new Artist
app.post(`/artist`, async(req, res)=>{
    const results = await prisma.artist.create({
        data: {...req.body},
    })
    res.json({
        success:true,
        payload: results
    })
})

//Create or Compose a new song
app.post(`/song`, async(req, res)=>{
    const {title, content, singerEmail} = req.body
    const results = await prisma.song.create({
        data:{
            title,
            content,
            released: false,
            singer:{connect: { email: singerEmail}},
        }
    })
    res.json({
        success:true,
        payload: results
    })
})

//Set a released field of the song
app.put('/song/release/:id', async(req, res)=>{
    const {id}= req.params
    const song= await prisma.song.update({
        where: {id: Number(id)},
        data: {released:true},
    })
    res.json({
        success: true,
        payload:song
    })
})

app.use((req, res, next) =>{
    res.status(404)
    //req.status(404);
    return res.json({
        success: false,
        payload: null,
        message: `API SAYS: Endpoint not  found for Path: ${req.path}`,
    })

})

app.listen(3000, ()=>
console.log('REST API SERVER READY at:  localhost:3000'),
)