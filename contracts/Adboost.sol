// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract AdBoost is
    Initializable,
    ERC1155Upgradeable,
    OwnableUpgradeable,
    ERC1155PausableUpgradeable,
    ERC1155BurnableUpgradeable,
    ERC1155SupplyUpgradeable,
    UUPSUpgradeable,
    Ownable
{
    uint256 private constant AD_TOKEN_ID = 1; // 固定的廣告Token ID
    string private _adURI; // 廣告的URI

    constructor(
        string memory initialAdURI
    ) ERC1155("https://adboost.com/api/token/{id}.json") {
        _adURI = initialAdURI;
    }

    function setAdURI(string memory newAdURI) public onlyOwner {
        _adURI = newAdURI;
    }

    function mintAd(
        address recipient,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(recipient, AD_TOKEN_ID, amount, data);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override {
        require(id == AD_TOKEN_ID, "AdBoost: Invalid token ID");

        // 如果該NFT的上一個擁有者存在，則給予獎勵
        address previousOwner = _previousOwners[id];
        if (previousOwner != address(this)) {
            // 確保不是新mint的NFT
            require(
                _rewardToken.transfer(previousOwner, amount),
                "AdBoost: Reward transfer failed"
            );
        }

        // 更新NFT的上一個擁有者為當前發起轉移的地址
        _previousOwners[id] = from;

        super.safeTransferFrom(from, to, id, amount, data);
    }

    function batchMintAds(
        address[] memory recipients,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], AD_TOKEN_ID, amount, data);
        }
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        require(tokenId == AD_TOKEN_ID, "AdBoost: Invalid token ID");
        return _adURI;
    }
}
