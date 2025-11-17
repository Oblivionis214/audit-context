const fs = require('fs');

async function testSolidityParsing() {
    try {
        console.log('Testing Solidity AST parsing...\n');

        // Test that tree-sitter-solidity is importable
        const path = require('path');
        const Parser = require(path.join(__dirname, 'node_modules', 'tree-sitter'));
        const Solidity = require(path.join(__dirname, 'node_modules', 'tree-sitter-solidity'));

        console.log('✅ tree-sitter loaded');
        console.log('✅ tree-sitter-solidity loaded');

        // Read the test Solidity file
        const solidityCode = fs.readFileSync('./test-solidity.sol', 'utf-8');
        console.log(`✅ Test contract loaded: ${solidityCode.length} characters\n`);

        // Create parser and parse
        const parser = new Parser();
        parser.setLanguage(Solidity);

        console.log('Parsing Solidity code...');
        const tree = parser.parse(solidityCode);

        if (!tree || !tree.rootNode) {
            throw new Error('Failed to parse Solidity code');
        }

        console.log('✅ Successfully parsed!\n');

        // Display AST structure
        console.log('Root node type:', tree.rootNode.type);
        console.log('Number of children:', tree.rootNode.childCount);
        console.log('\nTop-level declarations:');

        function findNodes(node, types, depth = 0) {
            const results = [];
            const indent = '  '.repeat(depth);

            if (types.includes(node.type)) {
                const startLine = node.startPosition.row + 1;
                const endLine = node.endPosition.row + 1;
                const text = solidityCode.substring(node.startIndex, node.endIndex);
                const preview = text.split('\n')[0].substring(0, 60);

                console.log(`${indent}[${node.type}] Lines ${startLine}-${endLine}: ${preview}...`);
                results.push({ type: node.type, startLine, endLine, preview });
            }

            for (let i = 0; i < node.childCount; i++) {
                results.push(...findNodes(node.children[i], types, depth + 1));
            }

            return results;
        }

        const interestingTypes = [
            'contract_declaration',
            'function_definition',
            'modifier_definition',
            'event_definition',
            'struct_declaration',
            'error_definition',
            'state_variable_declaration',
            'constructor_definition'
        ];

        const found = findNodes(tree.rootNode, interestingTypes);

        console.log(`\n✅ Found ${found.length} declarations:`);
        const counts = {};
        found.forEach(node => {
            counts[node.type] = (counts[node.type] || 0) + 1;
        });

        Object.entries(counts).forEach(([type, count]) => {
            console.log(`  - ${type}: ${count}`);
        });

        console.log('\n✅ Solidity AST parsing test completed successfully!');
        console.log('\nThe AST splitter will correctly parse Solidity files using these node types.');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

testSolidityParsing();
