<script>
	import { ContentSwitcher, Switch } from "carbon-components-svelte";
	import { goto } from '$app/navigation';
</script>

<header>
	<ContentSwitcher selectedIndex={0}>
		<Switch text="Home" on:click={ () => goto(`/`, true) } />
		<Switch text="About" on:click={ () => goto(`/about`, true) } />
	</ContentSwitcher>
</header>