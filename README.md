# Audit Context

Enhanced Claude Context for Web3 Security Auditors - Semantic code search with security-focused features.

## Overview

Audit Context is a specialized fork of [Claude Context](https://github.com/zilliztech/claude-context) designed specifically for Web3 security auditors and smart contract researchers. It provides semantic code search capabilities enhanced with security-focused features to help auditors quickly find vulnerabilities, understand complex codebases, and perform thorough security assessments.

## What's Different from Claude Context?

This project builds upon the excellent foundation of Claude Context's core indexing engine, with the following enhancements planned for Web3 auditing:

### Planned Features

- **Smart Contract Language Support**: Enhanced support for Solidity, Vyper, Cairo, Move, and other blockchain-specific languages
- **Vulnerability Pattern Detection**: Pre-configured semantic queries for common vulnerability patterns (reentrancy, integer overflow, access control issues, etc.)
- **Audit Report Integration**: Tools to generate and track audit findings directly from code analysis
- **Cross-Contract Analysis**: Enhanced capabilities for analyzing interactions between multiple smart contracts
- **Security Best Practice Templates**: Built-in templates for common security checks and patterns
- **Blockchain-Specific Context**: Understanding of blockchain primitives, gas optimization, and chain-specific security considerations

## Current Status

This is currently a fork focused on the core indexing engine. We're preserving the `packages/core` component to build our Web3-specific enhancements on top of the solid foundation provided by Claude Context.

## Architecture

```
audit-context/
├── packages/
│   └── core/                    # Core indexing engine (from Claude Context)
│       ├── src/
│       │   ├── context.ts       # Main Context class
│       │   ├── splitter/        # Code splitting strategies
│       │   ├── embedding/       # Embedding providers
│       │   ├── vectordb/        # Vector database integrations
│       │   └── sync/            # File synchronization
│       └── package.json
├── package.json
└── pnpm-workspace.yaml
```

## Technology Stack

- **Language**: TypeScript
- **Vector Database**: Milvus/Zilliz Cloud
- **Embedding Models**: OpenAI, VoyageAI, Ollama, Gemini
- **AST Parsing**: Tree-sitter
- **Text Splitting**: LangChain
- **Package Manager**: pnpm (workspace)

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.0.0
- Milvus database or Zilliz Cloud account
- API keys for embedding providers (OpenAI, VoyageAI, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/Oblivionis214/audit-context.git
cd audit-context

# Install dependencies
pnpm install

# Build the core package
pnpm build:core
```

### Configuration

Copy `.env.example` to `.env` and configure your settings:

```bash
# Embedding Provider
OPENAI_API_KEY=your_openai_key_here
# or VOYAGEAI_API_KEY, OLLAMA_BASE_URL, etc.

# Vector Database
MILVUS_ADDRESS=your_milvus_address
MILVUS_TOKEN=your_milvus_token

# Optional: Enable hybrid search (default: true)
HYBRID_MODE=true

# Optional: Custom file extensions
CUSTOM_EXTENSIONS=.sol,.vy,.cairo

# Optional: Embedding batch size
EMBEDDING_BATCH_SIZE=100
```

## Development

```bash
# Watch mode for development
pnpm dev:core

# Lint code
pnpm lint

# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Roadmap

- [x] Fork Claude Context and preserve core engine
- [ ] Add Solidity-specific AST parsing
- [ ] Implement vulnerability pattern detection
- [ ] Create audit-focused MCP server
- [ ] Develop VSCode extension for auditors
- [ ] Build vulnerability knowledge base integration
- [ ] Add cross-contract dependency analysis
- [ ] Implement audit report generation tools

## Contributing

We welcome contributions from the Web3 security community! Whether you're adding new vulnerability patterns, improving language support, or enhancing the core engine, your contributions are valuable.

Please see `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

## Acknowledgments

- **Claude Context**: This project is built upon the excellent work of the [Claude Context team](https://github.com/zilliztech/claude-context)
- **Zilliz/Milvus**: For providing the vector database infrastructure
- **Web3 Security Community**: For inspiration and vulnerability pattern knowledge

## License

MIT License - See LICENSE file for details

## Credits

**Original Claude Context Authors**: Zilliz Team (https://github.com/zilliztech/claude-context)

**Audit Context Enhancements**: Oblivionis214

---

**Note**: This is an early-stage project focused on bringing advanced semantic search capabilities to Web3 security auditing. Contributions and feedback are highly encouraged!
