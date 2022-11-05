// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Cryptolance {

    struct Freelancer {
        string email;
        bool isRegistered;
        // other data
        
    }

    struct Employer {
        string email;
        bool isRegistered;
        // other data
    }

    struct Project {
        string title;
        bytes ipfsDescription;
        bytes ipfsFiles;
        uint256 amount;
        /*
            status = 0, Mapping-check
            status = 1, In-progress
            status = 2, Completed - I
            status = 3, Completed - II
        */
        uint8 status;
        address awardedTo;
    }

    mapping(address => Freelancer) freelancers;
    mapping(address => Employer) employers;
    mapping(address => Project[]) projects;

    modifier onlyRegisteredFreelancer (address addr) {
        require(
            freelancers[addr].isRegistered == true,
            "Freelancer not registered"
        );
        _;
    }

    modifier onlyRegisteredEmployer (address addr) {
        require(
            employers[addr].isRegistered == true,
            "Employer not registered"
        );
        _;
    }

    function registerFreelancer(string memory email) external {
        require(
            freelancers[msg.sender].isRegistered == false,
            "Freelancer already registered!"
        );
        freelancers[msg.sender] = Freelancer(email, true);
    }

    function registerEmployer(string memory email) external {
        require(
            employers[msg.sender].isRegistered == false,
            "Employer already registered!"
        );
        employers[msg.sender] = Employer(email, true);
    }

    function addProject(
        string memory title,
        bytes memory ipfsDescription,
        bytes memory ipfsFiles,
        uint256 amount,
        address awardedTo
    ) external payable /** onlyRegisteredFreelancer(awardedTo) onlyRegisteredEmployer(msg.sender) */ {
        
        require(
            msg.value >= amount,
            "Ethers send must be greater than or equal to amount"
        );

        projects[msg.sender].push(Project(title, ipfsDescription, ipfsFiles, amount, 1, awardedTo));
    }

    function releasePayment(uint256 projectId) external {
        require(
            projects[msg.sender][projectId].status == 1,
            "Project id is not valid"
        );
        projects[msg.sender][projectId].status = 2;
    }

    function completeProject(address employer, uint256 projectId) external {
        require(
            projects[employer][projectId].status == 2,
            "Project id is not valid"
        );

        require(projects[employer][projectId].awardedTo == msg.sender,
            "You are not authorized to complete this project"
        );

        projects[msg.sender][projectId].status = 3;
        address payable receiver = payable(msg.sender);
        receiver.transfer(projects[employer][projectId].amount);
    }
}