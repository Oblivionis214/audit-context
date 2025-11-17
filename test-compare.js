const JS = require('tree-sitter-javascript');
const Sol = require('tree-sitter-solidity');

console.log('JavaScript keys:', Object.keys(JS).sort());
console.log('\nSolidity keys:', Object.keys(Sol).sort());

console.log('\nJS type:', typeof JS);
console.log('JS is function?', typeof JS === 'function');
console.log('Sol type:', typeof Sol);
console.log('Sol is function?', typeof Sol === 'function');
