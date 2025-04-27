import { Transaction } from '../types';

let transactions: Transaction[] = [
	{
		id: '1',
		amount: 1250.0,
		date: '2023-09-01T09:30:00Z',
		category: 'salary',
		type: 'income',
		description: 'Monthly salary',
	},
	{
		id: '2',
		amount: 45.5,
		date: '2023-09-02T12:15:00Z',
		category: 'food',
		type: 'expense',
		description: 'Grocery shopping',
	},
	{
		id: '3',
		amount: 25.75,
		date: '2023-09-02T18:30:00Z',
		category: 'transport',
		type: 'expense',
		description: 'Uber ride',
	},
	{
		id: '4',
		amount: 120.0,
		date: '2023-09-03T14:45:00Z',
		category: 'shopping',
		type: 'expense',
		description: 'New shirt',
	},
	{
		id: '5',
		amount: 350.0,
		date: '2023-09-05T16:20:00Z',
		category: 'gift',
		type: 'income',
		description: 'Birthday gift',
	},
	{
		id: '6',
		amount: 80.0,
		date: '2023-09-07T19:10:00Z',
		category: 'entertainment',
		type: 'expense',
		description: 'Movie and dinner',
	},
	{
		id: '7',
		amount: 200.0,
		date: '2023-09-10T08:45:00Z',
		category: 'utilities',
		type: 'expense',
		description: 'Electricity bill',
	},
	{
		id: '8',
		amount: 500.0,
		date: '2023-09-15T10:30:00Z',
		category: 'freelance',
		type: 'income',
		description: 'Website design project',
	},
	{
		id: '9',
		amount: 60.0,
		date: '2023-09-18T13:20:00Z',
		category: 'health',
		type: 'expense',
		description: 'Medicine',
	},
	{
		id: '10',
		amount: 35.0,
		date: '2023-09-20T15:40:00Z',
		category: 'food',
		type: 'expense',
		description: 'Lunch with colleagues',
	},
	{
		id: '11',
		amount: 150.0,
		date: '2023-09-22T11:00:00Z',
		category: 'transport',
		type: 'expense',
		description: 'Train ticket to city',
	},
	{
		id: '12',
		amount: 300.0,
		date: '2023-09-25T17:30:00Z',
		category: 'investment',
		type: 'income',
		description: 'Stock dividends',
	},
	{
		id: '13',
		amount: 90.0,
		date: '2023-09-28T20:00:00Z',
		category: 'entertainment',
		type: 'expense',
		description: 'Concert tickets',
	},
	{
		id: '14',
		amount: 500.0,
		date: '2023-09-30T21:15:00Z',
		category: 'salary',
		type: 'income',
		description: 'Freelance project payment',
	},
	{
		id: '15',
		amount: 75.0,
		date: '2023-09-30T22:00:00Z',
		category: 'food',
		type: 'expense',
		description: 'Dinner with friends',
	},
	{
		id: '16',
		amount: 200.0,
		date: '2023-09-30T23:00:00Z',
		category: 'transport',
		type: 'expense',
		description: 'Taxi fare',
	},
	{
		id: '17',
		amount: 100.0,
		date: '2023-09-30T23:30:00Z',
		category: 'shopping',
		type: 'expense',
		description: 'New shoes',
	},
	{
		id: '18',
		amount: 400.0,
		date: '2023-09-30T23:45:00Z',
		category: 'bills',
		type: 'expense',
		description: 'Internet bill',
	},
	{
		id: '19',
		amount: 250.0,
		date: '2023-10-01T10:00:00Z',
		category: 'freelance',
		type: 'income',
		description: 'Logo design payment',
	},
	{
		id: '20',
		amount: 40.0,
		date: '2023-10-02T12:30:00Z',
		category: 'food',
		type: 'expense',
		description: 'Coffee and snacks',
	},
	{
		id: '21',
		amount: 300.0,
		date: '2023-10-03T14:00:00Z',
		category: 'investment',
		type: 'income',
		description: 'Mutual fund returns',
	},
	{
		id: '22',
		amount: 100.0,
		date: '2023-10-04T16:00:00Z',
		category: 'shopping',
		type: 'expense',
		description: 'New headphones',
	},
	{
		id: '23',
		amount: 75.0,
		date: '2023-10-05T18:00:00Z',
		category: 'entertainment',
		type: 'expense',
		description: 'Streaming subscription',
	},
	{
		id: '24',
		amount: 500.0,
		date: '2023-10-06T20:00:00Z',
		category: 'salary',
		type: 'income',
		description: 'Part-time job payment',
	},
	{
		id: '25',
		amount: 60.0,
		date: '2023-10-07T22:00:00Z',
		category: 'health',
		type: 'expense',
		description: 'Gym membership',
	},
	{
		id: '26',
		amount: 150.0,
		date: '2023-10-08T09:00:00Z',
		category: 'transport',
		type: 'expense',
		description: 'Car maintenance',
	},
	{
		id: '27',
		amount: 200.0,
		date: '2023-10-09T11:00:00Z',
		category: 'utilities',
		type: 'expense',
		description: 'Water bill',
	},
	{
		id: '28',
		amount: 400.0,
		date: '2023-10-10T13:00:00Z',
		category: 'bills',
		type: 'expense',
		description: 'Phone bill',
	},
	{
		id: '29',
		amount: 50.0,
		date: '2023-10-11T15:00:00Z',
		category: 'food',
		type: 'expense',
		description: 'Dinner at a restaurant',
	},
	{
		id: '30',
		amount: 100.0,
		date: '2023-10-12T17:00:00Z',
		category: 'shopping',
		type: 'expense',
		description: 'Books',
	},
	{
		id: '31',
		amount: 300.0,
		date: '2023-10-13T19:00:00Z',
		category: 'freelance',
		type: 'income',
		description: 'App development payment',
	},
	{
		id: '32',
		amount: 80.0,
		date: '2023-10-14T21:00:00Z',
		category: 'entertainment',
		type: 'expense',
		description: 'Concert tickets',
	},
	{
		id: '33',
		amount: 250.0,
		date: '2023-10-15T23:00:00Z',
		category: 'investment',
		type: 'income',
		description: 'Crypto trading profit',
	},
	{
		id: '34',
		amount: 90.0,
		date: '2023-10-16T10:00:00Z',
		category: 'health',
		type: 'expense',
		description: 'Doctor consultation',
	},
	{
		id: '35',
		amount: 120.0,
		date: '2023-10-17T12:00:00Z',
		category: 'transport',
		type: 'expense',
		description: 'Train ticket',
	},
	{
		id: '36',
		amount: 500.0,
		date: '2023-10-18T14:00:00Z',
		category: 'salary',
		type: 'income',
		description: 'Freelance project payment',
	},
	{
		id: '37',
		amount: 70.0,
		date: '2023-10-19T16:00:00Z',
		category: 'food',
		type: 'expense',
		description: 'Groceries',
	},
];

// In-memory database CRUD operations
export const getAllTransactions = (): Promise<Transaction[]> => {
	return new Promise((resolve) => {
		// Simulate network delay
		setTimeout(() => {
			resolve(
				[...transactions].sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
				)
			);
		}, 500);
	});
};

export const getTransactionById = (
	id: string
): Promise<Transaction | undefined> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const transaction = transactions.find((t) => t.id === id);
			resolve(transaction);
		}, 300);
	});
};

export const addTransaction = (
	transaction: Omit<Transaction, 'id'>
): Promise<Transaction> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const newTransaction = {
				...transaction,
				id: Date.now().toString(),
			};
			transactions = [newTransaction, ...transactions];
			resolve(newTransaction);
		}, 500);
	});
};

export const updateTransaction = (
	updatedTransaction: Transaction
): Promise<Transaction> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const index = transactions.findIndex(
				(t) => t.id === updatedTransaction.id
			);
			if (index !== -1) {
				transactions[index] = updatedTransaction;
				resolve(updatedTransaction);
			} else {
				reject(new Error('Transaction not found'));
			}
		}, 500);
	});
};

export const deleteTransaction = (id: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const initialLength = transactions.length;
			transactions = transactions.filter((t) => t.id !== id);
			if (transactions.length < initialLength) {
				resolve(true);
			} else {
				reject(new Error('Transaction not found'));
			}
		}, 500);
	});
};
