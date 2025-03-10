// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TalentFundStudent.sol";
import "./TalentFundInvestor.sol";

contract TalentFundMain {
    enum ApplicationStatus { Pending, Approved, Rejected }

    struct Application {
        address studentAddress;
        uint256 requestedAmount;
        string purpose;
        string timeline;
        ApplicationStatus status;
        address approvedInvestor;
        uint256 approvedAmount;
        string notes;
    }

    TalentFundStudent public studentContract;
    TalentFundInvestor public investorContract;
    
    mapping(uint256 => Application) public applications;
    uint256 public applicationCount;

    event ApplicationCreated(
        uint256 indexed applicationId,
        address indexed studentAddress,
        uint256 requestedAmount
    );

    event ApplicationApproved(
        uint256 indexed applicationId,
        address indexed studentAddress,
        address indexed investorAddress,
        uint256 amount,
        string notes
    );

    event ApplicationRejected(
        uint256 indexed applicationId,
        address indexed studentAddress,
        address indexed investorAddress
    );

    constructor(address _studentContractAddress, address _investorContractAddress) {
        studentContract = TalentFundStudent(_studentContractAddress);
        investorContract = TalentFundInvestor(_investorContractAddress);
    }

    function createApplication(
        uint256 _requestedAmount,
        string memory _purpose,
        string memory _timeline
    ) public returns (uint256) {
        require(studentContract.isRegisteredStudent(msg.sender), "Not a registered student");

        uint256 applicationId = applicationCount++;
        applications[applicationId] = Application({
            studentAddress: msg.sender,
            requestedAmount: _requestedAmount,
            purpose: _purpose,
            timeline: _timeline,
            status: ApplicationStatus.Pending,
            approvedInvestor: address(0),
            approvedAmount: 0,
            notes: ""
        });

        emit ApplicationCreated(applicationId, msg.sender, _requestedAmount);
        return applicationId;
    }

    function approveApplication(
        uint256 _applicationId,
        uint256 _amount,
        string memory _notes
    ) public {
        require(investorContract.isRegisteredInvestor(msg.sender), "Not a registered investor");
        
        Application storage application = applications[_applicationId];
        require(application.studentAddress != address(0), "Application does not exist");
        require(application.status == ApplicationStatus.Pending, "Application not pending");
        require(_amount > 0, "Amount must be greater than 0");

        // Update application status
        application.status = ApplicationStatus.Approved;
        application.approvedInvestor = msg.sender;
        application.approvedAmount = _amount;
        application.notes = _notes;

        // Add application to investor's approved list
        investorContract.addApprovedApplication(msg.sender, _applicationId);

        emit ApplicationApproved(
            _applicationId,
            application.studentAddress,
            msg.sender,
            _amount,
            _notes
        );
    }

    function rejectApplication(uint256 _applicationId) public {
        require(investorContract.isRegisteredInvestor(msg.sender), "Not a registered investor");
        
        Application storage application = applications[_applicationId];
        require(application.studentAddress != address(0), "Application does not exist");
        require(application.status == ApplicationStatus.Pending, "Application not pending");

        application.status = ApplicationStatus.Rejected;
        
        emit ApplicationRejected(
            _applicationId,
            application.studentAddress,
            msg.sender
        );
    }

    function getApplication(uint256 _applicationId) public view returns (Application memory) {
        return applications[_applicationId];
    }

    function getApplicationsByStudent(address _studentAddress) public view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < applicationCount; i++) {
            if (applications[i].studentAddress == _studentAddress) {
                count++;
            }
        }

        uint256[] memory studentApplications = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < applicationCount; i++) {
            if (applications[i].studentAddress == _studentAddress) {
                studentApplications[index] = i;
                index++;
            }
        }

        return studentApplications;
    }

    function getApplicationsByInvestor(address _investorAddress) public view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < applicationCount; i++) {
            if (applications[i].approvedInvestor == _investorAddress) {
                count++;
            }
        }

        uint256[] memory investorApplications = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < applicationCount; i++) {
            if (applications[i].approvedInvestor == _investorAddress) {
                investorApplications[index] = i;
                index++;
            }
        }

        return investorApplications;
    }
} 