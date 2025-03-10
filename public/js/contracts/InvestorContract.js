// Contract address and ABI for TalentFundInvestor
const INVESTOR_CONTRACT_ADDRESS = "0x4622364BB4238338D6d4512f34D831AFAE07e446";
const INVESTOR_CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_investorAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_applicationId",
                "type": "uint256"
            }
        ],
        "name": "addApprovedApplication",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "addFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
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
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newTotal",
                "type": "uint256"
            }
        ],
        "name": "FundsAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "investorAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "organization",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalFunds",
                "type": "uint256"
            }
        ],
        "name": "InvestorRegistered",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_organization",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_totalFunds",
                "type": "uint256"
            }
        ],
        "name": "registerInvestor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_investorAddress",
                "type": "address"
            }
        ],
        "name": "getInvestor",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "email",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "organization",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalFunds",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "approvedApplications",
                        "type": "uint256[]"
                    }
                ],
                "internalType": "struct TalentFundInvestor.Investor",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_investorAddress",
                "type": "address"
            }
        ],
        "name": "isRegisteredInvestor",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

class InvestorContract {
    constructor(web3) {
        this.web3 = web3;
        this.contract = new web3.eth.Contract(INVESTOR_CONTRACT_ABI, INVESTOR_CONTRACT_ADDRESS);
    }

    async registerInvestor(name, email, organization, initialFunds) {
        try {
            const accounts = await this.web3.eth.getAccounts();
            await this.contract.methods.registerInvestor(
                name,
                email,
                organization,
                this.web3.utils.toWei(initialFunds.toString(), 'ether')
            ).send({ from: accounts[0] });
            return true;
        } catch (error) {
            console.error('Error in registerInvestor:', error);
            throw error;
        }
    }

    async getInvestor(address) {
        try {
            const investor = await this.contract.methods.getInvestor(address).call();
            return {
                name: investor[0], // Access by index as per ABI
                email: investor[1],
                organization: investor[2],
                totalFunds: this.web3.utils.fromWei(investor[3], 'ether'),
                isRegistered: investor[4],
                approvedApplications: investor[5]
            };
        } catch (error) {
            console.error('Error in getInvestor:', error);
            throw error;
        }
    }

    async addFunds(amount) {
        try {
            const accounts = await this.web3.eth.getAccounts();
            await this.contract.methods.addFunds(
                this.web3.utils.toWei(amount.toString(), 'ether')
            ).send({ from: accounts[0] });
            return true;
        } catch (error) {
            console.error('Error in addFunds:', error);
            throw error;
        }
    }

    async isRegisteredInvestor(address) {
        try {
            return await this.contract.methods.isRegisteredInvestor(address).call();
        } catch (error) {
            console.error('Error in isRegisteredInvestor:', error);
            throw error;
        }
    }

    // Get current investor's details
    async getCurrentInvestor() {
        try {
            const accounts = await this.web3.eth.getAccounts();
            return await this.getInvestor(accounts[0]);
        } catch (error) {
            console.error('Error getting current investor:', error);
            throw error;
        }
    }

    // Add approved application
    async addApprovedApplication(investorAddress, applicationId) {
        try {
            const accounts = await this.web3.eth.getAccounts();
            const result = await this.contract.methods.addApprovedApplication(
                investorAddress,
                applicationId
            ).send({ from: accounts[0] });
            return result;
        } catch (error) {
            console.error('Error adding approved application:', error);
            throw error;
        }
    }
}

// Export the contract class
window.InvestorContract = InvestorContract; 