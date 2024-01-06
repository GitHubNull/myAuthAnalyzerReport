<template>
    <div class="flex align-items-center justify-content-start">
        <Button label="http代理原理图" icon="pi pi-external-link" @click="showTips(1)" />
        <Button label="burpsuite越权测试原理图" icon="pi pi-external-link" @click="showTips(2)" />
        <Button label="界面说明" icon="pi pi-external-link" @click="showTips(3)" />
        <Dialog v-model:visible="visible" maximizable modal :header="tipsHeader" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="top" :draggable="false">
                <div v-html="tipsText" ></div>
            <Image :src="tipsImgSrc" alt="Image" preview />
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);

const tipsHeader = ref('tipsHeader');
const tipsText = ref('tipsText');
const tipsImgSrc = ref('tipsImgSrc');


function showTips(id) {
    if (id == 1) {
        visible.value = true;
        tipsHeader.value = 'http代理原理图';
        tipsText.value = '<p>HTTP代理是一种网络服务，它充当客户端和服务器之间的中介。当客户端请求网络资源时，它不是直接连接到服务器，而是先连接到代理服务器。然后，代理服务器会代表客户端向目标服务器发出请求，并将服务器的响应返回给客户端。</p>';
        tipsImgSrc.value = './2.jpg';
    }
    else if (id == 2) {
        visible.value = true;
        tipsHeader.value = 'burpsuite越权测试原理图';
        tipsText.value = '<p>Burp Suite是一款广受信息安全专业人士推崇的综合性网络安全工具，它专门用于进行Web应用程序的安全测试。Burp Suite包含多种工具，其中最核心的是其HTTP代理功能，这使得它成为进行越权测试的理想工具。</p>' +
'<p>使用Burp Suite进行HTTP代理的过程涉及将浏览器或其他Web客户端配置为将所有HTTP和HTTPS请求通过Burp Suite的代理服务器发送。这样，所有进出的数据都会通过Burp Suite，允许用户检查、修改和调试交换的数据。通过这种方式，安全测试人员可以观察和操作客户端与Web应用程序之间的通信，寻找安全漏洞。</p>' +
'<p>越权测试是检查应用程序中授权控制的一种方法。在这种测试中，Burp Suite用于模拟或修改正常用户的请求，尝试访问不应该授权给该用户的功能或数据。例如，通过修改请求中的参数值，测试人员可以尝试以普通用户的身份访问仅管理员才能访问的功能。</p>' +
'<p>Burp Suite的用户界面提供了诸如历史记录查看器、请求编辑器和响应查看器等多种功能，这些都是进行越权测试时不可或缺的工具。除了HTTP代理功能外，Burp Suite还提供了自动扫描、爬行、破解等其他多种安全测试功能。</p>';
        tipsImgSrc.value = './3.jpg';
    }
    else if (id == 3) {
        visible.value = true;
        tipsHeader.value = '界面说明';
        tipsText.value = '<p>本项目使用了 vue3.0 + primeVue 编写, 左侧为报文列表，右侧为请求和响应报文内容。</p>';
        tipsImgSrc.value = './4.png';   
    }
}



</script>

<style scoped></style>