import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()


async function main (){
// Create an new Artist
    const newArtist = await prisma.artist.create({
        data: {
            name: 'DJ Hlo',
            email:'hlo@kzn.za',
            songs: {create:  {title: 'Winned'} },
        }
    })
    console.log('Created New Artist', newArtist)
    //Get All new Artist
    const AllArtists = await prisma.artist.findMany({
        include: {songs: true}
    })
    console.log('All Artist: ');
    console.dir(AllArtists, {depth: null})
}

main()
   .catch((e)=>console.error(e))
   .finally(async ()=> await prisma.$disconnect())