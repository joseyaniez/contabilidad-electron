
<script lang="ts">
  let { title, content }: { title: string, content: Array<{value: string, name: string}>} = $props();
</script>

<div class="flex items-center gap-3">
  <label class="font-bold" for={"id-"+title}>{title}</label>
  <select class="min-w-40 border-2 border-bacalao-primary rounded-md p-1" id={"id-"+title}>
    <option value="">---</option>
    {#each content as c}
      <option value={c.value}>{c.name}</option>
    {/each}
  </select>
</div>

