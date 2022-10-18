// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FiverrBlock {

    struct Freelancer {
        string email;
    }

    mapping(address => Freelancer) freelancers;

    function saveFreelancer(string memory email) external {
        freelancers[msg.sender] = Freelancer(email);
    }
}