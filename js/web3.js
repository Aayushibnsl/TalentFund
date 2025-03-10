import { ethers } from 'ethers';

class Web3Service {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contracts = {};
        this.isConnected = false;
    }

    async initialize() {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('Please install MetaMask to use this application');
        }
        
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();
            this.isConnected = true;

            // Setup contract instances
            const networkId = (await this.provider.getNetwork()).chainId;
            this.loadContracts(networkId);

            // Setup event listeners
            window.ethereum.on('accountsChanged', this.handleAccountsChanged.bind(this));
            window.ethereum.on('chainChanged', this.handleChainChanged.bind(this));

            return true;
        } catch (error) {
            console.error('Error initializing Web3:', error);
            throw error;
        }
    }

    async loadContracts(networkId) {
        // Contract ABIs will be imported from separate files
        const mainContractAddress = CONTRACT_ADDRESSES[networkId].main;
        const studentContractAddress = CONTRACT_ADDRESSES[networkId].student;
        const investorContractAddress = CONTRACT_ADDRESSES[networkId].investor;

        this.contracts.main = new ethers.Contract(
            mainContractAddress,
            MAIN_CONTRACT_ABI,
            this.signer
        );

        this.contracts.student = new ethers.Contract(
            studentContractAddress,
            STUDENT_CONTRACT_ABI,
            this.signer
        );

        this.contracts.investor = new ethers.Contract(
            investorContractAddress,
            INVESTOR_CONTRACT_ABI,
            this.signer
        );
    }

    async handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            this.isConnected = false;
            window.location.reload();
        } else {
            this.signer = this.provider.getSigner();
            this.isConnected = true;
        }
    }

    handleChainChanged() {
        window.location.reload();
    }

    async getAccount() {
        if (!this.isConnected) await this.initialize();
        return await this.signer.getAddress();
    }

    // Student Functions
    async createFundingRequest(amount, purpose, timeline) {
        if (!this.isConnected) await this.initialize();
        try {
            const tx = await this.contracts.main.createApplication(
                ethers.utils.parseEther(amount.toString()),
                purpose,
                timeline
            );
            await tx.wait();
            return tx.hash;
        } catch (error) {
            console.error('Error creating funding request:', error);
            throw error;
        }
    }

    // Investor Functions
    async approveFunding(applicationId, amount, notes) {
        if (!this.isConnected) await this.initialize();
        try {
            const tx = await this.contracts.main.approveApplication(
                applicationId,
                ethers.utils.parseEther(amount.toString()),
                notes,
                { value: ethers.utils.parseEther(amount.toString()) }
            );
            await tx.wait();
            return tx.hash;
        } catch (error) {
            console.error('Error approving funding:', error);
            throw error;
        }
    }

    // Utility Functions
    async getApplicationDetails(applicationId) {
        if (!this.isConnected) await this.initialize();
        try {
            const application = await this.contracts.main.getApplication(applicationId);
            return this.formatApplication(application);
        } catch (error) {
            console.error('Error getting application details:', error);
            throw error;
        }
    }

    formatApplication(application) {
        return {
            studentAddress: application.studentAddress,
            requestedAmount: ethers.utils.formatEther(application.requestedAmount),
            purpose: application.purpose,
            timeline: application.timeline,
            status: ['Pending', 'Approved', 'Rejected'][application.status],
            approvedInvestor: application.approvedInvestor,
            approvedAmount: ethers.utils.formatEther(application.approvedAmount),
            notes: application.notes
        };
    }
}

export const web3Service = new Web3Service();
