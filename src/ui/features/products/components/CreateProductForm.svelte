<script>
    import Button from "../../../components/Button.svelte";
    import InputNumber from "../../../components/form/InputNumber.svelte";
    import InputText from "../../../components/form/InputText.svelte";
    import InputTextArea from "../../../components/form/InputTextArea.svelte";

</script>

<form>
  <InputText title="Nombre" />
  <InputTextArea title="Description" />
  <InputNumber title="Precio" step="0.50"/>
  <InputNumber title="Stock" />
  <Button onclick={()=>{}}>Guardar</Button>
</form>
