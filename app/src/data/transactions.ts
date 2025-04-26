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
