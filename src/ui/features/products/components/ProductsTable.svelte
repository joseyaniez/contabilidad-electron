<script lang="ts">
    import type { Product } from "../../../../types/models/product";
  import DeleteIcon from "../../../assets/icons/deleteIcon.svelte";
  import EditIcon from "../../../assets/icons/EditIcon.svelte";

  let { products = $bindable() }: {products: Array<Product>} = $props();

  function deleteProduct(id: string){
    window.electronAPI.products.delete(id).then(() => {
      products = products.filter(product => product.id !== id);
    }).catch((err) => {
      console.error(err);
    });
  }

</script>

<table class="w-full my-2 rounded-lg rounded-collapse overflow-hidden text-sm">
  <thead class="bg-bacalao-secondary h-8">
    <tr class="m-4">
        <th class="w-30" scope="col"></th>
        <th scope="col">Código</th>
        <th scope="col">Descripción</th>
        <th scope="col">Unidad</th>
        <th scope="col">Precio</th>
        <th scope="col">Stock</th>
    </tr>
  </thead>
  <tbody class="divide-bacalao-secondary divide-y-2 border-b-bacalao-secondary">
    {#each products as product}
      <tr class="h-10 text-center">
        <td>
          <div>
            <button onclick={() => deleteProduct(product.id!)}><DeleteIcon/></button>
            <button><EditIcon/></button>
          </div>
        </td>
        <td>{product.id}</td>
        <td>{product.description}</td>
        <td>{product.unit}</td>
        <td>{product.price}</td>
        <td>
          {#if product.stock}
            Sí
          {:else}
            No
          {/if}
        </td>
      </tr>
    {/each}
    
  </tbody>
</table>

