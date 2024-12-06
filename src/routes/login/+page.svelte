<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="md:w-96 mx-auto">
	<form class="card bg-base-100 p-3 gap-3 shadow">
		<p class="font-bold text-2xl mb-3 uppercase">Login</p>
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
