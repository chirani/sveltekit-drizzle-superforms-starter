<script lang="ts">
	import Header from '../comps/Header/Header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Header />
<main class="mt-6 sm:min-w-[200px] md:mx-auto lg:w-[1100px]">{@render children()}</main>
