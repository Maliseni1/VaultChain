const { encryptData, decryptData } = require("../utils/security");
const hre = require("hardhat");

async function main() {
    // --- CONFIGURATION ---
    const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
    const MASTER_PASSWORD = "SuperSecretMasterPassword123!";
    const MY_SECRET = { username: "admin", password: "password123", site: "google.com" };

    console.log("--- 1. ENCRYPTION PHASE (Client Side) ---");
    console.log("Original Data:", MY_SECRET);
    
    // Encrypt the data locally
    const encryptedPayload = encryptData(MY_SECRET, MASTER_PASSWORD);
    console.log("Encrypted Payload (safe for IPFS):", encryptedPayload);

    // Simulate IPFS Upload (In reality, we upload 'encryptedPayload' to IPFS and get a CID)
    // For this test, we will pretend this string is our IPFS Content ID (CID)
    const MOCK_IPFS_CID = "QmTestHash_" + Date.now(); 
    console.log("Mock IPFS CID:", MOCK_IPFS_CID);

    console.log("\n--- 2. BLOCKCHAIN PHASE (Smart Contract) ---");
    // Connect to the deployed contract
    const VaultChain = await hre.ethers.getContractFactory("VaultChain");
    const vault = await VaultChain.attach(CONTRACT_ADDRESS);

    // Save the "pointer" (CID) to the blockchain
    console.log("Saving credential to blockchain...");
    const tx = await vault.addCredential(MOCK_IPFS_CID, "Google Account");
    await tx.wait();
    console.log("Transaction confirmed!");

    console.log("\n--- 3. RETRIEVAL & DECRYPTION ---");
    // Fetch data from blockchain
    const credentials = await vault.getMyCredentials();
    const storedCredential = credentials[0]; // Get the first one

    console.log("Retrieved from Chain (CID):", storedCredential.ipfsCid);
    
    // Decrypt (Simulating fetching the payload from IPFS using the CID)
    const decrypted = decryptData(encryptedPayload, MASTER_PASSWORD);
    console.log("Decrypted Data:", decrypted);

    if(decrypted.password === MY_SECRET.password) {
        console.log("\nSUCCESS: The Foundation is Solid!");
    } else {
        console.log("\nFAILED: Data mismatch.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});