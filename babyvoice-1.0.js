// ==UserScript==
// @name         babyvoice
// @version      1.0
// @description  babyfur filter for https://babyfur.me/
// @author       ShadowSky
// @match        https://babyfur.me/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Define your word replacements here
    var wordMap = {
        'little': 'wittle',
        'small': 'smol',
        'soft': 'sawft',
        'diaper': 'padding',
        'wet': 'soggy',
        'poop': 'mess',
        'cat': 'kitty',
        'dog': 'doggie',
        'friend': 'fwend',
        'fuck': '[no-no word]',
        'shit': '[no-no word]',
        'nigger': '[no-no word]',
        'cunt': '[no-no word]',
        'faggot': '[no-no word]',
        'fleabag': '[no-no word]',
        'is': 'ish',
        'change': 'changies',
        'perfect': 'purrfect'
        // Add more replacements as needed
    };

    // Function to replace words
    function replaceWords(text) {
        Object.keys(wordMap).forEach(function(key) {
            var regex = new RegExp('\\b' + key + '\\b', 'gi'); // Case insensitive replacement
            text = text.replace(regex, wordMap[key]);
        });
        return text;
    }

    // Function to traverse and replace words in the document
    function traverseAndReplace(rootNode) {
        var walker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        var node;
        while (node = walker.nextNode()) {
            var originalValue = node.nodeValue;
            var newValue = replaceWords(originalValue);
            if (newValue !== originalValue) {
                node.nodeValue = newValue;
            }
        }
    }

    // Start replacing words on initial page load
    traverseAndReplace(document.body);

    // Observe and replace words in dynamically loaded content
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        traverseAndReplace(node.parentNode);
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
