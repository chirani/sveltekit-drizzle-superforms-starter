<svelte:head>
	<title>Sign up</title>
</svelte:head>

<div class="md:w-96 mx-auto">
	<form class="card bg-base-100 p-3 gap-3 shadow">
		<p class="font-bold text-2xl mb-3 uppercase">Signup</p>
		<input type="text" placeholder="Username" class="input input-bordered w-full" />
		<input type="text" placeholder="Email" class="input input-bordered w-full" />
		<input type="text" placeholder="Phone Number" class="input input-bordered w-full" />
		<input type="password" placeholder="Password" class="input input-bordered w-full" />
		<button class="btn btn-primary uppercase">Signup</button>
		<hr />
		<button class="btn btn-bordered">Google</button>
	</form>
	<p class="m-3 mt-6 text-right">
		Already have an account <a href="/login" class="link">Login here</a>
	</p>
</div>
