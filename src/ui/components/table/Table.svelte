<script>
  let { content } = $props();
</script>

<table class="w-full rounded-lg rounded-collapse overflow-hidden">
  <thead class="bg-bacalao-secondary h-10">
    <tr class="m-4">
      {#each Object.keys(content[0]) as title}
        <th scope="col">{title}</th>
      {/each}
    </tr>
  </thead>
  <tbody class="divide-bacalao-secondary divide-y-2 border-b-bacalao-secondary">
    {#each content as row}
      <tr class="h-10 text-center ">
        {#each Object.values(row) as cell}
          <td>{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
