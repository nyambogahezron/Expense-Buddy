import { eq } from 'drizzle-orm';
import { Category } from '@/types/category';
import { sql } from 'drizzle-orm';
import { categories, transactions } from '@/db/schema';
import { db } from '@/db';

const toModel = (record: typeof categories.$inferSelect): Category => ({
	id: record.id.toString(),
	name: record.name,
	icon: record.icon,
	color: record.color,
	description: record.description || '',
	itemCount: 0,
	items: [],
});

export const getAllCategories = async (): Promise<Category[]> => {
	const records = await db.select().from(categories).orderBy(categories.name);
	return records.map(toModel);
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
	const records = await db
		.select()
		.from(categories)
		.where(eq(categories.id, parseInt(id)));

	return records.length > 0 ? toModel(records[0]) : null;
};

export const createCategory = async (
	category: Omit<Category, 'id' | 'itemCount' | 'items'>
): Promise<Category> => {
	const now = new Date();

	await db.insert(categories).values({
		name: category.name,
		icon: category.icon,
		color: category.color,
		description: category.description,
		createdAt: now,
		updatedAt: now,
	});

	const result = await db
		.select()
		.from(categories)
		.orderBy(categories.id)
		.limit(1);
	return toModel(result[0]);
};

export const updateCategory = async (
	id: string,
	category: Partial<Omit<Category, 'id' | 'itemCount' | 'items'>>
): Promise<void> => {
	const updates: Partial<typeof categories.$inferInsert> = {};

	if (category.name !== undefined) updates.name = category.name;
	if (category.icon !== undefined) updates.icon = category.icon;
	if (category.color !== undefined) updates.color = category.color;
	if (category.description !== undefined)
		updates.description = category.description;

	if (Object.keys(updates).length > 0) {
		updates.updatedAt = new Date();
		await db
			.update(categories)
			.set(updates)
			.where(eq(categories.id, parseInt(id)));
	}
};

export const deleteCategory = async (id: string): Promise<void> => {
	await db.delete(categories).where(eq(categories.id, parseInt(id)));
};

export const getCategoryItemCount = async (
	categoryId: string
): Promise<number> => {
	const result = await db
		.select({ count: sql<number>`count(*)` })
		.from(transactions)
		.where(eq(transactions.categoryId, parseInt(categoryId)));
	return result[0]?.count || 0;
};

export const getCategoryItems = async (
	categoryId: string
): Promise<Category['items']> => {
	const records = await db
		.select({
			id: transactions.id,
			name: transactions.description,
			amount: transactions.amount,
			date: transactions.date,
		})
		.from(transactions)
		.where(eq(transactions.categoryId, parseInt(categoryId)))
		.orderBy(transactions.date);

	return records.map((record) => ({
		id: record.id.toString(),
		name: record.name || '',
		amount: record.amount,
		date: record.date.toISOString(),
		tags: [],
	}));
};
