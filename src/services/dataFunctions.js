function cleaner(lyrics){
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

module.exports = {
  cleaner,
  countUnique,
}
