# ⬡ PromptForge

> **Deploy Smart Contracts to OP_NET Testnet with a Single Natural Language Prompt**

PromptForge is a full-stack AI-powered smart contract builder and deployment platform. Describe what you want in plain English — PromptForge generates production-ready Solidity code, runs automated security analysis, and deploys directly to OP_NET testnet.

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 🤖 AI Contract Generation | Natural language → Solidity in seconds |
| 🔒 Security Scanner | Automated checks (reentrancy, overflow, access control, etc.) |
| 📦 Template Library | 5 production-ready templates: Escrow, DAO, Staking, Crowdfunding, MultiSig |
| 🚀 One-Click Deploy | Deploy to OP_NET Testnet with wallet integration |
| 📋 ABI Generation | Automatic ABI extraction from generated code |
| 🎨 Premium UI | Dark cyberpunk aesthetic with animated particle background |
| 📱 Mobile Friendly | Fully responsive across all devices |

---

## 📁 Project Structure

```
promptforge/
├── index.html              # Landing page
├── forge.html              # Main application
├── css/
│   ├── main.css            # Global styles (variables, layout, landing)
│   └── forge.css           # Forge app styles (panels, editor, deploy UI)
├── js/
│   ├── bg.js               # Animated canvas background
│   ├── landing.js          # Landing page interactions
│   ├── contracts.js        # Contract template library (5 templates)
│   ├── security.js         # Security vulnerability scanner
│   ├── ai-generator.js     # AI contract generation engine
│   ├── deploy.js           # Wallet connection & deployment module
│   └── forge.js            # Main app controller / orchestration
├── contracts/
│   ├── EscrowVault.sol     # Standalone Escrow template
│   ├── SimpleDAO.sol       # Standalone DAO template
│   ├── StakingPool.sol     # Standalone Staking template
│   ├── CrowdfundCampaign.sol # Standalone Crowdfunding template
│   └── MultiSigWallet.sol  # Standalone MultiSig template
└── README.md
```

---

## 🛠 Tech Stack

**Frontend**
- Pure HTML5, CSS3, JavaScript (no framework dependencies)
- Google Fonts: Syne (display) + JetBrains Mono (code)
- Canvas API for animated background

**Smart Contracts**
- Solidity ^0.8.19 compatible
- OP_NET Testnet architecture
- 5 fully-documented contract templates + 6 AI-generated contract types

**Security Layer**
- Custom scanner modeled after Slither/Mythril
- 10 vulnerability check categories
- Scored security report with severity levels

---

## 📦 Contract Templates

### 🔒 EscrowVault
Trustless ETH escrow with:
- Buyer/seller/arbiter roles
- State machine (AWAITING_PAYMENT → AWAITING_DELIVERY → COMPLETE)
- Dispute resolution with 1% arbiter fee
- Refund mechanism

### 🏛️ SimpleDAO
Token-weighted governance with:
- Proposal creation (requires token balance)
- On-chain voting with token weights
- Quorum enforcement
- Proposal execution with arbitrary calldata

### 💎 StakingPool
ERC20 staking with:
- Configurable APY (basis points)
- Lockup period enforcement
- Compound reward calculation
- Emergency withdrawal with 10% penalty

### 🎯 CrowdfundCampaign
Goal-based fundraising with:
- Configurable goal and deadline
- Automatic refunds if goal not reached
- 2% platform fee on successful campaigns
- Creator cancellation

### 🔑 MultiSigWallet
M-of-N multisig with:
- Up to 50 owners
- Transaction submission, confirmation, revocation
- Auto-confirmation by submitter
- ETH receive support

---

## 🔐 Security Checks

The built-in scanner checks for:

| Check | Severity |
|-------|----------|
| Reentrancy (checks-effects-interactions) | Critical |
| tx.origin authentication | Critical |
| Integer overflow (Solidity version) | Critical/Pass |
| Unchecked return values | Warning |
| Selfdestruct usage | Warning |
| Timestamp dependence | Warning/Info |
| Access control modifiers | Warning/Pass |
| Floating pragma | Info |
| Event emissions | Warning/Pass |
| Immutable variables | Info/Pass |

---

## 🌐 OP_NET Testnet Configuration

| Parameter | Value |
|-----------|-------|
| Network Name | OP_NET Testnet |
| Chain ID | 4207 (0x106F) |
| Currency | BTC |
| RPC URL | https://testnet.opnet.org/rpc |
| Explorer | https://testnet.opnet.org/explorer |

To add OP_NET Testnet to MetaMask:
1. Open MetaMask → Settings → Networks → Add Network
2. Enter the values above
3. PromptForge will auto-prompt for network addition on wallet connect

---

## 🚦 Getting Started

### Option 1: Open Directly in Browser
```bash
# No build step required — open index.html directly
open index.html
# or
npx serve .
```

### Option 2: Local Dev Server
```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx serve . -p 8080

# Using PHP
php -S localhost:8080
```

Then visit `http://localhost:8080`

### Option 3: Deploy to Vercel/Netlify
```bash
# Vercel
npx vercel

# Netlify
npx netlify deploy
```

---

## 🎮 Using the App

### 1. Connect Wallet
- Click **Connect Wallet** in the top-right
- Choose MetaMask, Coinbase, or **Demo Mode** (no wallet required)
- PromptForge will automatically switch to OP_NET Testnet

### 2. Choose a Template or Describe Your Contract
- Click any template pill (Escrow, DAO, Staking, etc.) to load a pre-built contract
- Or type a natural language description in the prompt box:
  ```
  "Create a token staking contract with 12% APY and 30-day lockup"
  "Make a crowdfunding campaign with a 10 ETH goal and 30-day deadline"
  "Build a 3-of-5 multisig wallet for our treasury"
  ```

### 3. Review Generated Code
- The center panel shows the generated Solidity code
- Edit directly in the code editor
- View the auto-generated ABI in the bottom panel

### 4. Review Security Report
- The right panel shows the security score (0–100)
- Review each finding with severity levels
- Fix critical issues before deployment

### 5. Deploy
- Click **Deploy to OP_NET** in the right panel
- Confirm the transaction in your wallet
- Get your contract address and transaction hash instantly

---

## 🤖 AI Generation Examples

PromptForge understands natural language and auto-detects contract types:

```
"An escrow where buyer and seller need an arbiter for disputes"
→ Generates: EscrowVault with 3-party dispute resolution

"Token staking earning 15% APY with 60 day lock and 5% penalty"
→ Generates: StakingPool with custom parameters

"NFT collection of 5000 pieces at 0.08 ETH each"
→ Generates: ERC721 with mint, transfer, withdraw

"Fundraise 50 ETH in 45 days with automatic refunds"
→ Generates: CrowdfundCampaign with goal/deadline

"Lottery where players buy tickets and one wins the pool"
→ Generates: LotteryGame with ticket purchase and draw

"Dutch auction for rare items with auto-extension"
→ Generates: DutchAuction with bid management
```

---

## 📄 License

MIT License — free to use, modify, and deploy.

---

## 🙏 Built With

- **OP_NET** — Bitcoin-native smart contract platform
- **Solidity 0.8.19** — Smart contract language  
- **Vanilla JS** — Zero dependencies frontend
- **JetBrains Mono** — Code typography

---

*Built with ⚒ by PromptForge — forge your contracts, forge your future.*
