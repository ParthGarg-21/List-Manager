/**
 * Module which contains string shortening method.
 */

const maxTitleLen = 27; // Max length allowed of the list item title.

function shortenString(str) { // sperate module
    if (str.length <= maxTitleLen) {
        return str;
    }

    const subpartLength = (maxTitleLen - 3) / 2;          // Take 3 dots, and then partition in two parts of equal length
    const s1 = str.substr(0, subpartLength);
    const s2 = str.substr(str.length - subpartLength);
    return `${s1}...${s2}`;
}

export default shortenString;