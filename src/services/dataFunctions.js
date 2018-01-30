function cleaner(lyrics){
  console.log(lyrics);
  let newLyrics = lyrics.replace(/["']/g, "").replace(/\W+/g, " ");
  return newLyrics.toLowerCase().split(' ');
}

function countUnique(lyrics){
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
  return allLyrics
}

module.exports = {
  cleaner,
  countUnique,
  combineLyrics,
}

// console.log(countUnique(cleaner("Chorus: A")));
