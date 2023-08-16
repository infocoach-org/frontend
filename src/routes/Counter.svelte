<script lang="ts">
	import {NumberInput} from "carbon-components-svelte";
</script>

<div class="counter">
	<NumberInput
			label="Counter"
			value={0}
			helperText="Here you can increase or decrease the Number"
	/>
</div>
