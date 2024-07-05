### Problem statement: 
Create a function that returns an array of words from the dictionary that can be formed by rearranging some or all of the letters in the input string.

### Intuition: 
Consider the word "hello". If we are given an infinite number of characters to play with, we can use 1h, 1e, 2l, and 1o from the set to form this word.<br>
Note: if the word consists of 2 l's, we need at least 2 l's as we cannot reuse the same used letter twice. <br>
Here we do not care about the other letters not used to construct "hello". <br>
Therefore, we aim to fulfill the frequency of letters in the dictionary words by parsing them with the frequency of letters from the input string.

### Time complexity:
$O(m * n)$ where $m$ = number of words in the dictionary and $n$ = length of the longest dictionary word<br>
More specifically, $O(m * max(n, i))$ where $i$ = length of the input string<br>
Which can be optimized to $O(i + (m * n))$ if we precompute frequency for inputString
