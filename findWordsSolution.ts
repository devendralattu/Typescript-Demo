// Time complexity: O(m * n) where m = number of words in the dictionary and n = length of the longest dictionary word
// More specifically, O(m * max(n, i)) where i = length of the input string
// Which can be optimized to O(i + (m * n)) if we precompute frequency for inputString

/**
 *  A function that return an array of words from the dictionary that can be formed by 
 *  rearranging some or all of the letters in the input string.
 */
function findWords(inputString: string, dictionary:string[]): string[] {
    let result: string[] = [];

    for (const word of dictionary) {
        // Early exit case as you need a minimum of word.length letters to form 'word'
        if (word.length > inputString.length) {
            continue;
        }

        // Find the frequency of each character from the 'word'
        const frequencyCounter: Record<string, number> = {};
        for (const char of word) {
            frequencyCounter[char] = (frequencyCounter[char] || 0) + 1;
        }

        // Rearranging letters from 'inputString' is equivalent to consuming letters from above 'word' counter
        // Optimization: frequencyCounter for inputString can also be precomputed outside this loop
        for (const char of inputString) {
            frequencyCounter[char] = (frequencyCounter[char] || 0) - 1;
        }

        // Find if any characters were not consumed by the 'inputString' thereby making the 'word' unable to form
        let canAddWord: boolean = true;
        for (const key in frequencyCounter) {
            if (frequencyCounter[key] > 0) {
                canAddWord = false;
                break;
            }
        }
        if (canAddWord) {
            result.push(word);
        }
    }
    return result;
}
console.log(findWords("ate", ["good"]));
// Expected output: []

console.log(findWords("ate", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]));
// Expected output: ["ate", "eat", "tea"]

console.log(findWords("oogd", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]));
// Expected output: ["dog", "do", "god", "goo", "go", "good"]

console.log(findWords("a", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]));
// Expected output: [] with quicker exit as length of inputString is less than dictionary words

console.log(findWords("aabbc", ["aabbc", "bbc", "bbcc", "aaabc"]));
// Expected output: ["aabbc", "bbc"] 

console.log(findWords("aaaaaaaaabbbbbbbbbccccccccccdddddddddeeeeeeeefffffffgggggggghhhhhhiiiiijjjjkkkkllllmmmmmmmmnnnoopqqqqrrrssssssstttttuuuvvvwwwwxxxyyzz", ["aabbc", "bbc", "bbcc", "aaabc"]));
// Expected output: ["aabbc", "bbc", "bbcc", "aaabc"] 
// Some optimization: it would make sense to precompute the frequency in inputString which can be used to evaluate result when frequency of word is computed
