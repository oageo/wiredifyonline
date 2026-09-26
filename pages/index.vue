<template>
    <div>
        <Woheader />
        <section class="container my-4">
                <div class="field">
                    <input type="text" v-model="itext" placeholder="変換元の文章を入力" class="input" />
                </div>
                <div class="field">
                    <input type="text" :value="otext" placeholder="変換後の文章がこちらに表示されます" readonly class="input" />
                </div>
        </section>
        <Wofooter />
    </div>
</template>


<script setup lang="ts">
import init, { wiredify } from "~/wiredify_lib/pkg/wiredify_lib.js";

const itext = ref("");
const ready = ref(false);

onMounted(async () => {
  await init();
  ready.value = true;
});

// init() 完了前に wiredify() を呼ぶと失敗するため、ready になるまでは変換しない
const otext = computed(() => ready.value ? wiredify(itext.value) : "");

</script>
