<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms';

	export let data;
	const { form, errors, message } = superForm(data.form);
</script>

<svelte:head>
	<title>Lapis - Sign up</title>
</svelte:head>

<div class="mx-3 md:mx-auto md:w-96">
	<form class="card gap-1.5 bg-base-100 p-3 shadow" method="POST" use:enhance>
		<p class="mb-3 text-2xl font-bold uppercase">Signup</p>
		<input
			type="text"
			name="username"
			placeholder="Username"
			class="input input-bordered w-full"
			bind:value={$form.username}
		/>
		<small class="text-error">{$errors.username}</small>
		<input
			type="text"
			name="email"
			placeholder="Email"
			class="input input-bordered w-full"
			bind:value={$form.email}
		/>
		<small class="text-error">{$errors.email}</small>
		<input
			name="password"
			type="password"
			placeholder="Password"
			class="input input-bordered w-full"
			bind:value={$form.password}
		/>
		<small class="text-error">{$errors.password}</small>
		<input
			name="retypePassword"
			type="password"
			placeholder="Retype Password"
			class="input input-bordered w-full"
			bind:value={$form.retypePassword}
		/>
		<small class="text-error">{$errors.retypePassword}</small>
		<button class="btn btn-primary uppercase"> Signup </button>
		<hr />
		<button class="btn-bordered btn">Google</button>
	</form>
	<p class="text-l mt-6 text-error">{$message}</p>
	<p class="m-3 mt-6 text-right">
		Already have an account <a href="/login" class="link">Login here</a>
	</p>
</div>
