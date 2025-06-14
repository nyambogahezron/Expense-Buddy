import { eq, and } from 'drizzle-orm';
import { db } from '@/db';
import { budgets, budgetCategories, categories } from '@/db/schema';
import { Budget, BudgetCategory } from '@/types/budget';

const toModel = async (
	budgetRecord: typeof budgets.$inferSelect,
	categoryRecords: Array<
		typeof budgetCategories.$inferSelect & {
			category: typeof categories.$inferSelect;
		}
	>
): Promise<Budget> => {
	const budgetCategories: BudgetCategory[] = categoryRecords.map((record) => ({
		id: record.categoryId.toString(),
		name: record.category.name,
		amount: record.amount,
		spent: record.spent,
		color: record.category.color,
	}));

	return {
		id: budgetRecord.id.toString(),
		name: budgetRecord.name,
		totalAmount: budgetRecord.totalAmount,
		period: budgetRecord.period as Budget['period'],
		startDate: budgetRecord.startDate.toISOString(),
		endDate: budgetRecord.endDate.toISOString(),
		categories: budgetCategories,
		createdAt: budgetRecord.createdAt.toISOString(),
		updatedAt: budgetRecord.updatedAt.toISOString(),
	};
};

export const getAllBudgets = async (): Promise<Budget[]> => {
	const budgetRecords = await db
		.select()
		.from(budgets)
		.orderBy(budgets.startDate);

	const results: Budget[] = [];
	for (const budgetRecord of budgetRecords) {
		const categoryRecords = await db
			.select({
				id: budgetCategories.id,
				budgetId: budgetCategories.budgetId,
				categoryId: budgetCategories.categoryId,
				amount: budgetCategories.amount,
				spent: budgetCategories.spent,
				createdAt: budgetCategories.createdAt,
				updatedAt: budgetCategories.updatedAt,
				category: {
					id: categories.id,
					name: categories.name,
					icon: categories.icon,
					color: categories.color,
					description: categories.description,
					createdAt: categories.createdAt,
					updatedAt: categories.updatedAt,
				},
			})
			.from(budgetCategories)
			.innerJoin(categories, eq(budgetCategories.categoryId, categories.id))
			.where(eq(budgetCategories.budgetId, budgetRecord.id));

		results.push(await toModel(budgetRecord, categoryRecords));
	}

	return results;
};

export const getBudgetById = async (id: string): Promise<Budget | null> => {
	const budgetRecords = await db
		.select()
		.from(budgets)
		.where(eq(budgets.id, parseInt(id)));

	if (budgetRecords.length === 0) {
		return null;
	}

	const categoryRecords = await db
		.select({
			id: budgetCategories.id,
			budgetId: budgetCategories.budgetId,
			categoryId: budgetCategories.categoryId,
			amount: budgetCategories.amount,
			spent: budgetCategories.spent,
			createdAt: budgetCategories.createdAt,
			updatedAt: budgetCategories.updatedAt,
			category: {
				id: categories.id,
				name: categories.name,
				icon: categories.icon,
				color: categories.color,
				description: categories.description,
				createdAt: categories.createdAt,
				updatedAt: categories.updatedAt,
			},
		})
		.from(budgetCategories)
		.innerJoin(categories, eq(budgetCategories.categoryId, categories.id))
		.where(eq(budgetCategories.budgetId, parseInt(id)));

	return toModel(budgetRecords[0], categoryRecords);
};

export const createBudget = async (
	budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Budget> => {
	const now = new Date();

	await db.insert(budgets).values({
		name: budget.name,
		totalAmount: budget.totalAmount,
		period: budget.period,
		startDate: new Date(budget.startDate),
		endDate: new Date(budget.endDate),
		createdAt: now,
		updatedAt: now,
	});

	const result = await db.select().from(budgets).orderBy(budgets.id).limit(1);
	const newBudget = result[0];

	await db.insert(budgetCategories).values(
		budget.categories.map((category) => ({
			budgetId: newBudget.id,
			categoryId: parseInt(category.id),
			amount: category.amount,
			spent: category.spent,
			createdAt: now,
			updatedAt: now,
		}))
	);

	return getBudgetById(newBudget.id.toString()) as Promise<Budget>;
};

export const updateBudget = async (
	id: string,
	budget: Partial<Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
	const updates: Partial<typeof budgets.$inferInsert> = {};

	if (budget.name !== undefined) updates.name = budget.name;
	if (budget.totalAmount !== undefined)
		updates.totalAmount = budget.totalAmount;
	if (budget.period !== undefined) updates.period = budget.period;
	if (budget.startDate !== undefined)
		updates.startDate = new Date(budget.startDate);
	if (budget.endDate !== undefined) updates.endDate = new Date(budget.endDate);

	if (Object.keys(updates).length > 0) {
		updates.updatedAt = new Date();
		await db
			.update(budgets)
			.set(updates)
			.where(eq(budgets.id, parseInt(id)));
	}

	if (budget.categories) {
		const now = new Date();

		await db
			.delete(budgetCategories)
			.where(eq(budgetCategories.budgetId, parseInt(id)));

		await db.insert(budgetCategories).values(
			budget.categories.map((category) => ({
				budgetId: parseInt(id),
				categoryId: parseInt(category.id),
				amount: category.amount,
				spent: category.spent,
				createdAt: now,
				updatedAt: now,
			}))
		);
	}
};

export const deleteBudget = async (id: string): Promise<void> => {
	await db.delete(budgets).where(eq(budgets.id, parseInt(id)));
};

export const updateCategorySpent = async (
	budgetId: string,
	categoryId: string,
	spent: number
): Promise<void> => {
	await db
		.update(budgetCategories)
		.set({
			spent,
			updatedAt: new Date(),
		})
		.where(
			and(
				eq(budgetCategories.budgetId, parseInt(budgetId)),
				eq(budgetCategories.categoryId, parseInt(categoryId))
			)
		);
};
