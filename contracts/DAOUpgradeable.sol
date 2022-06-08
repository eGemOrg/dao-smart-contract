// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./interfaces/IERC20.sol";

contract DAOUpgradeable is Initializable, OwnableUpgradeable {
  event Withdraw(address _to, address _token, uint256 _amount);

  function initialize() external initializer {
    __Ownable_init();
  }

  function withdraw(address _to, address _token) external onlyOwner {
    require(_to != address(0), "Burn attempt");

    uint256 _amount;

    if (_token == address(0)) {
      _amount = address(this).balance;

      payable(_to).transfer(_amount);
    } else {
      IERC20 token = IERC20(_token);

      _amount = token.balanceOf(address(this));
      token.transfer(_to, _amount);
    }

    emit Withdraw(_to, _token, _amount);
  }

  // solhint-disable-next-line
  fallback() external payable {}

  receive() external payable {}
}
