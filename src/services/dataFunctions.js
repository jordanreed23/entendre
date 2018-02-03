function cleaner(lyrics){
  let newLyrics = lyrics.replace(/["']/g, "").replace(/\W+/g, " ");
  return newLyrics.toLowerCase().split(' ');
}

function countUnique(lyrics){
  let limit = 35000;
  let count = 0;
  let uniqueStr = ''
  let loops = 0;
  for (var i = 0; i < lyrics.length; i++) {
    if(lyrics[i] === '' || lyrics[i] === ' '){
      continue
    }
    if(uniqueStr.search(" " + lyrics[i] + " ") === -1){
      uniqueStr =  uniqueStr + " " + lyrics[i] + " ";
      count++
    }
    loops++;
    if(loops >= limit){
      console.log("hit limit", count);
      break;
    }
  }
  console.log("count", count);
  return count;
}

function combineLyrics(lyricsArr){
  let allLyrics = '';
  for (var i = 0; i < lyricsArr.length; i++) {
    if(lyricsArr[i].lyrics){
      allLyrics = allLyrics + ' ' + lyricsArr[i].lyrics
    }
  }
  return allLyrics;
}

function combineAlbumLyrics(albumsArr){
  let allLyrics = ''
    for (var i = albumsArr.length - 1; i > 0; i--) {
        if(albumsArr[i].songs){
          let songs = albumsArr[i].songs
          for (var j = 0; j < songs.length; j++) {
            if (songs[j].lyrics){
              allLyrics = allLyrics + ' ' + songs[j].lyrics;
            }
          }
        }
    }
    return allLyrics;
}

module.exports = {
  cleaner,
  countUnique,
  combineLyrics,
  combineAlbumLyrics,
}
