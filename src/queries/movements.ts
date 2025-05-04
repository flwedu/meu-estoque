import prisma from "@/lib/prisma";

export async function getMovements() {
	const movements = await prisma.movement.findMany({
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
		},
		_sum: {
			quantity: true,
		},
	});
	return entries._sum.quantity ?? 0;
}

export async function getExitsCount() {
	const exits = await prisma.movement.aggregate({
		where: {
			quantity: { lt: 0 },
		},
		_sum: {
			quantity: true,
		},
	});
	return exits._sum.quantity ?? 0;
}

export async function getStockSum() {
	const stock = await prisma.movement.aggregate({
		_sum: {
			quantity: true,
		},
	});
	return stock._sum.quantity ?? 0;
}
