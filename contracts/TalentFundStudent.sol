// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TalentFundStudent {
    struct Student {
        string name;
        string email;
        string education;
        bool isRegistered;
        string[] skills;
        uint256 requestedAmount;
        string fundingPurpose;
        string timeline;
    }

    mapping(address => Student) public students;
    
    event StudentRegistered(
        address indexed studentAddress,
        string name,
        string education,
        uint256 requestedAmount
    );

    function registerStudent(
        string memory _name,
        string memory _email,
        string memory _education,
        string[] memory _skills,
        uint256 _requestedAmount,
        string memory _fundingPurpose,
        string memory _timeline
    ) public {
        require(!students[msg.sender].isRegistered, "Student already registered");
        
        students[msg.sender] = Student({
            name: _name,
            email: _email,
            education: _education,
            isRegistered: true,
            skills: _skills,
            requestedAmount: _requestedAmount,
            fundingPurpose: _fundingPurpose,
            timeline: _timeline
        });

        emit StudentRegistered(msg.sender, _name, _education, _requestedAmount);
    }

    function getStudent(address _studentAddress) public view returns (Student memory) {
        return students[_studentAddress];
    }

    function isRegisteredStudent(address _studentAddress) public view returns (bool) {
        return students[_studentAddress].isRegistered;
    }
} 