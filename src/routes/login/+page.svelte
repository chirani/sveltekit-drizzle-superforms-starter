<svelte:head>
	<title>Lapis - Login</title>
</svelte:head>

<div class="mx-auto md:w-96">
	<form class="card bg-base-100 gap-3 p-3 shadow">
		<p class="mb-3 text-2xl font-bold uppercase">Login</p>
		<input type="text" placeholder="Email or Username" class="input input-bordered w-full" />
		<input type="password" placeholder="Password" class="input input-bordered w-full" />
		<button class="btn btn-primary">Login</button>
		<hr />
		<button class="btn btn-bordered">Google</button>
	</form>
	<p class="m-3 mt-6 text-right">
		Don't have an account <a href="/signup" class="link">Signup here</a>
	</p>
</div>
