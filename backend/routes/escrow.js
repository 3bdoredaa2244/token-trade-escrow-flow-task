const express = require("express");
const { ethers } = require("ethers");
const router = express.Router();

// Replace with actual contract ABI and deployed address
const contractABI = require("../../artifacts/contracts/Escrow.sol/Escrow.json").abi;
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Replace with your network provider and signer
const provider = new ethers.JsonRpcProvider("http://localhost:8545"); // or Alchemy/Infura
const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

const escrow = new ethers.Contract(contractAddress, contractABI, signer);

router.post("/create", async (req, res) => {
  const { seller, token, amount } = req.body;

  try {
    const tx = await escrow.createDeal(seller, token, amount);
    await tx.wait();
    res.json({ message: "Deal created", txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create deal");
  }
});

router.post("/release", async (req, res) => {
  const { dealId } = req.body;

  try {
    const tx = await escrow.releaseDeal(dealId);
    await tx.wait();
    res.json({ message: "Deal released", txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to release deal");
  }
});

router.post("/dispute", async (req, res) => {
  const { dealId } = req.body;

  try {
    const tx = await escrow.disputeDeal(dealId);
    await tx.wait();
    res.json({ message: "Dispute filed", txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to file dispute");
  }
});

router.post("/resolve", async (req, res) => {
  const { dealId, releaseToSeller } = req.body;

  try {
    const tx = await escrow.resolveDispute(dealId, releaseToSeller);
    await tx.wait();
    res.json({ message: "Dispute resolved", txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to resolve dispute");
  }
});

module.exports = router;
