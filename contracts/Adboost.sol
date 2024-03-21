// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Ad.sol"; // 假设Ad合约与此合约在同一目录

contract AdBoost is Ownable {
    IERC20 public boostToken; // BOOST代币的接口
    address[] public ads; // 存储所有广告合约的地址

    event AdCreated(
        address indexed adAddress,
        string name,
        address indexed creator
    );

    constructor(
        address _boostTokenAddress,
        address _initialOwner
    ) Ownable(_initialOwner) {
        boostToken = IERC20(_boostTokenAddress);
    }

    function createAd(
        string memory _name,
        uint256 _boostTokenAmount,
        address _rewardTokenAddress,
        uint256 _rewardTokenAmount,
        uint256 _preMintAdAmount,
        string memory _uri
    ) public {
        Ad ad = new Ad(
            _name,
            msg.sender, // 假设广告创建者是AdBoost合约的所有者
            _uri,
            address(boostToken),
            _boostTokenAmount,
            _rewardTokenAddress,
            _rewardTokenAmount
        );
        ads.push(address(ad));

        // Mint NFT for the advertiser
        if (_preMintAdAmount > 0) {
            ad.mint(msg.sender, 1, _preMintAdAmount, "");
        }
        emit AdCreated(address(ad), _name, msg.sender);
    }

    // 可选：充值广告合约的BOOST代币
    function chargeAd(
        address adAddress,
        uint256 boostTokenAmount
    ) public onlyOwner {
        require(
            boostTokenAmount > 0,
            "Boost token amount must be greater than 0"
        );
        boostToken.transfer(adAddress, boostTokenAmount);
    }

    // 获取所有广告合约的地址
    function getAllAds() public view returns (address[] memory) {
        return ads;
    }
}
