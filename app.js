const searchedSong = async () =>{
    const songName = document.getElementById('searched-text').value;
    const url =  `https://api.lyrics.ovh/suggest/${songName}`
    displaySpinner();
    try{
        const res = await fetch (url);
     const data =await res.json();
    displaySongs(data.data)
}
    catch (error){
        displayError('Sorry.Something Went Wrong')
    }
}
document.getElementById('searched-text')
.addEventListener("keypress",function(event){
    if (event.key == 'Enter'){
        document.getElementById('search-button').click();
    }

    
});
const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
     songs.forEach(song => {
         
         const songsdiv = document.createElement('div');
         songsdiv.className ='single-result row align-items-center my-3 p-3';
         songsdiv.innerHTML = `
         <div class="col-md-9">
         <h3 class="lyrics-name">${song.title}</h3>
         <p class="author lead">Album by <span>${song.artist.name}</span></p>
         <audio controls> 
         <source src ="${song.preview}" type="audio/mpeg">
         </audio>
     </div>
     
     <div class="col-md-3 text-md-right text-center">
         <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
     </div>`;
         displaySpinner ();
     songContainer.appendChild(songsdiv);
        
    });

};
const getLyric = async (artist,title) =>{
    const url= ` https://api.lyrics.ovh/v1/${artist}/${title}`
   try {
    const res = await fetch (url)
    const data = await res.json()
    displayLyrics(data.lyrics)
   }
   catch (error){
       displayError = "something went wrong"
   }

}
const displayLyrics = lyrics =>{
    const lyricsDiv = document.getElementById('song-lyrics')
    lyricsDiv.innerText = lyrics;
}
const displayError = error => {
    const errorTag =  document.getElementById('error');
    errorTag.innerText = error;
}

const displaySpinner = ()=> {
    const spinner =document.getElementById('spinner')
    const songs = document.getElementById('song-container')
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
    
   
   

}