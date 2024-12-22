<script>
	let { isLogged } = $props();
</script>

<nav class="navbar border-b-2 bg-base-100">
	<div class="mx-auto flex w-[1200px] flex-row justify-between">
		<a href="/"
			><div class="btn btn-ghost text-xl">
				<span class="font-bold text-secondary">LAPI5</span>
			</div></a
		>
		<div class="flex flex-row gap-3">
			<a href="/signup">
				<button class="btn btn-outline btn-neutral">Signup</button></a
			>
			<a href="/login"><button class="btn btn-neutral">Login</button></a>
		</div>
	</div>
</nav>
