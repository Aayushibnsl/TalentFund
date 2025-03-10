// Contract addresses
const STUDENT_CONTRACT_ADDRESS = "0x13c448A7Ed22D43ba0c2307b56386115CABAAc5d";
const INVESTOR_CONTRACT_ADDRESS = "0x4622364BB4238338D6d4512f34D831AFAE07e446";
const MAIN_CONTRACT_ADDRESS = "0xB8Fc9e9B10b31e8B20424DEe03349710bea09B1a";

const MAIN_CONTRACT_ABI = [
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
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "notes",
                "type": "string"
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
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "requestedAmount",
                "type": "uint256"
            }
        ],
        "name": "ApplicationCreated",
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
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "investorAddress",
                "type": "address"
            }
        ],
        "name": "ApplicationRejected",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "applicationCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
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
                "internalType": "enum TalentFundMain.ApplicationStatus",
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
            },
            {
                "internalType": "string",
                "name": "notes",
                "type": "string"
            }
        ],
        "stateMutability": "view",
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
            },
            {
                "internalType": "string",
                "name": "_notes",
                "type": "string"
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
                        "internalType": "enum TalentFundMain.ApplicationStatus",
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
                    },
                    {
                        "internalType": "string",
                        "name": "notes",
                        "type": "string"
                    }
                ],
                "internalType": "struct TalentFundMain.Application",
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
        "name": "getApplicationsByInvestor",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_studentAddress",
                "type": "address"
            }
        ],
        "name": "getApplicationsByStudent",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "investorContract",
        "outputs": [
            {
                "internalType": "contract TalentFundInvestor",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
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
        "name": "rejectApplication",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "studentContract",
        "outputs": [
            {
                "internalType": "contract TalentFundStudent",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

class MainContract {
    constructor(web3) {
        if (!web3) {
            throw new Error('Web3 instance is required');
        }
        this.web3 = web3;
        this.contract = new web3.eth.Contract(MAIN_CONTRACT_ABI, MAIN_CONTRACT_ADDRESS);
    }

    // Initialize contract with network check
    async init() {
        try {
            // Check if we're on the correct network
            const networkId = await this.web3.eth.net.getId();
            const networkType = await this.web3.eth.net.getNetworkType();
            console.log(`Connected to network: ${networkType} (${networkId})`);

            // Verify contract exists at address
            const code = await this.web3.eth.getCode(MAIN_CONTRACT_ADDRESS);
            if (code === '0x') {
                throw new Error('Contract not found at specified address');
            }

            return true;
        } catch (error) {
            console.error('Contract initialization error:', error);
            throw error;
        }
    }

    // Create application with proper error handling
    async createApplication(requestedAmount, purpose, timeline) {
        try {
            const accounts = await this.web3.eth.getAccounts();
            if (!accounts || accounts.length === 0) {
                throw new Error('No wallet connected');
            }

            const amountInWei = this.web3.utils.toWei(requestedAmount.toString(), 'ether');
            
            // Estimate gas with safety margin
            const gasEstimate = await this.contract.methods.createApplication(
                amountInWei,
                purpose,
                timeline
            ).estimateGas({ from: accounts[0] });

            const gasLimit = Math.ceil(gasEstimate * 1.2); // 20% buffer

            const result = await this.contract.methods.createApplication(
                amountInWei,
                purpose,
                timeline
            ).send({ 
                from: accounts[0],
                gas: gasLimit
            });

            return result;
        } catch (error) {
            console.error('Error creating application:', error);
            if (error.message.includes('User denied')) {
                throw new Error('Transaction rejected in MetaMask');
            }
            throw error;
        }
    }

    // Approve application with validation
    async approveApplication(applicationId, amount, notes) {
        try {
            const accounts = await this.web3.eth.getAccounts();
            if (!accounts || accounts.length === 0) {
                throw new Error('No wallet connected');
            }

            // Verify application exists
            const application = await this.getApplication(applicationId);
            if (!application) {
                throw new Error('Application not found');
            }

            const amountInWei = this.web3.utils.toWei(amount.toString(), 'ether');
            
            const gasEstimate = await this.contract.methods.approveApplication(
                applicationId,
                amountInWei,
                notes
            ).estimateGas({ from: accounts[0] });

            const gasLimit = Math.ceil(gasEstimate * 1.2);

            const result = await this.contract.methods.approveApplication(
                applicationId,
                amountInWei,
                notes
            ).send({ 
                from: accounts[0],
                gas: gasLimit
            });

            return result;
        } catch (error) {
            console.error('Error approving application:', error);
            if (error.message.includes('User denied')) {
                throw new Error('Transaction rejected in MetaMask');
            }
            throw error;
        }
    }

    // Reject a funding application
    async rejectApplication(applicationId) {
        try {
            const accounts = await this.web3.eth.getAccounts();
            const result = await this.contract.methods.rejectApplication(
                applicationId
            ).send({ from: accounts[0] });
            return result;
        } catch (error) {
            console.error('Error rejecting application:', error);
            throw error;
        }
    }

    // Get application with proper error handling
    async getApplication(applicationId) {
        try {
            const application = await this.contract.methods.getApplication(applicationId).call();
            return {
                studentAddress: application[0],
                requestedAmount: this.web3.utils.fromWei(application[1], 'ether'),
                purpose: application[2],
                timeline: application[3],
                status: parseInt(application[4]),
                approvedInvestor: application[5],
                approvedAmount: this.web3.utils.fromWei(application[6], 'ether'),
                notes: application[7]
            };
        } catch (error) {
            console.error('Error getting application:', error);
            return null;
        }
    }

    // Get all applications for a student
    async getApplicationsByStudent(studentAddress) {
        try {
            const applicationIds = await this.contract.methods.getApplicationsByStudent(studentAddress).call();
            const applications = await Promise.all(
                applicationIds.map(id => this.getApplication(id))
            );
            return applications.filter(app => app !== null);
        } catch (error) {
            console.error('Error getting student applications:', error);
            return [];
        }
    }

    // Get all applications for an investor
    async getApplicationsByInvestor(investorAddress) {
        try {
            const applicationIds = await this.contract.methods.getApplicationsByInvestor(investorAddress).call();
            const applications = await Promise.all(
                applicationIds.map(id => this.getApplication(id))
            );
            return applications.filter(app => app !== null);
        } catch (error) {
            console.error('Error getting investor applications:', error);
            return [];
        }
    }

    // Get application count
    async getApplicationCount() {
        try {
            return await this.contract.methods.applicationCount().call();
        } catch (error) {
            console.error('Error getting application count:', error);
            return 0;
        }
    }
}

// Export the contract class
window.MainContract = MainContract; 