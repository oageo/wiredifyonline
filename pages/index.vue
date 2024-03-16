<template>
    <div>
        <Woheader />
        <section class="container my-4">
                <div class="field">
                    <input type="text" v-model="itext" placeholder="変換元の文章を入力" class="input" />
                </div>
                <div class="field">
                    <button class="button is-primary is-fullwidth" @click="throw_wiredify">変換</button>
                </div>
                <div class="field">
                    <input type="text" v-model="otext" placeholder="変換後の文章がこちらに表示されます" readonly class="input" />
                </div>
        </section>
        <Wofooter />
    </div>
</template>


<script setup lang="ts">
import init, { wiredify } from "wiredify_lib";

onMounted(async () => {
  await init(); 
});

let itext: String, otext: String;
let inputtext: String = "";
let outputtext: String = "";

const throw_wiredify = () => {
    inputtext = itext.value;
    outputtext = wiredify(inputtext);
    otext.value = outputtext;
}

</script>