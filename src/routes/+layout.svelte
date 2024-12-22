<script lang="ts">
	import Header from '../comps/Header/Header.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	const { isLogged } = data;
</script>

<Header isLogged />
<main class="mt-6 sm:min-w-[200px] md:mx-auto lg:w-[1100px]">
	{@render children()}
</main>
