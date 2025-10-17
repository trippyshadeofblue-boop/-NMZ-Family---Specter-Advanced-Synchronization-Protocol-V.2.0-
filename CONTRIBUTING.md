# Contributing to NMZ Family - Specter Advanced Synchronization Protocol

Thank you for your interest in contributing to NMZ Family. We welcome issues, bug reports, suggestions, and pull requests. To make contributions easier to review, please follow these guidelines.

Getting started
- Fork the repository and create a branch for your change: git checkout -b feat/your-feature
- Keep changes focused and small. One logical change per PR makes review faster.

Code style and quality
- Python: follow PEP8. We recommend running flake8 locally: pip install flake8 && flake8 src
- JavaScript/Node: follow standard JS style for the project. If package.json contains linters, run npm ci && npm run lint in the services/ folders.

Tests
- Add or update unit tests alongside bug fixes and features.
- Tests should be runnable from the repository root. Prefer lightweight tests that do not depend on external infrastructure.

Commit messages and PRs
- Use clear, descriptive commit messages. Start with a short summary (<=50 chars) and include details in the body.
- Open a Pull Request against the `main` branch and describe the change, motivation, and any related issues.

Security and responsible disclosure
- If you discover a security issue, please do not create a public issue. Contact the repository owner directly or use a private channel.

Thank you for your contribution!