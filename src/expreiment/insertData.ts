// router.post('/axios/:page', async({params: {page}},res)=>{
        
//         const movie= await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d0e9057c846dee14124bd893b0ecdbfd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_watch_monetization_types=flatrate`);
//         //console.log('tipo: ',typeof movie.data);
//         //console.log('movie: ', movie.data.results);
//         movie.data.results.forEach(async(element: Movie) => {
//             const docRef = db.collection('Films').doc(String(element.id));


//             const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${element.id}/videos?api_key=d0e9057c846dee14124bd893b0ecdbfd&language=en-US`);
//             const videoid = data.results.filter((item: Trailer)=>item.type.includes("Trailer"));

//             const genders =  await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=d0e9057c846dee14124bd893b0ecdbfd&language=en-US`);
            

//             await docRef.set({
//                 adult: element.adult,
//                 backdrop_path: "https://image.tmdb.org/t/p/w500/"+element.backdrop_path,
//                 original_language: element.original_language,
//                 popularity: element.popularity,
//                 poster_path: "https://image.tmdb.org/t/p/w500/"+element.poster_path,
//                 release_date: element.release_date,
//                 title: element.title,
//                 vote_average: element.vote_average,
//                 trailer: `https://www.youtube.com/watch?v=${videoid[0].key}`,
//                 genre: genders.data.genres.find((item: Genre)=>item.id==element.genre_ids[0]) && genders.data.genres.find((item: Genre)=>item.id==element.genre_ids[0]).name,
//                 plot: element.overview
//             })
//         });
    


//     res.json({message: "db clone succesful"})
// })