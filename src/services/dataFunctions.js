function cleaner(lyrics){
  console.log(lyrics);
  let newLyrics = lyrics.replace(/["']/g, "").replace(/\W+/g, " ");
  return newLyrics.toLowerCase().split(' ');
}

function countUnique(lyrics){
  let limit = 40000;
  let count = 0;
  let uniqueStr = ''
  for (var i = 0; i < lyrics.length; i++) {
    if(lyrics[i] === '' || lyrics[i] === ' '){
      continue
    }
    if(uniqueStr.search(" " + lyrics[i] + " ") === -1){
      uniqueStr =  uniqueStr + " " + lyrics[i] + " ";
      count++
    }
    if(count >= limit){
      break;
    }
  }
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

// console.log(countUnique(cleaner("Chorus: A")));
