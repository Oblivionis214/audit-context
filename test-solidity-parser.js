const fs = require('fs');
const path = require('path');

async function testSolidityParsing() {
    try {
        console.log('Testing Solidity AST parsing...\n');

        // Dynamically import the AstCodeSplitter
        const { AstCodeSplitter } = require('./packages/core/src/splitter/ast-splitter.ts');

        // Read the test Solidity file
        const solidityCode = fs.readFileSync('./test-solidity.sol', 'utf-8');
        console.log('Test contract loaded:', solidityCode.length, 'characters\n');

        // Create splitter instance
        const splitter = new AstCodeSplitter();

        // Parse the Solidity code
        console.log('Parsing Solidity file...\n');
        const chunks = await splitter.split(solidityCode, 'solidity', 'test-solidity.sol');

        console.log(`✅ Successfully parsed! Found ${chunks.length} chunks:\n`);

        // Display chunk information
        chunks.forEach((chunk, index) => {
            console.log(`Chunk ${index + 1}:`);
            console.log(`  Lines: ${chunk.startLine}-${chunk.endLine}`);
            console.log(`  Language: ${chunk.language}`);
            console.log(`  Content preview: ${chunk.content.substring(0, 100)}...`);
            console.log('');
        });

        // Verify we got the expected structures
        const content = chunks.map(c => c.content).join('\n');
        const hasContract = content.includes('contract SimpleBank');
        const hasFunction = content.includes('function deposit');
        const hasModifier = content.includes('modifier onlyOwner');
        const hasEvent = content.includes('event Deposit');
        const hasStruct = content.includes('struct Transaction');

        console.log('Structure detection:');
        console.log(`  Contract declaration: ${hasContract ? '✅' : '❌'}`);
        console.log(`  Function definition: ${hasFunction ? '✅' : '❌'}`);
        console.log(`  Modifier definition: ${hasModifier ? '✅' : '❌'}`);
        console.log(`  Event definition: ${hasEvent ? '✅' : '❌'}`);
        console.log(`  Struct definition: ${hasStruct ? '✅' : '❌'}`);

        console.log('\n✅ Solidity AST parsing test completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

testSolidityParsing();
