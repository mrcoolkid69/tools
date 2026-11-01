

function getWords() {
    const allWords = document.getElementById("text").value;
    const arrWords =  allWords.split(/[\s,().]+/).filter(Boolean);
    const arrWordsClean = arrWords.filter(word => word !== ',');
    return arrWordsClean;
} 

function countWords(words) {
    const wordCounts = words.reduce((acc, word) => {
        const lowerWord = word.toLowerCase();
        acc[lowerWord] = (acc[lowerWord] || 0) + 1;
        return acc;
    }, {});
    return wordCounts;
}

function sortWords(words) {
    const word = Object.entries(words);
    const sorted = [...word].sort((a, b) => b[1] - a[1]);
    return sorted;
}

function displayWords(words){
    const wordList = document.getElementById("topWordsList");
    let wordShow = document.getElementById("wordShowing").valueAsNumber;
    if(isNaN(wordShow)){
        wordShow = 50;
    }
    wordList.innerHTML = "";
    for(let i = 0; i < wordShow;i++){
        if(words[i] === undefined){
            return;
        }
        wordList.innerHTML += `<li>${words[i][0]}: ${words[i][1]}`;
    }

}
function runCountWords() {
    const wordsArr = getWords();
    const wordCount = countWords(wordsArr);
    const wordsSorted = sortWords(wordCount);
    displayWords(wordsSorted);
    console.log(wordsSorted);
} 