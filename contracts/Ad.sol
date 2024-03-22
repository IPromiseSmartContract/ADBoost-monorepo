// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ERC20.sol";
import "./MCV2_Token.sol";
import "./MCV2_ZapV1.sol";
import "./MCV2_Bond.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

// Bond: 0x8dce343A86Aa950d539eeE0e166AFfd0Ef515C0c
// zapV1: 0x1Bf3183acc57571BecAea0E238d6C3A4d00633da
contract Ad is
    ERC1155,
    Ownable,
    ERC1155Pausable,
    ERC1155Burnable,
    ERC1155Supply
{
    string public name;
    address public adBoostAddress;
    mapping(address => bool) public haveBoosted;
    address public lastBooster;
    MCV2_Token public boostToken;
    address public zapV1Address =
        address(0x1Bf3183acc57571BecAea0E238d6C3A4d00633da);
    address public bondAddress =
        address(0x8dce343A86Aa950d539eeE0e166AFfd0Ef515C0c);

    // Metadata
    address public advertiser;

    event Boosted(uint256 indexed tokenId, address indexed booster);
    event AdCreated(
        string name,
        address advertiser,
        string advertiseUri,
        address boostTokenAddress,
        uint256 ethAmount,
        uint256 preMintAdAmount
    );

    receive() external payable {}

    constructor(
        string memory _name,
        address _advertiser,
        string memory _advertiseUri,
        address _boostTokenAddress,
        uint256 _ethAmount,
        uint256 _preMintAdAmount
    ) payable ERC1155(_advertiseUri) Ownable(_advertiser) {
        // check eth amount, msg.value
        require(msg.value >= _ethAmount, "Not enough eth to create ad");

        name = _name;
        advertiser = _advertiser;
        adBoostAddress = msg.sender;
        boostToken = MCV2_Token(_boostTokenAddress);

        if (_preMintAdAmount > 0) {
            _mint(advertiser, 1, _preMintAdAmount, "");
        }

        emit AdCreated(
            _name,
            _advertiser,
            _advertiseUri,
            _boostTokenAddress,
            _ethAmount,
            _preMintAdAmount
        );
    }

    // Override transfer functions
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override {
        require(!haveBoosted[to], "Next booster has already boosted this ad");
        // Transfer BOOST tokens to the last booster
        if (lastBooster != address(0)) {
            mintBoostToken(lastBooster, 1);
        }
        super.safeTransferFrom(from, to, id, amount, data);
        haveBoosted[to] = true;
        lastBooster = msg.sender;
        emit Boosted(id, to);
    }

    // function boost(uint256 tokenId, address nextBooster) public {
    //     require(
    //         balanceOf(msg.sender, tokenId) > 0,
    //         "Caller has no token to boost"
    //     );
    //     require(
    //         !haveBoosted[nextBooster],
    //         "Next booster has already boosted this ad"
    //     );
    //     if (lastBooster != address(0)) {
    //         // Transfer BOOST tokens to the last booster
    //         mintBoostToken(lastBooster, 1);
    //     }
    //     // Transfer the NFT to the next booster
    //     safeTransferFrom(msg.sender, nextBooster, tokenId, 1, "");
    //     haveBoosted[nextBooster] = true;
    //     lastBooster = msg.sender;
    //     emit Boosted(tokenId, nextBooster);
    // }

    function mintBoostToken(address to, uint256 amount) public payable {
        uint128 priceForNextMint = MCV2_Bond(bondAddress).priceForNextMint(
            address(boostToken)
        );
        require(
            address(this).balance >= amount * priceForNextMint,
            "Not enough eth to mint BOOST token"
        );
        MCV2_ZapV1(payable(zapV1Address)).mintWithEth{
            value: address(this).balance
        }(address(boostToken), amount * 10 ** boostToken.decimals(), to);
    }

    function burnBoostToken(uint256 amount) public {
        // Approve the zapV1 contract to spend the BOOST tokens
        MCV2_Token(address(boostToken)).approve(zapV1Address, amount);

        // Burn the BOOST tokens
        MCV2_ZapV1(payable(zapV1Address)).burnToEth(
            address(boostToken),
            amount,
            0,
            address(this)
        );
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Pausable, ERC1155Supply) {
        super._update(from, to, ids, values);
    }
}
