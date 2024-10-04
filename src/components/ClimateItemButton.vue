<script setup>
const props = defineProps({
  climateItem: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <button
    :style="{
      backgroundImage: `url(${climateItem.background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
    class="items-btn"
  >
    <p class="button-name">
      {{ climateItem.name }}
    </p>
  </button>
</template>

<style lang="scss" scoped>
.items-btn {
  width: 200px;
  height: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(#797979, 0.7);

  .button-name {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
  }
}

@media screen and (min-width: 768px) {
  .items-btn {
    width: 300px;
    padding: 40px;
  }
}
@media screen and (min-width: 1024px) {
  .items-btn {
    width: 180px;
    &:hover {
      cursor: pointer;
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
