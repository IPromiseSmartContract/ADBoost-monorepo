// SPDX-License-Identifier: BSD-3-Clause

pragma solidity ^0.8.24;

interface MCV2_IZapV1 {
    function mintWithEth(
        address token,
        uint256 tokensToMint,
        address receiver
    ) external payable;

    function burnToEth(
        address token,
        uint256 tokensToBurn,
        uint256 minRefund,
        address receiver
    ) external;
}
