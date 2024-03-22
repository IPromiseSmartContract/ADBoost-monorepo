// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Ad.sol";

contract AdBoost is Ownable {
    address[] public ads;

    event AdCreated(
        address indexed adAddress,
        string name,
        address indexed creator
    );

    constructor(address _initialOwner) Ownable(_initialOwner) {}

    function createAd(
        string memory _name,
        address _boostTokenAddress,
        uint256 _ethAmount,
        uint256 _preMintAdAmount,
        string memory _uri
    ) public payable returns (address) {
        require(msg.value >= _ethAmount, "Not enough eth to create ad");
        Ad ad = (new Ad){value: _ethAmount}(
            _name,
            msg.sender,
            _uri,
            _boostTokenAddress,
            _ethAmount,
            _preMintAdAmount
        );
        ads.push(address(ad));
        return address(ad);
    }

    // 获取所有广告合约的地址
    function getAllAds() public view returns (address[] memory) {
        return ads;
    }
}
