<script>
  import { ContentSwitcher, Switch } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
</script>

<header>
  <ContentSwitcher selectedIndex={0}>
    <Switch text="Home" on:click={() => goto(`/`)} />
    <Switch text="About" on:click={() => goto(`/about`)} />
  </ContentSwitcher>
</header>
