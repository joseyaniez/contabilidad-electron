<script>
    import Modal from "../../../Modal.svelte";

    let showModal = $state(false);

    function onClick() {
      showModal = true;
    }

</script>

<button
  class="bg-bacalao-primary h-9 rounded-full py px-4 text-white"
  onclick={onClick}
>
  Nuevo Cliente
</button>

<Modal bind:showModal>
  <div class="p-4">
    <form class="flex flex-col gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre</label>
        <input type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
        <input type="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Teléfono</label>
        <input type="tel" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      <div class="flex justify-end">
        <button type="submit" class="bg-bacalao-primary text-white px-4 py-2 rounded-full">Guardar Cliente</button>
      </div>
    </form>
  </div>
</Modal>
