import { eq, desc, asc } from 'drizzle-orm';
import { db } from '@/db';
import { shoppingLists, shoppingItems } from '@/db/schema';
import { ShoppingList, ShoppingItem, Priority } from '@/types/shopping';

const toListModel = (
	record: typeof shoppingLists.$inferSelect,
	items: ShoppingItem[]
): ShoppingList => {
	const totalEstimatedCost = items.reduce(
		(sum, item) => sum + item.estimatedCost,
		0
	);
	const completed = items.length > 0 && items.every((item) => item.purchased);

	return {
		id: record.id.toString(),
		name: record.name,
		store: record.store || undefined,
		items,
		totalEstimatedCost,
		completed,
		createdAt: record.createdAt.toISOString(),
		updatedAt: record.updatedAt.toISOString(),
	};
};

const toItemModel = (
	record: typeof shoppingItems.$inferSelect
): ShoppingItem => ({
	id: record.id.toString(),
	name: record.name,
	category: 'other',
	quantity: record.quantity,
	estimatedCost: record.estimatedCost,
	priority: record.priority as Priority,
	purchased: record.purchased,
	createdAt: record.createdAt.toISOString(),
	updatedAt: record.updatedAt.toISOString(),
});

export const getAllShoppingLists = async (): Promise<ShoppingList[]> => {
	const listRecords = await db
		.select()
		.from(shoppingLists)
		.orderBy(desc(shoppingLists.createdAt));

	const lists: ShoppingList[] = [];
	for (const listRecord of listRecords) {
		const itemRecords = await db
			.select()
			.from(shoppingItems)
			.where(eq(shoppingItems.listId, listRecord.id))
			.orderBy(desc(shoppingItems.priority), asc(shoppingItems.name));

		lists.push(toListModel(listRecord, itemRecords.map(toItemModel)));
	}

	return lists;
};

export const getShoppingListById = async (
	id: string
): Promise<ShoppingList | null> => {
	const listRecords = await db
		.select()
		.from(shoppingLists)
		.where(eq(shoppingLists.id, parseInt(id)));

	if (listRecords.length === 0) {
		return null;
	}

	const itemRecords = await db
		.select()
		.from(shoppingItems)
		.where(eq(shoppingItems.listId, parseInt(id)))
		.orderBy(desc(shoppingItems.priority), asc(shoppingItems.name));

	return toListModel(listRecords[0], itemRecords.map(toItemModel));
};

export const createShoppingList = async (
	list: Omit<
		ShoppingList,
		| 'id'
		| 'createdAt'
		| 'updatedAt'
		| 'items'
		| 'totalEstimatedCost'
		| 'completed'
	>
): Promise<ShoppingList> => {
	const now = new Date();

	const values = {
		name: list.name,
		store: list.store || '',
		createdAt: now,
		updatedAt: now,
	};

	await db.insert(shoppingLists).values(values);

	const result = await db
		.select()
		.from(shoppingLists)
		.orderBy(shoppingLists.id)
		.limit(1);
	return getShoppingListById(result[0].id.toString()) as Promise<ShoppingList>;
};

export const updateShoppingList = async (
	id: string,
	list: Partial<
		Omit<
			ShoppingList,
			| 'id'
			| 'createdAt'
			| 'updatedAt'
			| 'items'
			| 'totalEstimatedCost'
			| 'completed'
		>
	>
): Promise<void> => {
	const updates: Partial<typeof shoppingLists.$inferInsert> = {};

	if (list.name !== undefined) updates.name = list.name;
	if (list.store !== undefined) updates.store = list.store;

	if (Object.keys(updates).length > 0) {
		updates.updatedAt = new Date();
		await db
			.update(shoppingLists)
			.set(updates)
			.where(eq(shoppingLists.id, parseInt(id)));
	}
};

export const deleteShoppingList = async (id: string): Promise<void> => {
	await db.delete(shoppingLists).where(eq(shoppingLists.id, parseInt(id)));
};

export const addShoppingItem = async (
	listId: string,
	item: Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ShoppingItem> => {
	const now = new Date();

	const values = {
		listId: parseInt(listId),
		name: item.name,
		quantity: item.quantity,
		estimatedCost: item.estimatedCost,
		priority: item.priority,
		purchased: item.purchased,
		createdAt: now,
		updatedAt: now,
	};

	await db.insert(shoppingItems).values(values);

	const result = await db
		.select()
		.from(shoppingItems)
		.orderBy(shoppingItems.id)
		.limit(1);

	return toItemModel(result[0]);
};

export const updateShoppingItem = async (
	id: string,
	item: Partial<Omit<ShoppingItem, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
	const updates: Partial<typeof shoppingItems.$inferInsert> = {};

	if (item.name !== undefined) updates.name = item.name;
	if (item.quantity !== undefined) updates.quantity = item.quantity;
	if (item.estimatedCost !== undefined)
		updates.estimatedCost = item.estimatedCost;
	if (item.priority !== undefined) updates.priority = item.priority;
	if (item.purchased !== undefined) updates.purchased = item.purchased;

	if (Object.keys(updates).length > 0) {
		updates.updatedAt = new Date();
		await db
			.update(shoppingItems)
			.set(updates)
			.where(eq(shoppingItems.id, parseInt(id)));
	}
};

export const deleteShoppingItem = async (id: string): Promise<void> => {
	await db.delete(shoppingItems).where(eq(shoppingItems.id, parseInt(id)));
};

export const toggleItemPurchased = async (
	id: string,
	purchased: boolean
): Promise<void> => {
	await db
		.update(shoppingItems)
		.set({
			purchased,
			updatedAt: new Date(),
		})
		.where(eq(shoppingItems.id, parseInt(id)));
};
