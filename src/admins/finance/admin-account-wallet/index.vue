 <template>
  <x-border title="我的钱包" color="brand" icon="flaticon-bag">
    <div class="account-wallet">
      <div class="account-card">
        <ul>
          <li v-for="(item,index) in viewModel.accountList" :key="index">
            <p class="p1">{{item.amount}}</p>
            <p class="p2">冻结：{{item.freezeAmount}}</p>
            <p class="p3">{{item.moneyName}}</p>
          </li>
        </ul>
      </div>
    </div>
  </x-border>
</template>
 <script>
  export default {
    data () {
      return {
        viewModel: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        var paras = {
          id: this.$user.id()
        }
        var repone = await this.$api.httpGet('/Api/Account/DetailEdit', paras)
        if (repone.status !== 1) {
          this.$api.toastWarn(repone.messgae)
          return
        }
        this.viewModel = repone.result
      }
    }
  }
 </script>
 
 <style rel="stylesheet/scss" lang="scss">
  @import "./style.scss";
</style>
 
