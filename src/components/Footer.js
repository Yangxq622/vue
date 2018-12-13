import template from "../html/Footer.html";
import "../style/Footer.less";

export let Footer = {
    template,
    methods: {
        open() {
            this.$alert('感谢您对我们提出的宝贵意见', '用户提示', {
                confirmButtonText: '确定',
            });
        }
    }
}