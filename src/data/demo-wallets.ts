export interface WalletData {
  address: string;
  name?: string;
  avatar?: string;
  bio?: string;
  twitter?: string;
  github?: string;
  discord?: string;
  website?: string;
  nfts?: number;
  tokens?: number;
  transactions?: number;
  created?: string;
  network: 'ethereum' | 'polygon' | 'bsc' | 'arbitrum';
  balance?: string;
  verified?: boolean;
  role?: 'developer' | 'founder' | 'investor' | 'builder' | 'community';
}

export const demoWallets: WalletData[] = [
  {
    address: "0x3900971CbAaBE06Bb316F655dD2aF75896F4c666",
    name: "Alex Chen",
    avatar: "/api/placeholder/100/100",
    bio: "Full-stack developer passionate about DeFi and Web3 infrastructure",
    twitter: "@alexchen_dev",
    github: "alexchen",
    website: "https://alexchen.dev",
    nfts: 47,
    tokens: 23,
    transactions: 1250,
    created: "2021-05-15",
    network: "ethereum",
    balance: "12.45",
    verified: true,
    role: "developer"
  },
  {
    address: "0xfCcf62e5a6B838689E0D21961775b80fb8645666",
    name: "Sarah Kim",
    avatar: "/api/placeholder/100/100",
    bio: "Blockchain researcher and DeFi protocol architect",
    twitter: "@sarahkim_crypto",
    github: "sarahkim",
    discord: "sarahkim#1234",
    nfts: 89,
    tokens: 156,
    transactions: 3420,
    created: "2020-12-03",
    network: "ethereum",
    balance: "45.67",
    verified: true,
    role: "founder"
  },
  {
    address: "0xB143856Ab1224D722Dbd0576E3Fc05D98f345666",
    name: "Mike Johnson",
    avatar: "/api/placeholder/100/100",
    bio: "Web3 investor and startup advisor in Southeast Asia",
    twitter: "@mikejohnson_vc",
    website: "https://mikejohnson.vc",
    nfts: 234,
    tokens: 89,
    transactions: 892,
    created: "2021-08-20",
    network: "polygon",
    balance: "8.92",
    verified: true,
    role: "investor"
  },
  // Generate more demo data...
  ...Array.from({ length: 97 }, (_, i) => {
const addresses = [
  "0x3900971CbAaBE06Bb316F655dD2aF75896F4c666",
  "0xfCcf62e5a6B838689E0D21961775b80fb8645666",
  "0xB143856Ab1224D722Dbd0576E3Fc05D98f345666",
  "0x0635c20a7A9EDeC21D07817B98953C7Af73dB666",
  "0x5d42185Da13F0732CAEC49c1fd7bB58f60330666",
  "0x3a0f9e7ec4E682c65C61bDB259D8c6e09d810666",
  "0xF388fbBED3507215914F04BF14511C4ce2E99666",
  "0xc3B1C0AfEc7000D3D0271419DAaEd2976f3a0666",
  "0x30Ca7311897E9e9d0c8e19B74FE0B8829e06D666",
  "0x073f6140Aebd5bC5324F4a64c9b1388518AE9666",
  "0x5129e0b6e8C8e08CB95085257EDB17038D416666",
  "0xc7beDDB29459952e49faE3157Fd71e99D8f7C666",
  "0x2d61a65D99D58181F1B18a8cFd57984ac16da666",
  "0x0b87Ed35957ab7D344C16F65ffc2712F7e32b666",
  "0xD6a790e5B7c8bFf7DE0BBB49e25e40aBA14E8666",
  "0x9f0621Ba0b4a8EDa80476666Bb4CD39eb8899666",
  "0xBd956df1281B7b107f22a6bf1E8F039A398B6666",
  "0x863f4e37F3C553ffBe9f43dAac57FC815b1c8666",
  "0xe091066bE638a084fafAeC6d1209ae0085299666",
  "0x7DAB2300386b305918a9E427241C09cB5B1C2666",
  "0x2F04878eFbD70D71923188B7DA4508093f2d9666",
  "0x4338579B2CaC5608843f72A5268e62cC4D1A3666",
  "0x9B483208819c1eDce7CbE2fE96e5cBb535246666",
  "0x3E866d1f149C4a7D9277dA372ebe2cd3DaBb8666",
  "0x0Fe2bEd0125905a2fb61663de5A0788529e3c666",
  "0xb76D6fa64D5c0e679B3bDC7EdB59be7CaB5DB666",
  "0xDe9583650aC5eE25f9fD8b66Aec89D2105151666",
  "0x525055F5D26CB2b48041437116b492b36e194666",
  "0xC3889b2d8EdeF309d928DdB1E86D3A3E0a2Fe666",
  "0x075A24FC85256e4129aAe9aB66f7725bDEA9a666",
  "0xB998c7Cf6b331D5E0a43527e99A093A3DB3b8666",
  "0xb56FA105ebFBF300366D2ff5fb771EB8Ec0f4666",
  "0x99953CA14d5B6f6885223538a1B5488c48f59666",
  "0xC598fcBB986d1d1D99f137017316F252e7bF9666",
  "0xfFD4fFE1c81E4F36BA109c3461B721D3c789a666",
  "0x2Ee529F7857d4F69a42775D27ac29ba23Fb30666",
  "0x3fC3b7fB5bD76196Bbea2288ee884c42f6882666",
  "0x5c5CAD995ae65B76803D3865C2e8F8CBf2772666",
  "0x503Ed24E1e11A9A3FEcdD59e487b054380624666",
  "0xE117b095E4c66fe7f8BaE47e6D4daa87fa618666",
  "0xA0fbA279110B4d21b3B4d91dcBc4AF83336e4666",
  "0x7205687eaE9b52AB307Ef16ec7e647938Ac52666",
  "0xfB40714Fe168951FB615F09491f6D2d95105E666",
  "0x8FFf67db69D123469067A84b9cbe2339Cf793666",
  "0x0eeF132193C6FC297Ec3e3817b38E3DF08df3666",
  "0x43B13003Ef3C9C3eC6bc85624FbEB21546189666",
  "0xF96cd3026c8ffd198603fb43Afa9b1365ae62666",
  "0x774C5fC86bf9265b0BBd073c909D094bfa40b666",
  "0xeB23190533a2848239Cf742ad7c7119Ae707c666",
  "0x8DBd1a9CB946D93614A4186Ca55be0Df9Cfa1666",
  "0x615577A0d8Df660bfeA1837148bD1949e85f7666",
  "0x082F803f49C5107bCD9b1295fF1A15f713E84666"
];

    
    const names = [
      "Emma Wilson", "David Lee", "Lisa Zhang", "James Brown", "Anna Taylor",
      "Robert Davis", "Maria Garcia", "John Smith", "Jennifer Miller", "Michael Wang"
    ];
    
    const roles = ["developer", "founder", "investor", "builder", "community"] as const;
    const networks = ["ethereum", "polygon", "bsc", "arbitrum"] as const;
    
    return {
      address: addresses[i % addresses.length] || `0x${Math.random().toString(16).substr(2, 40)}`,
      name: names[i % names.length],
      avatar: "/api/placeholder/100/100",
      bio: `Web3 enthusiast and ${roles[i % roles.length]} building the decentralized future`,
      twitter: `@user${i + 4}`,
      nfts: Math.floor(Math.random() * 500),
      tokens: Math.floor(Math.random() * 200),
      transactions: Math.floor(Math.random() * 5000),
      created: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
      network: networks[i % networks.length],
      balance: (Math.random() * 100).toFixed(2),
      verified: Math.random() > 0.3,
      role: roles[i % roles.length]
    };
  })
];

export function searchWallets(query: string): WalletData[] {
  if (!query) return [];
  
  const searchTerm = query.toLowerCase();
  return demoWallets.filter(wallet => 
    wallet.address.toLowerCase().includes(searchTerm) ||
    wallet.name?.toLowerCase().includes(searchTerm) ||
    wallet.bio?.toLowerCase().includes(searchTerm) ||
    wallet.twitter?.toLowerCase().includes(searchTerm)
  );
}

export function getWalletByAddress(address: string): WalletData | undefined {
  return demoWallets.find(wallet => 
    wallet.address.toLowerCase() === address.toLowerCase()
  );
}
