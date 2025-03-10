const FundingContractAddress = "YOUR_DEPLOYED_FUNDING_CONTRACT_ADDRESS"; // Replace after deployment

const FundingContractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_studentContractAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_investorContractAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "applicationId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "studentAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "investorAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "ApplicationApproved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "applicationId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "studentAddress",
                "type": "address"
            }
        ],
        "name": "ApplicationCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "applications",
        "outputs": [
            {
                "internalType": "address",
                "name": "studentAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "requestedAmount",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "purpose",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "timeline",
                "type": "string"
            },
            {
                "internalType": "enum FundingContract.ApplicationStatus",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "approvedInvestor",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "approvedAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_requestedAmount",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_purpose",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_timeline",
                "type": "string"
            }
        ],
        "name": "createApplication",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_applicationId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "approveApplication",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_applicationId",
                "type": "uint256"
            }
        ],
        "name": "getApplication",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "studentAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "requestedAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "purpose",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "timeline",
                        "type": "string"
                    },
                    {
                        "internalType": "enum FundingContract.ApplicationStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "approvedInvestor",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "approvedAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct FundingContract.Application",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

class FundingContract {
    constructor(web3) {
        this.web3 = web3;
        this.contract = new web3.eth.Contract(FundingContractABI, FundingContractAddress);
    }

    async createApplication(requestedAmount, purpose, timeline, fromAddress) {
        return await this.contract.methods.createApplication(requestedAmount, purpose, timeline)
            .send({ from: fromAddress });
    }

    async approveApplication(applicationId, amount, fromAddress) {
        return await this.contract.methods.approveApplication(applicationId, amount)
            .send({ from: fromAddress });
    }

    async getApplication(applicationId) {
        return await this.contract.methods.getApplication(applicationId).call();
    }
}

window.FundingContract = FundingContract; 