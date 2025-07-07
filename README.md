# 🔐 Token Trade Escrow System – Funhi Platform

This is a full-stack Ethereum-based **escrow system** built as a prototype for the **Funhi** platform. It enables users to safely trade token-linked items (like digital goods or services) through a smart contract that holds funds until the transaction is fulfilled.

---

## 📦 Tech Stack

| Layer       | Tech                      |
|-------------|---------------------------|
| Blockchain  | Solidity, Hardhat         |
| Backend     | Node.js, Express, ethers.js |
| Frontend    | React.js, Vite, ethers.js |
| Wallet      | MetaMask (via `window.ethereum`) |

---

## ⚙️ Features

- Escrow smart contract written in Solidity
- Manual release and moderator-based dispute resolution
- React frontend with wallet connection (MetaMask)
- Express backend API that interacts with the contract
- Token and amount input fields for escrow creation
- Uses Hardhat local blockchain for development/testing

---

## 🛠 Project Structure

token-trade-escrow-flow-main/
├── backend/ # Express backend with routes
├── contracts/ # Solidity smart contract (Escrow.sol)
├── scripts/ # Deployment scripts
├── src/ # React frontend components and pages
├── hardhat.config.cjs # Hardhat configuration
├── package.json # Root dependencies
└── README.md # This file

yaml


---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/3bdoredaa2244/token-trade-escrow-flow-task.git
cd token-trade-escrow-flow-task
2. Install Dependencies

npm install
cd backend && npm install && cd ..
🔧 Run the Project
Start Local Blockchain (Hardhat)

npx hardhat node
Deploy the Smart Contract

npx hardhat run scripts/deploy.cjs --network localhost
Copy the contract address printed in the terminal and update it in the backend file:
backend/routes/escrow.js

js

const contractAddress = "PASTE_YOUR_DEPLOYED_ADDRESS_HERE";
Start the Backend Server

cd backend
node index.js
Backend will run at: http://localhost:3001

Start the React Frontend

npm start
Frontend will run at: http://localhost:3000

🧪 How to Use
Open http://localhost:3000

Connect MetaMask to the Hardhat local network (http://127.0.0.1:8545)

Enter:

Seller address (use one of the Hardhat test accounts)

Token address (e.g. a dummy ERC20 or placeholder)

Amount (in wei, e.g. 1000000000000000000 for 1 ETH)

Click "Create Escrow"

Confirm the transaction in MetaMask

Check the backend logs and Hardhat node for transaction confirmation

✅ Deliverables
Smart contract with core escrow logic

Backend API to create escrows via HTTP POST

Frontend UI with wallet connection

Integration between frontend → backend → blockchain

📌 Future Improvements
Add releaseEscrow and raiseDispute() logic

Add automatic unlock after 48 hours

Store and serve metadata for fulfillment links

Deploy to a testnet (Goerli/Sepolia)

📄 License
This project is for educational and demo purposes. Feel free to fork and build upon it.

👤 Author
Eng. AbdulRahman Reda
Senior Web3 & Blockchain Developer
