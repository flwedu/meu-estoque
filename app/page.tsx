import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center p-24 min-h-screen">
			<div className="z-10 justify-between items-center w-full max-w-5xl font-mono text-sm">
				<h1 className="mb-8 font-bold text-4xl text-center">
					Bem-vindo ao Meu Estoque
				</h1>
				<p className="mb-8 text-center">
					Sistema de gerenciamento de estoque simples e eficiente
				</p>
				<div className="flex justify-center gap-4">
					<Link
						href="/products"
						className="group hover:bg-gray-100 hover:dark:bg-neutral-800/30 px-5 py-4 border hover:border-gray-300 hover:dark:border-neutral-700 border-transparent rounded-lg transition-colors"
					>
						<h2 className="mb-3 font-semibold text-2xl">
							Produtos{" "}
							<span className="inline-block motion-reduce:transform-none transition-transform group-hover:translate-x-1">
								-&gt;
							</span>
						</h2>
						<p className="opacity-50 m-0 max-w-[30ch] text-sm">
							Gerencie seus produtos e categorias
						</p>
					</Link>

					<Link
						href="/stock"
						className="group hover:bg-gray-100 hover:dark:bg-neutral-800/30 px-5 py-4 border hover:border-gray-300 hover:dark:border-neutral-700 border-transparent rounded-lg transition-colors"
					>
						<h2 className="mb-3 font-semibold text-2xl">
							Estoque{" "}
							<span className="inline-block motion-reduce:transform-none transition-transform group-hover:translate-x-1">
								-&gt;
							</span>
						</h2>
						<p className="opacity-50 m-0 max-w-[30ch] text-sm">
							Controle as entradas e saídas do estoque
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
