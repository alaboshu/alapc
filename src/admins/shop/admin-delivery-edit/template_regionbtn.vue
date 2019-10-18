<template>
  <div>
    <el-popover placement="right" trigger="hover" width="80" :disabled="!hasChildren">
      <zk-tempRegion :regions="region.children"></zk-tempRegion>
      <el-checkbox v-model="region.checked" :indeterminate="isIndeterminate" slot="reference" @change="change">{{region.name + (hasChildren?'>':'')}}</el-checkbox>
    </el-popover>
  </div>
</template>

<script>
  // import tempRegionList from './template_regionlist'
  export default {
    components: {
      // tempRegionList
    },
    methods: {
      change (value) {
        this.setChecked(this.region, this.region.checked)
      },
      setChecked (r, value) {
        if (r.children !== undefined) {
          r.children.forEach(c => {
            c.checked = value
            this.setChecked(c, value)
          })
        }
      }
    },
    watch: {
      allChildrenState: {
        immediate: true,
        handler (cur, old) {
          if (cur === true && this.region.checked !== true) {
            this.region.checked = true
          }
          if (cur === false && this.region.checked !== false) {
            this.region.checked = false
          }
        }
      }
    },
    computed: {
      hasChildren () {
        return this.region.children !== undefined && this.region.children !== null && this.region.children.length !== 0
      },
      allChildrenState () {
        var allTrue = true
        var allFalse = true
        if (!this.hasChildren) {
          return undefined
        }

        this.region.children.forEach(child => {
          if (child.checked) {
            allFalse = false
          }
          if (child.checked === undefined || !child.checked) {
            allTrue = false
          }
        })
        if (allTrue) {
          return true
        }
        if (allFalse) {
          return false
        }
        return undefined
      },
      isIndeterminate () {
        if (!this.hasChildren) {
          return false
        }
        var childCheck = this.region.children[0].checked
        for (var index in this.region.children) {
          if (childCheck !== this.region.children[index].checked) {
            return true
          }
        }
        return false
      }
    },
    props: {
      region: undefined
    }
  }
</script>
