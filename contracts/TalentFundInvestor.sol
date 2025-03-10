// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TalentFundInvestor {
    struct Investor {
        string name;
        string email;
        string organization;
        uint256 totalFunds;
        bool isRegistered;
        uint256[] approvedApplications;
    }

    mapping(address => Investor) public investors;
    
    event InvestorRegistered(
        address indexed investorAddress,
        string name,
        string organization,
        uint256 totalFunds
    );

    event FundsAdded(
        address indexed investorAddress,
        uint256 amount,
        uint256 newTotal
    );

    function registerInvestor(
        string memory _name,
        string memory _email,
        string memory _organization,
        uint256 _totalFunds
    ) public {
        require(!investors[msg.sender].isRegistered, "Investor already registered");
        require(_totalFunds > 0, "Initial funds must be greater than 0");
        
        investors[msg.sender] = Investor({
            name: _name,
            email: _email,
            organization: _organization,
            totalFunds: _totalFunds,
            isRegistered: true,
            approvedApplications: new uint256[](0)
        });

        emit InvestorRegistered(msg.sender, _name, _organization, _totalFunds);
    }

    function getInvestor(address _investorAddress) public view returns (Investor memory) {
        return investors[_investorAddress];
    }

    function addFunds(uint256 _amount) public {
        require(investors[msg.sender].isRegistered, "Not a registered investor");
        require(_amount > 0, "Amount must be greater than 0");

        investors[msg.sender].totalFunds += _amount;
        
        emit FundsAdded(
            msg.sender,
            _amount,
            investors[msg.sender].totalFunds
        );
    }

    function isRegisteredInvestor(address _investorAddress) public view returns (bool) {
        return investors[_investorAddress].isRegistered;
    }

    function addApprovedApplication(address _investorAddress, uint256 _applicationId) public {
        require(investors[_investorAddress].isRegistered, "Not a registered investor");
        investors[_investorAddress].approvedApplications.push(_applicationId);
    }
} 