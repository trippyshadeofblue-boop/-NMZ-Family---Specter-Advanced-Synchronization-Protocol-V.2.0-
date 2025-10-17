# NMZ Family - Specter Advanced Synchronization Protocol (V.2.0)

DAX DAC / Vicious R-Wizard Build - Legal Compliant Edition

Short description
This repository contains the Specter Advanced Synchronization Protocol (V.2.0) for the NMZ Family project. It includes example components for an authorized multi-tenant synchronization engine, a secure API gateway protocol, a Solidity smart contract for autonomous release logic (SpecterDropLedger), and supporting Node.js services for oracle aggregation, middleware release handling, and a simple dashboard flip endpoint.

Getting started
1. Clone:
   git clone https://github.com/trippyshadeofblue-boop/-NMZ-Family---Specter-Advanced-Synchronization-Protocol-V.2.0-.git
2. Install dependencies for the Node.js services (each service folder):
   npm install
3. Set environment variables before running services (examples in files):
   - NMZ_ORACLE_KEY_PRIVATE (oracle signing key)
   - CONTRACT_ADDRESS (deployed SpecterDropLedger address)
   - WEB3_PROVIDER (Ethereum node provider)

Structure
- src/ : Python components and orchestrator examples
- contracts/ : Solidity contract(s)
- services/ : Node.js services (oracle aggregator, middleware, frontend flip)

Contributing
See CONTRIBUTING.md for contribution guidelines (add this file if you want to expand contribution guidelines).

License
This project is licensed under the MIT License (see LICENSE file).