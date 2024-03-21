// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

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
    IERC20 public boostToken;

    // Temporary use mapping to who owns BOOST token amount
    mapping(address => uint256) public boostTokenBalance;

    // Metadata
    address public advertiser;

    event Boosted(uint256 indexed tokenId, address indexed booster);
    event AdCreated(
        string name,
        address advertiser,
        string advertiseUri,
        address boostTokenAddress,
        uint256 boostTokenAmount,
        address rewardTokenAddress,
        uint256 rewardTokenAmount
    );

    constructor(
        string memory _name,
        address _advertiser,
        string memory _advertiseUri,
        address _boostTokenAddress,
        uint256 _boostTokenAmount,
        address _rewardTokenAddress,
        uint256 _rewardTokenAmount
    ) ERC1155(_advertiseUri) Ownable(_advertiser) {
        name = _name;
        advertiser = _advertiser;
        boostToken = IERC20(_boostTokenAddress);
        adBoostAddress = msg.sender;
        emit AdCreated(
            _name,
            _advertiser,
            _advertiseUri,
            _boostTokenAddress,
            _boostTokenAmount,
            _rewardTokenAddress,
            _rewardTokenAmount
        );
    }

    function boost(uint256 tokenId, address nextBooster) public {
        require(
            balanceOf(msg.sender, tokenId) > 0,
            "Caller has no token to boost"
        );
        require(
            !haveBoosted[nextBooster],
            "Next booster has already boosted this ad"
        );

        if (lastBooster != address(0)) {
            // Transfer BOOST tokens to the last booster
            _transferBoostToken(lastBooster, 1); // Assuming 1 BOOST token per boost; adjust as needed
        }

        // Transfer the NFT to the next booster
        safeTransferFrom(msg.sender, nextBooster, tokenId, 1, "");

        // Update the state
        haveBoosted[nextBooster] = true;

        // Transfer BOOST tokens to the last booster
        lastBooster = msg.sender;

        emit Boosted(tokenId, nextBooster);
    }

    function mintBoostToken(uint256 amount) public onlyOwner {
        // Here you need the logic to mint BOOST tokens
        // This might involve interacting with a separate BOOST token contract
    }

    function burnBoostToken(uint256 amount) public {
        // Here you need the logic to burn BOOST tokens
        // This might involve interacting with a separate BOOST token contract
    }

    function _transferBoostToken(address to, uint256 amount) internal {
        require(
            boostToken.transfer(to, amount),
            "Failed to transfer BOOST tokens"
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
