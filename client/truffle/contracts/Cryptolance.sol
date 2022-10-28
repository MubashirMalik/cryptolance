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
            status = 2, Completed
            status = 3, Dispute
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
    ) external payable onlyRegisteredFreelancer(awardedTo) onlyRegisteredEmployer(msg.sender) {
        
        require(
            msg.value >= amount,
            "Ethers send must be greater than or equal to amount"
        );

        projects[msg.sender].push(Project(title, ipfsDescription, ipfsFiles, amount, 1, awardedTo));
    }
}