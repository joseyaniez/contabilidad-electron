<script>
    import Button from "../../../Button.svelte";
    import Modal from "../../../Modal.svelte";
    import Title from "../../../Title.svelte";
    import InputText from "../../InputText.svelte";

    let showModal = $state(false);

    let client = $state({
      dni: "",
      ruc: "",
      name: "",
      address: ""
    });

    function onClick() {
      showModal = true;
    }

    function onSaveClient() {
      const cleanClient = {
        dni: client.dni,
        ruc: client.ruc,
        name: client.name,
        address: client.address
      };
      window.electronAPI.clients.create(cleanClient)
        .then((resp) => {
          console.log("Client created:", resp);
        })
        .catch((err) => {
          console.error("Error creating client:", err);
        }).finally(() => {
          client = { dni: "", ruc: "", name: "", address: "" }; // reset client
          showModal = false;
        });
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
    <Title>Nuevo Cliente</Title>
    <div>
      <div class="mb-4 mt-2">
        <InputText title="DNI" bind:value={client.dni} />
      </div>
      <div class="mb-4">
        <InputText title={`RUC ${client.ruc.length > 0 ? '(requiere dirección)': ''}`} bind:value={client.ruc} />
      </div>
      <div class="mb-4">
        <InputText title="Nombre" bind:value={client.name} />
      </div>
      {#if client.ruc.length > 0}
        <div>
          <InputText title="Dirección" bind:value={client.address} />
        </div>
      {/if}
      <div class="flex justify-end mt-2">
        <Button onclick={ onSaveClient }>Guardar</Button>
      </div>
    </div>
  </div>
</Modal>
