<template>
    <div class="control">
        <textarea v-model="itext" placeholder="変換元の文章を入力" class="textarea"></textarea>
        <button class="button" @click="throw_wiredify">変換</button>
        <textarea v-model="otext" class="textarea" readonly></textarea>
        <p>{{ itext }}</p>
    </div>
</template>


<script lang="ts">
import init, { wiredify } from "wiredify_lib";

onMounted(async () => {
  await init(); 
});

let inputtext: String = "aaa";
let outputtext: String = "";

const throw_wiredify = () => {
    inputtext = this.itext;
    outputtext = wiredify(inputtext);
    this.otext = outputtext;
}

</script>