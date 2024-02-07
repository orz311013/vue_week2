
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.14/vue.esm-browser.min.js';

const app = {
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'orzorzorz',
            products: [], //定義資料格式
            tempProduct: {}, //將products 放到tempProduct 暫存區 用於存取查看單一產品資料
        };
    },

    methods: {
        checkAdmin() {
            //驗證
            const url = `${this.apiUrl}/api/user/check`;
            axios
                .post(url)
                .then(() => {
                    this.getProducts();
                })
                .catch((err) => {
                    alert(err.response.data.message);
                    window.location = 'login.html';
                    //失敗會跳出訊息、跳轉回login.html頁面
                });
        },
        getProducts() {
            //取得產品方法
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios
                .get(url)
                .then((res) => {
                    this.products = res.data.products;
                    //成功，將api取的的資料重新賦予到this.products
                })
                .catch((err) => {
                    alert(err.response.data.message);
                });
        },
    },
    mounted() { //掛載
        // 取得 Token
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
        );
        axios.defaults.headers.common.Authorization = token;
        // 將token內容加到 headers裡
        // https://github.com/axios/axios?tab=readme-ov-file#-axiosheaders
        this.checkAdmin();
    },
};

createApp(app).mount('#app');
