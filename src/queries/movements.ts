import prisma from "@/lib/prisma";

export async function getLastMovements(take = 10) {
	const movements = await prisma.movement.findMany({
		take,
		include: {
			product: true,
		},
	});
	return movements;
}

export async function getEntriesCount() {
	const entries = await prisma.movement.aggregate({
		where: {
			quantity: { gt: 0 },
			createdAt: {
				gte: new Date(new Date().setDate(new Date().getDate() - 30)),
			},
		},
		_sum: {
			quantity: true,
		},
	});
	return Math.abs(entries._sum.quantity ?? 0);
}

export async function getExitsCount() {
	const exits = await prisma.movement.aggregate({
		where: {
			quantity: { lt: 0 },
			createdAt: {
				gte: new Date(new Date().setDate(new Date().getDate() - 30)),
			},
		},
		_sum: {
			quantity: true,
		},
	});
	return Math.abs(exits._sum.quantity ?? 0);
}

export async function getStockSum() {
	const stock = await prisma.movement.aggregate({
		_sum: {
			quantity: true,
		},
	});
	return stock._sum.quantity ?? 0;
}
