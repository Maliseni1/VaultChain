// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VaultChain {
    
    // Structure to hold metadata about the password entry
    struct Credential {
        uint256 id;
        string ipfsCid;      // The pointer to the encrypted data on IPFS
        string websiteName;  // A label (e.g., "Google" or "Twitter")
        address owner;       // Redundant safety check
    }

    // Mapping from User Wallet Address -> List of Credentials
    mapping(address => Credential[]) private userVaults;

    // Event to notify the frontend when a password is added
    event CredentialAdded(address indexed user, uint256 id, string websiteName);

    /**
     * @dev Add a new encrypted credential reference
     * @param _ipfsCid The content ID returned from IPFS (e.g., "QmHash...")
     * @param _websiteName A user-friendly label
     */
    function addCredential(string memory _ipfsCid, string memory _websiteName) public {
        // Validation: Ensure data is not empty
        require(bytes(_ipfsCid).length > 0, "IPFS CID cannot be empty");
        require(bytes(_websiteName).length > 0, "Website name cannot be empty");

        Credential[] storage vault = userVaults[msg.sender];
        uint256 newId = vault.length;
        
        vault.push(Credential({
            id: newId,
            ipfsCid: _ipfsCid,
            websiteName: _websiteName,
            owner: msg.sender
        }));

        emit CredentialAdded(msg.sender, newId, _websiteName);
    }

    /**
     * @dev Retrieve all credentials for the caller
     */
    function getMyCredentials() public view returns (Credential[] memory) {
        return userVaults[msg.sender];
    }
}