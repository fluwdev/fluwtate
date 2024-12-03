# Contributing to Fluwstate

Thank you for considering contributing to this project! Your collaboration is essential to building a robust and useful library. Please follow these guidelines to ensure a smooth and productive contribution process.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Guidelines](#development-guidelines)
4. [Testing](#testing)
5. [Submitting Changes](#submitting-changes)
6. [Contributing New Features](#contributing-new-features)
7. [Bug Reports](#bug-reports)

---

## Code of Conduct

By contributing, you agree to uphold the community's Code of Conduct. Please be respectful, collaborative, and constructive.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (LTS version recommended)
- `pnpm` package manager
- Git

Clone the repository:

```bash
git clone https://github.com/fluwdev/fluwstate.git
cd fluwstate
```

Install the dependencies:

```bash
pnpm install
```

## Running the tests

To run the tests, you can use the following command:

```bash
pnpm test
```

---

## Development Guidelines

### Folder Structure

This project has the following main folders:

- `src/`: The main source code.
- `test/`: Contains all unit tests and integration tests.
- `docs/`: Documentation files, including API references.

### Coding Standards

- Use TypeScript for all development.
- Follow functional programming principles whenever possible.
- Commit messages must follow the Conventional Commits format. - Write

## Testing

This project uses Vitest as the testing framework alongside @testing-library/react. All contributions must include appropriate test cases.

### Running Tests

Run all tests:

```bash
pnpm test
```

### Adding Tests

1. Create or update tests in the test/ folder.
2. Test coverage must include edge cases, such as:
    - Error handling for asynchronous operations.
    - State updates and reactivity.
    - Usage of hooks like useStore.

---

## Submitting Changes

1. **Fork the repository** and create your branch from main.

```bash
git checkout -b feature/your-feature
```

2. **Commit your changes** using descriptive commit messages.

```bash
git commit -m "feat: Your feature description"
```

3. Push your branch:

```bash
git push origin feature/your-feature
```

4. Open a Pull Request on the main repository.

### Checklist before submitting a PR:

- All tests pass (pnpm test).
- Linter shows no errors (pnpm lint).
- Your changes are well-documented in docs/ or comments.

## Contributing New Features

When proposing a new feature:

1. Open an issue to discuss the feature with maintainers.
2. Provide a detailed description of your idea, including:
    - Use cases.
    - API examples.
    - How it integrates with the existing functionality.
3. Follow the guidelines above to implement and submit the feature.

## Bug Reports

If you find a bug, please open an issue on GitHub with the following information:

1. A clear and descriptive title.
2. Steps to reproduce the issue.
3. Expected and actual behavior.
4. Relevant code or configuration (if applicable).
