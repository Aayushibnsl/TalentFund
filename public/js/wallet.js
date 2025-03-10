// Wallet connection utility
class WalletConnect {
    constructor() {
        this.isConnected = false;
        this.account = null;
        this.chainId = null;
    }

    async connectWallet() {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed! Please install MetaMask to continue.');
        }

        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.account = accounts[0];
            this.isConnected = true;

            // Get chain ID
            this.chainId = await window.ethereum.request({ method: 'eth_chainId' });

            // Setup event listeners
            window.ethereum.on('accountsChanged', this.handleAccountsChanged.bind(this));
            window.ethereum.on('chainChanged', this.handleChainChanged.bind(this));

            return {
                account: this.account,
                chainId: this.chainId
            };
        } catch (error) {
            if (error.code === 4001) {
                throw new Error('Please connect to MetaMask.');
            } else {
                throw new Error('Error connecting to wallet: ' + error.message);
            }
        }
    }

    async disconnectWallet() {
        this.isConnected = false;
        this.account = null;
        this.chainId = null;
    }

    handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            this.isConnected = false;
            this.account = null;
            window.dispatchEvent(new CustomEvent('walletDisconnected'));
        } else if (accounts[0] !== this.account) {
            this.account = accounts[0];
            window.dispatchEvent(new CustomEvent('walletChanged', {
                detail: { account: this.account }
            }));
        }
    }

    handleChainChanged(chainId) {
        this.chainId = chainId;
        window.dispatchEvent(new CustomEvent('chainChanged', {
            detail: { chainId: this.chainId }
        }));
    }

    getShortAddress(address = this.account) {
        if (!address) return '';
        return address.slice(0, 6) + '...' + address.slice(-4);
    }
}

// Create a global instance
window.walletConnect = new WalletConnect(); 