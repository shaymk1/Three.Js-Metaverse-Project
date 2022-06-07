// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

//OpenZeppelin import
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

//0x61c8d95a699C758aC1bD17694FE8880A5DDf7BA1

contract Metaverse is ERC721, Ownable{
    constructor() ERC721 ("META", "MSK"){

    }

    

//Counters to regulate the number of NFT's minted in our contract

using Counters for Counters.Counter;
Counters.Counter private supply;

//total numbers of NFT available for creation
uint256 public maxSupply =100;

//cost associated with each NFT token
uint256 public cost = 1 ether;

//owner and its properties in the metaverse
mapping(address => Building []) NFTOwners;

//metaverse buildings
struct Building {
    string name;
    int8 width;
    int8 height;
    int8 depth;
    int8 x;
    int8 y;
    int8 z;
}
//list of buildings in the metaverse
Building[] public buildings; 

//obtaining buildings made in the metaverse

function getBuildings() public view returns(Building[] memory){
  return buildings;
}

//current supply of NFT tokens
function tokenSupply()public view returns(uint256){
    return supply.current();
}

//creation of Buildings as  NFT tokens in the metaverse
function mint(string memory _building_name,int8 _width,int8 _height,int8 _depth,
int8 _x,int8 _y,int8 _z) public payable{
    require(supply.current() <= maxSupply, "max supply exceeded!");
    require(msg.value >= cost, "Insufficient funds");
    supply.increment();
    _safeMint(msg.sender,supply.current());
    Building memory _newBuild = Building(_building_name, _width, _height, _depth,_x, _y,_z);
    buildings.push(_newBuild);
    NFTOwners[msg.sender].push(_newBuild);
}

//extraction of funds/ethers from the smart contract to our wallet
function withdtraw() external payable onlyOwner{
    address payable _owner = payable (owner());
    _owner.transfer(address(this).balance);
    
}


//obtain user's metaverse buildings
function getOwnerBuildings() public view returns(Building[] memory){
    return NFTOwners[msg.sender];
}



}