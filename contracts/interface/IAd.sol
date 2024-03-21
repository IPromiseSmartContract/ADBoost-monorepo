// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

interface IAdboost {
    function boost(int tokenId, address nextBooster) external;
    function mintBoostToken(int amount) external;
    function burnBoostToken(int amount) external;
    function getBoostTokenBalance() external view returns (int);
} 
