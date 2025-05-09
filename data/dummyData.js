// Sample initial data
const projectsData = [
    {
        id: 1,
        logo: 'ZK',
        name: 'zkSync Airdrop',
        status: 'Started',
        startDate: '2025-05-01',
        deadline: '2025-06-30',
        fundsRaised: '$120M',
        rank: '#2,311',
        interaction: {
            current: 7,
            total: 14,
            lastCheckin: '2025-05-15'
        },
        tasks: [
            { id: 1, type: 'Galxe Quest', status: 'Completed' },
            { id: 2, type: 'Zealy Campaign', status: 'Started' },
            { id: 3, type: 'Twitter Follow', status: 'Completed' },
            { id: 4, type: 'Contract Call', status: 'Not Started' }
        ]
    },
    {
        id: 2,
        logo: 'ST',
        name: 'Starknet Quest',
        status: 'Finished',
        startDate: '2025-03-01',
        deadline: '2025-04-15',
        fundsRaised: '$80M',
        rank: '#1,542',
        interaction: {
            current: 30,
            total: 30,
            lastCheckin: '2025-04-15'
        },
        tasks: [
            { id: 1, type: 'Galxe Quest', status: 'Completed' },
            { id: 2, type: 'Custom Task', status: 'Completed' },
            { id: 3, type: 'Discord Join', status: 'Completed' }
        ]
    },
    {
        id: 3,
        logo: 'AR',
        name: 'Arbitrum Odyssey',
        status: 'Missed',
        startDate: '2025-01-10',
        deadline: '2025-02-28',
        fundsRaised: '$150M',
        rank: '#8,742',
        interaction: {
            current: 12,
            total: 40,
            lastCheckin: '2025-02-20'
        },
        tasks: [
            { id: 1, type: 'Zealy Campaign', status: 'Missed' },
            { id: 2, type: 'Twitter Follow', status: 'Completed' },
            { id: 3, type: 'Contract Call', status: 'Missed' }
        ]
    }
];
