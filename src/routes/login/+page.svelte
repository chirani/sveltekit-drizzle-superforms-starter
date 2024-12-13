<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms';

	export let data;
	const { form, errors, message } = superForm(data.form);
</script>

<svelte:head>
	<title>Lapis - Login</title>
</svelte:head>

<div class="mx-auto md:w-96">
	<form class="card gap-1.5 bg-base-100 p-3 shadow" method="POST" use:enhance>
		<p class="mb-3 text-2xl font-bold uppercase">Login</p>
		<input
			name="usernameOrEmail"
			type="text"
			placeholder="Email or Username"
			class="input input-bordered w-full"
			bind:value={$form.usernameOrEmail}
		/>
		<small class="text-error">{$errors.usernameOrEmail}</small>
		<input
			name="password"
			type="password"
			placeholder="Password"
			class="input input-bordered w-full"
			bind:value={$form.password}
		/>
		<small class="text-error">{$errors.password}</small>
		<button class="btn btn-primary">Login</button>
		<hr />
		<button class="btn-bordered btn">Google</button>
	</form>
	<p class="text-l mt-6 text-error">{$message}</p>
	<p class="m-3 mt-6 text-right">
		Don't have an account <a href="/signup" class="link">Signup here</a>
	</p>
</div>
