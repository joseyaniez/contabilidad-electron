<script lang="ts">
  let clientText = $state("");
  
  function onKeyPress(event: KeyboardEvent) {
    console.log("Key pressed:", event.key);
    window.electronAPI.clients.find(clientText, clientText, clientText)
      .then((result: any) => {
        console.log("Search result:", result);
      })
      .catch((error: any) => {
        console.error("Error during client search:", error);
      });
  }
</script>

<div class="flex flex-col relative flex-1">
  <label class="font-bold pb-1" for="client-input">Cliente</label>
  <input onkeydowncapture={onKeyPress} bind:value={clientText} class="px-4 py-1 relative z-20 bg-white  border-2 border-bacalao-secondary border-solid rounded-xl"  type="text" id="client-input"/>
  <div class="absolute w-5/6 top-16 bg-white left-2">
    <div class="p-2 border-x border-b rounded-b-xl border-bacalao-secondary flex flex-col">
      <button onclick={() => {}} class="px-2 py-1 text-left rounded-md hover:bg-indigo-50">Ejemplo 1</button>
      <button onclick={() => {}} class="px-2 py-1 text-left rounded-md hover:bg-indigo-50">Ejemplo 1</button>
      <button onclick={() => {}} class="px-2 py-1 text-left rounded-md hover:bg-indigo-50">Ejemplo 1</button>
      <button onclick={() => {}} class="px-2 py-1 text-left rounded-md hover:bg-indigo-50">Ejemplo 1</button>
      <button onclick={() => {}} class="px-2 py-1 text-left rounded-md hover:bg-indigo-50">Ejemplo 1</button>
    </div>
  </div>
</div>
