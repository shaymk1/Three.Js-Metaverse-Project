import abi from './abi/abi.json' assert { type: 'json' };

// SC:0x61c8d95a699c758ac1bd17694fe8880a5ddf7ba1;

const blockchain = new Promise((res, rej) => {
	//checking if the metamask is available, if not we need to let them know , they need to use the metamask
	if (typeof window.ethereum === 'undefined') {
		rej('you should install or connect to MetaMask');
	}

	//web3 instance:
	let web3 = new web3(window.ethereum);
	//establishing a connection to web3
	let contract = new web3.eth.eth.Contract(
		abi,
		0x61c8d95a699c758ac1bd17694fe8880a5ddf7ba1
	);

	//get my metamask address
	web3.eth.requestAccounts().then((accounts) => {
		console.log('-> my account is: ', accounts[0]);
	});

	//get the current supply of NFT tokens
	web3.eth.requestAccounts().then((accounts) => {
		contract.methods
			.totalSupply()
			.call({ from: accounts[0] })
			.then((supply) => {
				console.log('->total supply of NFT Tokens: ', supply);
			});
	});

	//Maximum number of supply available
	web3.eth.requestAccounts().then((accounts) => {
		contract.methods
			.maxSupply()
			.call({ from: accounts[0] })
			.then((maxsupply) => {
				console.log('->Maximum supply of NFT Tokens: ', maxsupply);
			});
	});

	//Your buildings made in metaverse
	web3.eth.requestAccounts().then((accounts) => {
		contract.methods
			.getOwnerBuildings()
			.call({ from: accounts[0] })
			.then((buildings) => {
				console.log('->Your Buildings: ', buildings);
			});
	});

	//Get all the buildings made in metaverse
	web3.eth.requestAccounts().then((accounts) => {
		contract.methods
			.totalSupply()
			.call({ from: accounts[0] })
			.then((buildings) => {
            contract.methods.getBuildings().call({ from: accounts[0] })
            .then((data)=>{
              res({supply:supply, building:data})
            })



				console.log('->Your Buildings: ', buildings);
			});
	});
});
