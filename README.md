# ⚡ PromptForge OP_NET

> **Bitcoin Layer 1 Smart Contract Generator & Deployer**  
> Describe your contract in plain English → Generate → Validate → Deploy to OP_NET Testnet

![OP_NET](https://img.shields.io/badge/OP_NET-Testnet-F7931A?style=flat-square&logo=bitcoin)
![Bitcoin](https://img.shields.io/badge/Bitcoin-Layer%201-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## What is PromptForge OP_NET?

PromptForge is a developer tool for creating and deploying **OP_NET smart contracts** — a Bitcoin Layer 1 smart contract system — using a single natural language prompt.

Unlike EVM-based tools, PromptForge is built specifically for **OP_NET's TypeScript-based contract architecture** running natively on Bitcoin.

---

## 🗂 Project Structure

```
promptforge-opnet/
├── index.html                    # Main application
├── css/
│   └── style.css                 # Dark theme dashboard UI
├── js/
│   ├── background.js             # Bitcoin animated canvas
│   ├── wallet.js                 # OP_NET wallet connector
│   ├── templates.js              # 6 contract template generators
│   ├── security.js               # Static security analysis layer
│   ├── deploy.js                 # OP_NET deployment module
│   └── app.js                    # Main application logic
├── contracts/
│   ├── EscrowContract.ts         # Escrow template
│   ├── MilestonePayment.ts       # Milestone payments
│   ├── MultiSigVault.ts          # M-of-N vault
│   ├── DAOVoting.ts              # Governance
│   ├── StakingPool.ts            # BTC staking
│   └── CrowdfundingContract.ts   # Crowdfunding
├── scripts/
│   └── deploy-testnet.js         # CLI deployment script
├── vercel.json                   # Vercel static deploy config
├── package.json
├── tsconfig.contracts.json
└── README.md
```

---

## 🚀 Quick Start

### Option 1: Open Directly (Zero Setup)

Just open `index.html` in any modern browser. No build step required.

### Option 2: Local Dev Server

```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Option 3: Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

---

## 🔌 Supported Wallets

PromptForge supports OP_NET-compatible Bitcoin wallets:

| Wallet | Status | Notes |
|--------|--------|-------|
| **UniSat** | ✅ Supported | Best OP_NET support |
| **OKX Wallet** | ✅ Supported | Bitcoin web3 |
| **Xverse** | ✅ Supported | Ordinals + OP_NET |
| **Leather** | ✅ Supported | Stacks + Bitcoin |

> **No wallet installed?** PromptForge enters **demo mode** automatically so you can still generate and preview contracts.

---

## 📜 Supported Contract Types

### 1. Escrow Contract
- Buyer deposits BTC → Arbiter releases to seller or refunds buyer
- CEI pattern, reentrancy-safe, full event logging

### 2. Milestone Payment
- Client funds contract → Validator approves each milestone → Contractor receives proportional BTC
- Up to 10 milestone stages

### 3. Multi-Signature Vault
- M-of-N owner approval before releasing Bitcoin
- Proposal system, threshold execution, reentrancy guarded

### 4. DAO Voting
- Stake BTC for voting power → Propose → Vote → Execute
- Block-based voting periods, quorum enforcement

### 5. Staking Pool
- Users stake BTC → Earn rewards per block proportionally
- Accurate reward accounting, unstake at any time

### 6. Crowdfunding
- Fund with BTC goal + block deadline → Claim if met → Refund if not
- Full refund protection, CEI-safe transfers

---

## 🛡 Security Validation Layer

Before deployment, PromptForge runs 5 automated checks:

| Check | What it Verifies |
|-------|-----------------|
| **Access Control** | Owner/role modifiers, `onlyOwner`, `msgSender` guards |
| **Input Validation** | `require()` guards on all parameters |
| **State Transitions** | Safe state machine flags, no double-spends |
| **Reentrancy Protection** | Mutex lock pattern, CEI ordering |
| **Event Logging** | All state changes emit events |

Results are displayed in a Security Report panel with a score and summary.

---

## 🔧 Deploying to OP_NET Testnet

### Prerequisites

1. **Install dependencies:**
```bash
npm install
```

2. **Install OP_NET SDK:**
```bash
npm install @btc-vision/sdk @btc-vision/btc-runtime
```

3. **Get Testnet BTC:**
   - [Bitcoin Testnet4 Faucet](https://mempool.space/testnet4)
   - [Bitcoinfaucet.uo1.net](https://bitcoinfaucet.uo1.net/)
   - [Testnet Coinfaucet](https://testnet.coinfaucet.eu/en/)

4. **Compile contracts:**
```bash
npm run compile:contracts
# Output: ./dist/contracts/
```

### Deploy via UI

1. Open `index.html`
2. Click **Connect Wallet** → Select your Bitcoin wallet
3. Type or select a contract prompt
4. Click **Forge Contract**
5. Review generated code and security report
6. Click **Deploy to OP_NET Testnet**

### Deploy via CLI Script

```bash
# Set your deployer private key (WIF format)
export OPNET_PRIVATE_KEY="your_wif_private_key_here"
# OR use mnemonic:
export OPNET_MNEMONIC="word1 word2 word3 ..."

# Dry run (simulate, no broadcast)
node scripts/deploy-testnet.js \
  --contract EscrowContract \
  --args '["tb1qbuyer...","tb1qseller...","tb1qarbiter..."]' \
  --dry-run

# Live deployment
node scripts/deploy-testnet.js \
  --contract EscrowContract \
  --args '["tb1qbuyer...","tb1qseller...","tb1qarbiter..."]'
```

### Deployment Output

```
╔══════════════════════════════════════╗
║   PromptForge OP_NET Deployer v1.0   ║
║   Bitcoin Layer 1 · Testnet          ║
╚══════════════════════════════════════╝

✅ Deployment Successful!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Contract Address: tb1p3f8kx9m2...
🔗 Transaction Hash: a4b7c2d9e1f3...
📦 Block Number:     2,847,391
⛽ Gas Used (sats):  11,240
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Explorer: https://explorer.opnet.org/testnet/contract/tb1p3f8kx9m2...
```

---

## 🔗 OP_NET Resources

| Resource | URL |
|----------|-----|
| OP_NET Documentation | https://docs.opnet.org |
| OP_NET GitHub | https://github.com/btc-vision |
| Testnet Explorer | https://explorer.opnet.org/testnet |
| BTC Runtime | https://www.npmjs.com/package/@btc-vision/btc-runtime |
| OP_NET SDK | https://www.npmjs.com/package/@btc-vision/sdk |
| Bitcoin Testnet Faucet | https://mempool.space/testnet4 |

---

## 🏗 OP_NET Contract Architecture

OP_NET contracts are TypeScript classes that extend `OP_NET` base:

```typescript
import { OP_NET, Blockchain, CallResponse, u256 } from '@btc-vision/btc-runtime/runtime';

export class MyContract extends OP_NET {
  // Persistent storage slots
  private readonly value: StoredU256 = new StoredU256(Blockchain.SELECTOR, 0);

  // Events
  public readonly ValueSet: Event = Event.from('ValueSet', ['uint256']);

  // Write method
  @method
  public setValue(newVal: u256): CallResponse {
    this.onlyOwner();
    this.require(newVal > u256(0), 'Must be > 0');
    this.value.set(newVal);
    this.emit(this.ValueSet, [newVal]);
    return CallResponse.ok();
  }

  // Read-only method
  @view
  public getValue(): u256 {
    return this.value.get();
  }
}
```

### Key Differences from EVM

| Feature | EVM (Solidity) | OP_NET (TypeScript) |
|---------|---------------|---------------------|
| Language | Solidity | TypeScript |
| Chain | Ethereum | Bitcoin |
| Storage | `mapping`, `uint256` | `StoredU256`, `StoredBoolean` |
| Caller | `msg.sender` | `Blockchain.msgSender()` |
| Value | `msg.value` | `Blockchain.msgValue()` |
| Transfer | `payable(addr).transfer()` | `Blockchain.transfer(addr, amount)` |
| Events | `emit Transfer(...)` | `this.emit(this.Transfer, [...])` |
| Decorators | Modifiers | `@method`, `@view` |

---

## 🖥 Frontend Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, animations, grid layout
- **Vanilla JavaScript** — No framework dependencies
- **Google Fonts** — Syne (display) + Space Mono (code/monospace)
- **Canvas API** — Animated Bitcoin background

---

## 📄 License

MIT License — Free for personal and commercial use.

---

## ⚡ Built for Bitcoin

PromptForge OP_NET is purpose-built for Bitcoin Layer 1 smart contracts via OP_NET protocol. It does not support or assume EVM compatibility.

*Bitcoin. Not Ethereum. Not EVM. Native Layer 1.*
