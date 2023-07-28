module.exports = [
   {
      anonymous: false,
      inputs: [
         { indexed: true, internalType: "address", name: "recipient", type: "address" },
         { indexed: true, internalType: "address", name: "questAddress", type: "address" },
         { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
         { indexed: false, internalType: "string", name: "questId", type: "string" }
      ],
      name: "QuestNFTMinted",
      type: "event"
   },
   {
      anonymous: false,
      inputs: [
         { indexed: true, internalType: "address", name: "recipient", type: "address" },
         { indexed: true, internalType: "address", name: "questAddress", type: "address" },
         { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
         { indexed: false, internalType: "string", name: "questId", type: "string" }
      ],
      name: "ReceiptMinted",
      type: "event"
   },
   {
      anonymous: false,
      inputs: [
         { indexed: true, internalType: "address", name: "recipient", type: "address" },
         { indexed: true, internalType: "address", name: "questAddress", type: "address" },
         { indexed: false, internalType: "string", name: "questId", type: "string" },
         { indexed: false, internalType: "address", name: "rewardToken", type: "address" },
         {
            indexed: false,
            internalType: "uint256",
            name: "rewardAmountInWei",
            type: "uint256"
         }
      ],
      name: "QuestClaimed",
      type: "event"
   },
   {
      anonymous: false,
      inputs: [
         { indexed: true, internalType: "address", name: "recipient", type: "address" },
         { indexed: true, internalType: "address", name: "questAddress", type: "address" },
         { indexed: false, internalType: "string", name: "questId", type: "string" },
         { indexed: false, internalType: "address", name: "rewardToken", type: "address" },
         { indexed: false, internalType: "uint256", name: "tokenId", type: "uint256" }
      ],
      name: "Quest1155Claimed",
      type: "event"
   }
];
