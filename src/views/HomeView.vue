<script setup  lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n({ inheritLocale:true });

</script>
<template>
  <h1>{{ t('HomeView.title') }}</h1>
  <br/>
  {{ t('HomeView.body') }}
</template>