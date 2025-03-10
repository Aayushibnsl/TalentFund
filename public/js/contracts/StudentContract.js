// Contract address and ABI for TalentFundStudent
const STUDENT_CONTRACT_ADDRESS = "0x13c448A7Ed22D43ba0c2307b56386115CABAAc5d";
const STUDENT_CONTRACT_ABI = [
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
                "name": "_education",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_skills",
                "type": "string[]"
            },
            {
                "internalType": "uint256",
                "name": "_requestedAmount",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_fundingPurpose",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_timeline",
                "type": "string"
            }
        ],
        "name": "registerStudent",
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
                "name": "studentAddress",
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
                "name": "education",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "requestedAmount",
                "type": "uint256"
            }
        ],
        "name": "StudentRegistered",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_studentAddress",
                "type": "address"
            }
        ],
        "name": "getStudent",
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
                        "name": "education",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRegistered",
                        "type": "bool"
                    },
                    {
                        "internalType": "string[]",
                        "name": "skills",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "requestedAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "fundingPurpose",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "timeline",
                        "type": "string"
                    }
                ],
                "internalType": "struct TalentFundStudent.Student",
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
                "name": "_studentAddress",
                "type": "address"
            }
        ],
        "name": "isRegisteredStudent",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "students",
        "outputs": [
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
                "name": "education",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "requestedAmount",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "fundingPurpose",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "timeline",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

class StudentContract {
    constructor(web3) {
        if (!web3) {
            throw new Error('Web3 instance is required');
        }
        this.web3 = web3;
        this.contract = new web3.eth.Contract(STUDENT_CONTRACT_ABI, STUDENT_CONTRACT_ADDRESS);
    }

    // Initialize contract
    async init() {
        try {
            // Check network connection
            const networkId = await this.web3.eth.net.getId();
            const networkType = await this.web3.eth.net.getNetworkType();
            console.log(`Connected to network: ${networkType} (${networkId})`);

            // Verify contract exists
            const code = await this.web3.eth.getCode(STUDENT_CONTRACT_ADDRESS);
            if (code === '0x') {
                throw new Error('Student contract not found at specified address');
            }

            return true;
        } catch (error) {
            console.error('Student contract initialization error:', error);
            throw error;
        }
    }

    async registerStudent(name, email, education, skills, requestedAmount = "0", fundingPurpose = "", timeline = "") {
        try {
            // Input validation
            if (!name || !email || !education || !skills || skills.length === 0) {
                throw new Error('All required fields must be filled');
            }

            const accounts = await this.web3.eth.getAccounts();
            if (!accounts || accounts.length === 0) {
                throw new Error('No wallet connected. Please connect your MetaMask wallet.');
            }

            // Check if already registered
            const isRegistered = await this.isRegisteredStudent(accounts[0]);
            if (isRegistered) {
                throw new Error('This wallet is already registered as a student');
            }

            // Convert amount to wei
            const amountInWei = this.web3.utils.toWei(requestedAmount.toString(), 'ether');
            
            // Create transaction
            const tx = this.contract.methods.registerStudent(
                name,
                email,
                education,
                skills,
                amountInWei,
                fundingPurpose,
                timeline
            );

            // Estimate gas with safety margin
            const gasEstimate = await tx.estimateGas({ from: accounts[0] });
            const gasLimit = Math.ceil(gasEstimate * 1.2); // 20% buffer

            // Send transaction
            const result = await tx.send({ 
                from: accounts[0],
                gas: gasLimit
            });

            if (!result.status) {
                throw new Error('Transaction failed');
            }

            // Store user info in session storage
            sessionStorage.setItem('currentUser', JSON.stringify({
                address: accounts[0],
                type: 'student',
                name: name,
                email: email
            }));
            
            return result;
        } catch (error) {
            console.error('Error in registerStudent:', error);
            if (error.message.includes('User denied')) {
                throw new Error('Transaction was rejected in MetaMask. Please try again.');
            } else if (error.message.includes('insufficient funds')) {
                throw new Error('Insufficient funds to cover gas fees. Please add funds to your wallet.');
            } else {
                throw error;
            }
        }
    }

    async getStudent(address) {
        try {
            if (!address) {
                const accounts = await this.web3.eth.getAccounts();
                if (!accounts || accounts.length === 0) {
                    throw new Error('No wallet connected');
                }
                address = accounts[0];
            }

            if (!this.web3.utils.isAddress(address)) {
                throw new Error('Invalid Ethereum address');
            }
            
            const student = await this.contract.methods.getStudent(address).call();
            
            if (!student) {
                return null;
            }

            return {
                name: student[0],
                email: student[1],
                education: student[2],
                isRegistered: student[3],
                skills: student[4],
                requestedAmount: this.web3.utils.fromWei(student[5], 'ether'),
                fundingPurpose: student[6],
                timeline: student[7]
            };
        } catch (error) {
            console.error('Error in getStudent:', error);
            return null;
        }
    }

    async isRegisteredStudent(address) {
        try {
            if (!address) {
                const accounts = await this.web3.eth.getAccounts();
                if (!accounts || accounts.length === 0) {
                    throw new Error('No wallet connected');
                }
                address = accounts[0];
            }

            if (!this.web3.utils.isAddress(address)) {
                throw new Error('Invalid Ethereum address');
            }

            return await this.contract.methods.isRegisteredStudent(address).call();
        } catch (error) {
            console.error('Error in isRegisteredStudent:', error);
            return false;
        }
    }
}

// Export the contract class
window.StudentContract = StudentContract; 