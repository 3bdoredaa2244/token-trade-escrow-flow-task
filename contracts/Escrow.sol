// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint amount) external returns (bool);
    function transfer(address to, uint amount) external returns (bool);
}

contract Escrow {
    address public moderator;

    struct Deal {
        address buyer;
        address seller;
        address token;
        uint256 amount;
        uint256 deadline;
        bool released;
        bool disputed;
    }

    uint256 public nextDealId;
    mapping(uint256 => Deal) public deals;

    event DealCreated(uint256 indexed dealId, address buyer, address seller, address token, uint256 amount);
    event DealReleased(uint256 indexed dealId);
    event DealDisputed(uint256 indexed dealId);
    event DealResolved(uint256 indexed dealId, bool releasedToSeller);

    modifier onlyBuyer(uint256 dealId) {
        require(msg.sender == deals[dealId].buyer, "Not buyer");
        _;
    }

    modifier onlyModerator() {
        require(msg.sender == moderator, "Not moderator");
        _;
    }

    constructor() {
        moderator = msg.sender;
    }

    function createDeal(address seller, address token, uint256 amount) external returns (uint256) {
        require(seller != address(0), "Invalid seller");
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        deals[nextDealId] = Deal({
            buyer: msg.sender,
            seller: seller,
            token: token,
            amount: amount,
            deadline: block.timestamp + 48 hours,
            released: false,
            disputed: false
        });

        emit DealCreated(nextDealId, msg.sender, seller, token, amount);
        return nextDealId++;
    }

    function releaseDeal(uint256 dealId) external onlyBuyer(dealId) {
        Deal storage deal = deals[dealId];
        require(!deal.released && !deal.disputed, "Cannot release");

        deal.released = true;
        IERC20(deal.token).transfer(deal.seller, deal.amount);

        emit DealReleased(dealId);
    }

    function disputeDeal(uint256 dealId) external onlyBuyer(dealId) {
        Deal storage deal = deals[dealId];
        require(!deal.released && !deal.disputed, "Already resolved");

        deal.disputed = true;
        emit DealDisputed(dealId);
    }

    function resolveDispute(uint256 dealId, bool releaseToSeller) external onlyModerator {
        Deal storage deal = deals[dealId];
        require(deal.disputed && !deal.released, "Invalid state");

        deal.released = true;
        address recipient = releaseToSeller ? deal.seller : deal.buyer;
        IERC20(deal.token).transfer(recipient, deal.amount);

        emit DealResolved(dealId, releaseToSeller);
    }

    function autoRelease(uint256 dealId) external {
        Deal storage deal = deals[dealId];
        require(!deal.released && !deal.disputed, "Already resolved");
        require(block.timestamp > deal.deadline, "Not yet due");

        deal.released = true;
        IERC20(deal.token).transfer(deal.seller, deal.amount);

        emit DealReleased(dealId);
    }
}
