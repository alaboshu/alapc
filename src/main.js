import Vue from 'vue'
import App from './App'
import router from '@/service/router'
import store from '@/service/store/index'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import GlobalUtils from '@/service/prototypes/prototype'
import VueLazyload from 'vue-lazyload'
import mavonEditor from 'mavon-editor'

import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/element-variables.scss'
import '@/assets/style/pc/index.scss'
import '@/assets/style/iconfont.css'
import '@/assets/style/flaticon/css/flaticon.css'
import '@/assets/style/iconall/css/iconfount.css'

import zkGroupbuy from '@/components/activitys/zk-groupbuy/index.vue'
import zkAritcleDetail from '@/components/articles/zk-aritcle-detail/index.vue'
import zkAriticleImageList from '@/components/articles/zk-ariticle-image-list/index.vue'
import zkArticle from '@/components/articles/zk-article/index.vue'
import zkHelpRow from '@/components/articles/zk-help-row/index.vue'
import zkHelp from '@/components/articles/zk-help/index.vue'
import zkMarquee from '@/components/articles/zk-marquee/index.vue'
import zkNewsItem from '@/components/articles/zk-news-item/index.vue'
import zkNewsList from '@/components/articles/zk-news-list/index.vue'
import zkNewsNav from '@/components/articles/zk-news-nav/index.vue'
import zkNewsProduct from '@/components/articles/zk-news-product/index.vue'
import zkNewsRec from '@/components/articles/zk-news-rec/index.vue'
import zkNewsShow from '@/components/articles/zk-news-show/index.vue'
import zkBacktop from '@/components/common/zk-backtop/index.vue'
import zkClear from '@/components/common/zk-clear/index.vue'
import zkLogo from '@/components/common/zk-logo/index.vue'
import zkNav from '@/components/common/zk-nav/index.vue'
import zkPay from '@/components/common/zk-pay/index.vue'
import zkProgress from '@/components/common/zk-progress/index.vue'
import zkTopNav from '@/components/common/zk-top-nav/index.vue'
import zkDataHiding from '@/components/data/zk-data-hiding/index.vue'
import zkDataInfo from '@/components/data/zk-data-info/index.vue'
import zkDataList from '@/components/data/zk-data-list/index.vue'
import zkDataMember from '@/components/data/zk-data-member/index.vue'
import zkDataOption from '@/components/data/zk-data-option/index.vue'
import zkDataPackages from '@/components/data/zk-data-packages/index.vue'
import zkDataSmall from '@/components/data/zk-data-small/index.vue'
import zkAmount from '@/components/finance/zk-amount/index.vue'
import zkBuy from '@/components/order/zk-buy/index.vue'
import zkCart from '@/components/order/zk-cart/index.vue'
import zkOrderList from '@/components/order/zk-order-list/index.vue'
import zkOrderRate from '@/components/order/zk-order-rate/index.vue'
import zkOrderShow from '@/components/order/zk-order-show/index.vue'
import zkPreferList from '@/components/product/zk-prefer-list/index.vue'
import zkProductAdvertisement from '@/components/product/zk-product-advertisement/index.vue'
import zkProductArrival from '@/components/product/zk-product-arrival/index.vue'
import zkProductBrand from '@/components/product/zk-product-brand/index.vue'
import zkProductBrandhead from '@/components/product/zk-product-brandhead/index.vue'
import zkProductBrandlist from '@/components/product/zk-product-brandlist/index.vue'
import zkProductClass from '@/components/product/zk-product-class/index.vue'
import zkProductCustomerService from '@/components/product/zk-product-customer-service/index.vue'
import zkProductData from '@/components/product/zk-product-data/index.vue'
import zkProductEspeciallyhead from '@/components/product/zk-product-especiallyhead/index.vue'
import zkProductFavorite from '@/components/product/zk-product-favorite/index.vue'
import zkProductFlashsale from '@/components/product/zk-product-flashsale/index.vue'
import zkProductFoot from '@/components/product/zk-product-foot/index.vue'
import zkProductGoods from '@/components/product/zk-product-goods/index.vue'
import zkProductHead from '@/components/product/zk-product-head/index.vue'
import zkProductHeadline from '@/components/product/zk-product-headline/index.vue'
import zkProductImagelist from '@/components/product/zk-product-imagelist/index.vue'
import zkProductItem from '@/components/product/zk-product-item/index.vue'
import zkProductLinks from '@/components/product/zk-product-links/index.vue'
import zkProductList from '@/components/product/zk-product-list/index.vue'
import zkProductListitem from '@/components/product/zk-product-listitem/index.vue'
import zkProductListpage from '@/components/product/zk-product-listpage/index.vue'
import zkProductLogin from '@/components/product/zk-product-login/index.vue'
import zkProductMustsee from '@/components/product/zk-product-mustsee/index.vue'
import zkProductNav from '@/components/product/zk-product-nav/index.vue'
import zkProductRecommend from '@/components/product/zk-product-recommend/index.vue'
import zkProductReg from '@/components/product/zk-product-reg/index.vue'
import zkProductScreening from '@/components/product/zk-product-screening/index.vue'
import zkProductSelecthead from '@/components/product/zk-product-selecthead/index.vue'
import zkProductSelection from '@/components/product/zk-product-selection/index.vue'
import zkProductShowpage from '@/components/product/zk-product-showpage/index.vue'
import zkProductShuffling from '@/components/product/zk-product-shuffling/index.vue'
import zkProductStorecat from '@/components/product/zk-product-storecat/index.vue'
import zkProductSuperior from '@/components/product/zk-product-superior/index.vue'
import zkProductSwiper from '@/components/product/zk-product-swiper/index.vue'
import zkProductSwiperitem from '@/components/product/zk-product-swiperitem/index.vue'
import zkProductTemplate from '@/components/product/zk-product-template/index.vue'
import zkProductTop from '@/components/product/zk-product-top/index.vue'
import zkProductTypeNav from '@/components/product/zk-product-type-nav/index.vue'
import zkProductclassItem from '@/components/product/zk-productclass-item/index.vue'
import zkTemplateSave from '@/components/product/zk-template-save/index.vue'
import zkBorderDate from '@/components/reports/zk-border-date/index.vue'
import zkCountReport from '@/components/reports/zk-count-report/index.vue'
import zkCountTable from '@/components/reports/zk-count-table/index.vue'
import zkReportChart from '@/components/reports/zk-report-chart/index.vue'
import zkReportData from '@/components/reports/zk-report-data/index.vue'
import zkReportDate from '@/components/reports/zk-report-date/index.vue'
import zkSingleReport from '@/components/reports/zk-single-report/index.vue'
import zkSumReport from '@/components/reports/zk-sum-report/index.vue'
import zkSumTable from '@/components/reports/zk-sum-table/index.vue'
import zkAddress from '@/components/themes/zk-address/index.vue'
import zkAudio from '@/components/themes/zk-audio/index.vue'
import zkAutoDialog from '@/components/themes/zk-auto-dialog/index.vue'
import zkAutoForm from '@/components/themes/zk-auto-form/index.vue'
import zkAvatar from '@/components/themes/zk-avatar/index.vue'
import zkBuyAddress from '@/components/themes/zk-buy-address/index.vue'
import zkCard from '@/components/themes/zk-card/index.vue'
import zkCell from '@/components/themes/zk-cell/index.vue'
import zkCountdown from '@/components/themes/zk-countdown/index.vue'
import zkDialog from '@/components/themes/zk-dialog/index.vue'
import zkFileImage from '@/components/themes/zk-file-image/index.vue'
import zkFoot from '@/components/themes/zk-foot/index.vue'
import zkGridList from '@/components/themes/zk-grid-list/index.vue'
import zkGrid from '@/components/themes/zk-grid/index.vue'
import zkHead from '@/components/themes/zk-head/index.vue'
import zkHtml from '@/components/themes/zk-html/index.vue'
import zkIconAd from '@/components/themes/zk-icon-ad/index.vue'
import zkIconList from '@/components/themes/zk-icon-list/index.vue'
import zkImageList from '@/components/themes/zk-image-list/index.vue'
import zkImage from '@/components/themes/zk-image/index.vue'
import zkKeyword from '@/components/themes/zk-keyword/index.vue'
import zkList from '@/components/themes/zk-list/index.vue'
import zkManagement from '@/components/themes/zk-management/index.vue'
import zkMask from '@/components/themes/zk-mask/index.vue'
import zkNodata from '@/components/themes/zk-nodata/index.vue'
import zkNotice from '@/components/themes/zk-notice/index.vue'
import zkPopup from '@/components/themes/zk-popup/index.vue'
import zkPreview from '@/components/themes/zk-preview/index.vue'
import zkQrcodeList from '@/components/themes/zk-qrcode-list/index.vue'
import zkQuickAction from '@/components/themes/zk-quick-action/index.vue'
import zkRankReport from '@/components/themes/zk-rank-report/index.vue'
import zkReportEdit from '@/components/themes/zk-report-edit/index.vue'
import zkReports from '@/components/themes/zk-reports/index.vue'
import zkResult from '@/components/themes/zk-result/index.vue'
import zkRightbar from '@/components/themes/zk-rightbar/index.vue'
import zkSearch from '@/components/themes/zk-search/index.vue'
import zkSwiperNav from '@/components/themes/zk-swiper-nav/index.vue'
import zkSwiper from '@/components/themes/zk-swiper/index.vue'
import zkTab from '@/components/themes/zk-tab/index.vue'
import zkTableList from '@/components/themes/zk-table-list/index.vue'
import zkTableVideoList from '@/components/themes/zk-table-video-list/index.vue'
import zkTable from '@/components/themes/zk-table/index.vue'
import zkTempRegion from '@/components/themes/zk-tempRegion/index.vue'
import zkText from '@/components/themes/zk-text/index.vue'
import zkTitle from '@/components/themes/zk-title/index.vue'
import zkTop from '@/components/themes/zk-top/index.vue'
import zkTreetable from '@/components/themes/zk-treetable/index.vue'
import zkVideo from '@/components/themes/zk-video/index.vue'
import zkAddressEdit from '@/components/user/zk-address-edit/index.vue'
import zkHeadUser from '@/components/user/zk-head-user/index.vue'
import zkLoginMobile from '@/components/user/zk-login-mobile/index.vue'
import zkPclogin from '@/components/user/zk-pclogin/index.vue'
import zkPcloginout from '@/components/user/zk-pcloginout/index.vue'
import zkPcreg from '@/components/user/zk-pcreg/index.vue'
import zkQrcode from '@/components/user/zk-qrcode/index.vue'
import zkUserAddress from '@/components/user/zk-user-address/index.vue'
import zkUserBase from '@/components/user/zk-user-base/index.vue'
import zkUserNav from '@/components/user/zk-user-nav/index.vue'
import zkUserView from '@/components/user/zk-user-view/index.vue'
import zkUsersIndex from '@/components/user/zk-users-index/index.vue'
import xBadge from '@/elements/x-badge/index.vue'
import xBorder from '@/elements/x-border/index.vue'
import xCheckbox from '@/elements/x-checkbox/index.vue'
import xCityPicker from '@/elements/x-city-picker/index.vue'
import xClass from '@/elements/x-class/index.vue'
import xClear from '@/elements/x-clear/index.vue'
import xCode from '@/elements/x-code/index.vue'
import xCol from '@/elements/x-col/index.vue'
import xDataSelect from '@/elements/x-data-select/index.vue'
import xEditor from '@/elements/x-editor/index.vue'
import xEnum from '@/elements/x-enum/index.vue'
import xFormSelect from '@/elements/x-form-select/index.vue'
import xIcon from '@/elements/x-icon/index.vue'
import xImage from '@/elements/x-image/index.vue'
import xJson from '@/elements/x-json/index.vue'
import xLabel from '@/elements/x-label/index.vue'
import xLine from '@/elements/x-line/index.vue'
import xMarkdown from '@/elements/x-markdown/index.vue'
import xQrcode from '@/elements/x-qrcode/index.vue'
import xRadioGroup from '@/elements/x-radio-group/index.vue'
import xRadio from '@/elements/x-radio/index.vue'
import xRow from '@/elements/x-row/index.vue'
import xSelectImage from '@/elements/x-select-image/index.vue'
import xSelectMutile from '@/elements/x-select-mutile/index.vue'
import xSelect from '@/elements/x-select/index.vue'
import xTab from '@/elements/x-tab/index.vue'
import xTable from '@/elements/x-table/index.vue'
import search from '@/elements/x-table/search/index.vue'
import xTabs from '@/elements/x-tabs/index.vue'
import xTags from '@/elements/x-tags/index.vue'
import xUeditor from '@/elements/x-ueditor/index.vue'
import xUploadFile from '@/elements/x-upload-file/index.vue'
import xUploadList from '@/elements/x-upload-list/index.vue'
import xUpload from '@/elements/x-upload/index.vue'
import xWidget from '@/elements/x-widget/index.vue'
import adminActivitySet from '@/admins/activity/admin-activity-set/index.vue'
import adminAppPublish from '@/admins/admin/admin-app-publish/index.vue'
import adminLayout from '@/admins/admin/admin-layout/index.vue'
import adminMessage from '@/admins/admin/admin-message/index.vue'
import adminSmartHand from '@/admins/admin/admin-smart-hand/index.vue'
import adminUserTree from '@/admins/admin/admin-user-tree/index.vue'
import adminAutoAction from '@/admins/auto/admin-auto-action/index.vue'
import adminAutoArticle from '@/admins/auto/admin-auto-article/index.vue'
import adminAutoClass from '@/admins/auto/admin-auto-class/index.vue'
import adminAutoFaq from '@/admins/auto/admin-auto-faq/index.vue'
import adminAutoForm from '@/admins/auto/admin-auto-form/index.vue'
import adminAutoImage from '@/admins/auto/admin-auto-image/index.vue'
import adminAutoIndex from '@/admins/auto/admin-auto-index/index.vue'
import adminAutoIntro from '@/admins/auto/admin-auto-intro/index.vue'
import adminAutoNews from '@/admins/auto/admin-auto-news/index.vue'
import adminAutoPreview from '@/admins/auto/admin-auto-preview/index.vue'
import adminAutoReport from '@/admins/auto/admin-auto-report/index.vue'
import adminAutoTable from '@/admins/auto/admin-auto-table/index.vue'
import adminAutoTag from '@/admins/auto/admin-auto-tag/index.vue'
import adminAutoTask from '@/admins/auto/admin-auto-task/index.vue'
import adminAutoVideo from '@/admins/auto/admin-auto-video/index.vue'
import adminAutoconfigForm from '@/admins/auto/admin-autoconfig-form/index.vue'
import adminAutoconfigList from '@/admins/auto/admin-autoconfig-list/index.vue'
import adminLightappForm from '@/admins/auto/admin-lightapp-form/index.vue'
import adminLightappTable from '@/admins/auto/admin-lightapp-table/index.vue'
import autoAutoconfigList from '@/admins/auto/auto-autoconfig-list/index.vue'
import adminCmsForm from '@/admins/cms/admin-cms-form/index.vue'
import adminCmsList from '@/admins/cms/admin-cms-list/index.vue'
import adminLoginLight from '@/admins/common/admin-login-light/index.vue'
import adminLogin from '@/admins/common/admin-login/index.vue'
import adminRelationClass from '@/admins/common/admin-relation-class/index.vue'
import adminRelationTag from '@/admins/common/admin-relation-tag/index.vue'
import adminTaskAction from '@/admins/common/admin-task-action/index.vue'
import adminCouponEdit from '@/admins/coupon/admin-coupon-edit/index.vue'
import adminCouponSend from '@/admins/coupon/admin-coupon-send/index.vue'
import adminAccountEdit from '@/admins/finance/admin-account-edit/index.vue'
import adminAccountRecharge from '@/admins/finance/admin-account-recharge/index.vue'
import adminAccountWallet from '@/admins/finance/admin-account-wallet/index.vue'
import adminStoredEdit from '@/admins/finance/admin-stored-edit/index.vue'
import adminStoredValue from '@/admins/finance/admin-stored-value/index.vue'
import adminHudongEdit from '@/admins/hudong/admin-hudong-edit/index.vue'
import adminMerchantOrderedit from '@/admins/merchant/admin-merchant-orderedit/index.vue'
import adminMerchantOrderlist from '@/admins/merchant/admin-merchant-orderlist/index.vue'
import adminMerchantProduct from '@/admins/merchant/admin-merchant-product/index.vue'
import adminRewardAdd from '@/admins/share/admin-reward-add/index.vue'
import adminRewardEdit from '@/admins/share/admin-reward-edit/index.vue'
import adminRewardModules from '@/admins/share/admin-reward-modules/index.vue'
import adminRewardSidebar from '@/admins/share/admin-reward-sidebar/index.vue'
import adminActivityProduct from '@/admins/shop/admin-activity-product/index.vue'
import adminCategoryEdit from '@/admins/shop/admin-category-edit/index.vue'
import adminDeliveryEdit from '@/admins/shop/admin-delivery-edit/index.vue'
import adminDeliveryTemplate from '@/admins/shop/admin-delivery-template/index.vue'
import adminMallOrder from '@/admins/shop/admin-mall-order/index.vue'
import adminMallgoodsEdit from '@/admins/shop/admin-mallgoods-edit/index.vue'
import adminOrderEdit from '@/admins/shop/admin-order-edit/index.vue'
import adminOrderList from '@/admins/shop/admin-order-list/index.vue'
import adminOrderTenantEdit from '@/admins/shop/admin-order-tenant-edit/index.vue'
import adminOrderTenantList from '@/admins/shop/admin-order-tenant-list/index.vue'
import adminProductEdit from '@/admins/shop/admin-product-edit/index.vue'
import adminProductLine from '@/admins/shop/admin-product-line/index.vue'
import adminProductList from '@/admins/shop/admin-product-list/index.vue'
import adminSmsRecharge from '@/admins/sms/admin-sms-recharge/index.vue'
import adminSmsSend from '@/admins/sms/admin-sms-send/index.vue'
import adminSmsSendgroup from '@/admins/sms/admin-sms-sendgroup/index.vue'
import adminStoreSettings from '@/admins/store/admin-store-settings/index.vue'
import adminSupplierEdit from '@/admins/store/admin-supplier-edit/index.vue'
import adminSupplierEidt from '@/admins/store/admin-supplier-eidt/index.vue'
import adminSupplierOrder from '@/admins/store/admin-supplier-order/index.vue'
import adminCmuserEdit from '@/admins/user/admin-cmuser-edit/index.vue'
import adminRoleEdit from '@/admins/user/admin-role-edit/index.vue'
import adminRoleOpen from '@/admins/user/admin-role-open/index.vue'
import adminUserEdit from '@/admins/user/admin-user-edit/index.vue'
import adminUserView from '@/admins/user/admin-user-view/index.vue'
Vue.component('zk-groupbuy', zkGroupbuy)
Vue.component('zk-aritcle-detail', zkAritcleDetail)
Vue.component('zk-ariticle-image-list', zkAriticleImageList)
Vue.component('zk-article', zkArticle)
Vue.component('zk-help-row', zkHelpRow)
Vue.component('zk-help', zkHelp)
Vue.component('zk-marquee', zkMarquee)
Vue.component('zk-news-item', zkNewsItem)
Vue.component('zk-news-list', zkNewsList)
Vue.component('zk-news-nav', zkNewsNav)
Vue.component('zk-news-product', zkNewsProduct)
Vue.component('zk-news-rec', zkNewsRec)
Vue.component('zk-news-show', zkNewsShow)
Vue.component('zk-backtop', zkBacktop)
Vue.component('zk-clear', zkClear)
Vue.component('zk-logo', zkLogo)
Vue.component('zk-nav', zkNav)
Vue.component('zk-pay', zkPay)
Vue.component('zk-progress', zkProgress)
Vue.component('zk-top-nav', zkTopNav)
Vue.component('zk-data-hiding', zkDataHiding)
Vue.component('zk-data-info', zkDataInfo)
Vue.component('zk-data-list', zkDataList)
Vue.component('zk-data-member', zkDataMember)
Vue.component('zk-data-option', zkDataOption)
Vue.component('zk-data-packages', zkDataPackages)
Vue.component('zk-data-small', zkDataSmall)
Vue.component('zk-amount', zkAmount)
Vue.component('zk-buy', zkBuy)
Vue.component('zk-cart', zkCart)
Vue.component('zk-order-list', zkOrderList)
Vue.component('zk-order-rate', zkOrderRate)
Vue.component('zk-order-show', zkOrderShow)
Vue.component('zk-prefer-list', zkPreferList)
Vue.component('zk-product-advertisement', zkProductAdvertisement)
Vue.component('zk-product-arrival', zkProductArrival)
Vue.component('zk-product-brand', zkProductBrand)
Vue.component('zk-product-brandhead', zkProductBrandhead)
Vue.component('zk-product-brandlist', zkProductBrandlist)
Vue.component('zk-product-class', zkProductClass)
Vue.component('zk-product-customer-service', zkProductCustomerService)
Vue.component('zk-product-data', zkProductData)
Vue.component('zk-product-especiallyhead', zkProductEspeciallyhead)
Vue.component('zk-product-favorite', zkProductFavorite)
Vue.component('zk-product-flashsale', zkProductFlashsale)
Vue.component('zk-product-foot', zkProductFoot)
Vue.component('zk-product-goods', zkProductGoods)
Vue.component('zk-product-head', zkProductHead)
Vue.component('zk-product-headline', zkProductHeadline)
Vue.component('zk-product-imagelist', zkProductImagelist)
Vue.component('zk-product-item', zkProductItem)
Vue.component('zk-product-links', zkProductLinks)
Vue.component('zk-product-list', zkProductList)
Vue.component('zk-product-listitem', zkProductListitem)
Vue.component('zk-product-listpage', zkProductListpage)
Vue.component('zk-product-login', zkProductLogin)
Vue.component('zk-product-mustsee', zkProductMustsee)
Vue.component('zk-product-nav', zkProductNav)
Vue.component('zk-product-recommend', zkProductRecommend)
Vue.component('zk-product-reg', zkProductReg)
Vue.component('zk-product-screening', zkProductScreening)
Vue.component('zk-product-selecthead', zkProductSelecthead)
Vue.component('zk-product-selection', zkProductSelection)
Vue.component('zk-product-showpage', zkProductShowpage)
Vue.component('zk-product-shuffling', zkProductShuffling)
Vue.component('zk-product-storecat', zkProductStorecat)
Vue.component('zk-product-superior', zkProductSuperior)
Vue.component('zk-product-swiper', zkProductSwiper)
Vue.component('zk-product-swiperitem', zkProductSwiperitem)
Vue.component('zk-product-template', zkProductTemplate)
Vue.component('zk-product-top', zkProductTop)
Vue.component('zk-product-type-nav', zkProductTypeNav)
Vue.component('zk-productclass-item', zkProductclassItem)
Vue.component('zk-template-save', zkTemplateSave)
Vue.component('zk-border-date', zkBorderDate)
Vue.component('zk-count-report', zkCountReport)
Vue.component('zk-count-table', zkCountTable)
Vue.component('zk-report-chart', zkReportChart)
Vue.component('zk-report-data', zkReportData)
Vue.component('zk-report-date', zkReportDate)
Vue.component('zk-single-report', zkSingleReport)
Vue.component('zk-sum-report', zkSumReport)
Vue.component('zk-sum-table', zkSumTable)
Vue.component('zk-address', zkAddress)
Vue.component('zk-audio', zkAudio)
Vue.component('zk-auto-dialog', zkAutoDialog)
Vue.component('zk-auto-form', zkAutoForm)
Vue.component('zk-avatar', zkAvatar)
Vue.component('zk-buy-address', zkBuyAddress)
Vue.component('zk-card', zkCard)
Vue.component('zk-cell', zkCell)
Vue.component('zk-countdown', zkCountdown)
Vue.component('zk-dialog', zkDialog)
Vue.component('zk-file-image', zkFileImage)
Vue.component('zk-foot', zkFoot)
Vue.component('zk-grid-list', zkGridList)
Vue.component('zk-grid', zkGrid)
Vue.component('zk-head', zkHead)
Vue.component('zk-html', zkHtml)
Vue.component('zk-icon-ad', zkIconAd)
Vue.component('zk-icon-list', zkIconList)
Vue.component('zk-image-list', zkImageList)
Vue.component('zk-image', zkImage)
Vue.component('zk-keyword', zkKeyword)
Vue.component('zk-list', zkList)
Vue.component('zk-management', zkManagement)
Vue.component('zk-mask', zkMask)
Vue.component('zk-nodata', zkNodata)
Vue.component('zk-notice', zkNotice)
Vue.component('zk-popup', zkPopup)
Vue.component('zk-preview', zkPreview)
Vue.component('zk-qrcode-list', zkQrcodeList)
Vue.component('zk-quick-action', zkQuickAction)
Vue.component('zk-rank-report', zkRankReport)
Vue.component('zk-report-edit', zkReportEdit)
Vue.component('zk-reports', zkReports)
Vue.component('zk-result', zkResult)
Vue.component('zk-rightbar', zkRightbar)
Vue.component('zk-search', zkSearch)
Vue.component('zk-swiper-nav', zkSwiperNav)
Vue.component('zk-swiper', zkSwiper)
Vue.component('zk-tab', zkTab)
Vue.component('zk-table-list', zkTableList)
Vue.component('zk-table-video-list', zkTableVideoList)
Vue.component('zk-table', zkTable)
Vue.component('zk-tempRegion', zkTempRegion)
Vue.component('zk-text', zkText)
Vue.component('zk-title', zkTitle)
Vue.component('zk-top', zkTop)
Vue.component('zk-treetable', zkTreetable)
Vue.component('zk-video', zkVideo)
Vue.component('zk-address-edit', zkAddressEdit)
Vue.component('zk-head-user', zkHeadUser)
Vue.component('zk-login-mobile', zkLoginMobile)
Vue.component('zk-pclogin', zkPclogin)
Vue.component('zk-pcloginout', zkPcloginout)
Vue.component('zk-pcreg', zkPcreg)
Vue.component('zk-qrcode', zkQrcode)
Vue.component('zk-user-address', zkUserAddress)
Vue.component('zk-user-base', zkUserBase)
Vue.component('zk-user-nav', zkUserNav)
Vue.component('zk-user-view', zkUserView)
Vue.component('zk-users-index', zkUsersIndex)
Vue.component('x-badge', xBadge)
Vue.component('x-border', xBorder)
Vue.component('x-checkbox', xCheckbox)
Vue.component('x-city-picker', xCityPicker)
Vue.component('x-class', xClass)
Vue.component('x-clear', xClear)
Vue.component('x-code', xCode)
Vue.component('x-col', xCol)
Vue.component('x-data-select', xDataSelect)
Vue.component('x-editor', xEditor)
Vue.component('x-enum', xEnum)
Vue.component('x-form-select', xFormSelect)
Vue.component('x-icon', xIcon)
Vue.component('x-image', xImage)
Vue.component('x-json', xJson)
Vue.component('x-label', xLabel)
Vue.component('x-line', xLine)
Vue.component('x-markdown', xMarkdown)
Vue.component('x-qrcode', xQrcode)
Vue.component('x-radio-group', xRadioGroup)
Vue.component('x-radio', xRadio)
Vue.component('x-row', xRow)
Vue.component('x-select-image', xSelectImage)
Vue.component('x-select-mutile', xSelectMutile)
Vue.component('x-select', xSelect)
Vue.component('x-tab', xTab)
Vue.component('x-table', xTable)
Vue.component('search', search)
Vue.component('x-tabs', xTabs)
Vue.component('x-tags', xTags)
Vue.component('x-ueditor', xUeditor)
Vue.component('x-upload-file', xUploadFile)
Vue.component('x-upload-list', xUploadList)
Vue.component('x-upload', xUpload)
Vue.component('x-widget', xWidget)
Vue.component('admin-activity-set', adminActivitySet)
Vue.component('admin-app-publish', adminAppPublish)
Vue.component('admin-layout', adminLayout)
Vue.component('admin-message', adminMessage)
Vue.component('admin-smart-hand', adminSmartHand)
Vue.component('admin-user-tree', adminUserTree)
Vue.component('admin-auto-action', adminAutoAction)
Vue.component('admin-auto-article', adminAutoArticle)
Vue.component('admin-auto-class', adminAutoClass)
Vue.component('admin-auto-faq', adminAutoFaq)
Vue.component('admin-auto-form', adminAutoForm)
Vue.component('admin-auto-image', adminAutoImage)
Vue.component('admin-auto-index', adminAutoIndex)
Vue.component('admin-auto-intro', adminAutoIntro)
Vue.component('admin-auto-news', adminAutoNews)
Vue.component('admin-auto-preview', adminAutoPreview)
Vue.component('admin-auto-report', adminAutoReport)
Vue.component('admin-auto-table', adminAutoTable)
Vue.component('admin-auto-tag', adminAutoTag)
Vue.component('admin-auto-task', adminAutoTask)
Vue.component('admin-auto-video', adminAutoVideo)
Vue.component('admin-autoconfig-form', adminAutoconfigForm)
Vue.component('admin-autoconfig-list', adminAutoconfigList)
Vue.component('admin-lightapp-form', adminLightappForm)
Vue.component('admin-lightapp-table', adminLightappTable)
Vue.component('auto-autoconfig-list', autoAutoconfigList)
Vue.component('admin-cms-form', adminCmsForm)
Vue.component('admin-cms-list', adminCmsList)
Vue.component('admin-login-light', adminLoginLight)
Vue.component('admin-login', adminLogin)
Vue.component('admin-relation-class', adminRelationClass)
Vue.component('admin-relation-tag', adminRelationTag)
Vue.component('admin-task-action', adminTaskAction)
Vue.component('admin-coupon-edit', adminCouponEdit)
Vue.component('admin-coupon-send', adminCouponSend)
Vue.component('admin-account-edit', adminAccountEdit)
Vue.component('admin-account-recharge', adminAccountRecharge)
Vue.component('admin-account-wallet', adminAccountWallet)
Vue.component('admin-stored-edit', adminStoredEdit)
Vue.component('admin-stored-value', adminStoredValue)
Vue.component('admin-hudong-edit', adminHudongEdit)
Vue.component('admin-merchant-orderedit', adminMerchantOrderedit)
Vue.component('admin-merchant-orderlist', adminMerchantOrderlist)
Vue.component('admin-merchant-product', adminMerchantProduct)
Vue.component('admin-reward-add', adminRewardAdd)
Vue.component('admin-reward-edit', adminRewardEdit)
Vue.component('admin-reward-modules', adminRewardModules)
Vue.component('admin-reward-sidebar', adminRewardSidebar)
Vue.component('admin-activity-product', adminActivityProduct)
Vue.component('admin-category-edit', adminCategoryEdit)
Vue.component('admin-delivery-edit', adminDeliveryEdit)
Vue.component('admin-delivery-template', adminDeliveryTemplate)
Vue.component('admin-mall-order', adminMallOrder)
Vue.component('admin-mallgoods-edit', adminMallgoodsEdit)
Vue.component('admin-order-edit', adminOrderEdit)
Vue.component('admin-order-list', adminOrderList)
Vue.component('admin-order-tenant-edit', adminOrderTenantEdit)
Vue.component('admin-order-tenant-list', adminOrderTenantList)
Vue.component('admin-product-edit', adminProductEdit)
Vue.component('admin-product-line', adminProductLine)
Vue.component('admin-product-list', adminProductList)
Vue.component('admin-sms-recharge', adminSmsRecharge)
Vue.component('admin-sms-send', adminSmsSend)
Vue.component('admin-sms-sendgroup', adminSmsSendgroup)
Vue.component('admin-store-settings', adminStoreSettings)
Vue.component('admin-supplier-edit', adminSupplierEdit)
Vue.component('admin-supplier-eidt', adminSupplierEidt)
Vue.component('admin-supplier-order', adminSupplierOrder)
Vue.component('admin-cmuser-edit', adminCmuserEdit)
Vue.component('admin-role-edit', adminRoleEdit)
Vue.component('admin-role-open', adminRoleOpen)
Vue.component('admin-user-edit', adminUserEdit)
Vue.component('admin-user-view', adminUserView)


Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(GlobalUtils)
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error:
    'data:image/png;base64,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',
  loading:
    'data:image/gif;base64,R0lGODlhIAAgAPcAAP////3///39//n9//v9/fv9//n9/ff7/fn7//n7/fX7/ff5/fP5/fX5/fX5+/H5+/P5+/P3+/P3/fH3+/H3/e/3++/1++v1+ev1++31+e31++nz+evz+evz++fz+eXx+efx+enx+eXx9+Px9+Px+eXv9+Pv9+Pv+eXv+eHv99/v9+Ht993t99/t9d3t9d/t993r9d3r99vr9dnr9dfp9dnp9dfp89Xp9dXp89Xn9dXn89fn89Hn89Pn89Pl88/l8c/l89Hl883l88/j88/j8c3j883j8cvj8cnh8cvh8cfh78fh8cff8cff78Xf78Pf78Xf8cXd78Hd78Pd78Hd7b/d78Hb7cHb77/b7b/b773b7bvZ7b3Z7bnZ7bnX67nX7bfX7bXX67fX67fV67PV67PV6bXV67PT67HT6bHT66/T66/T6a/R6a3R6a/R66vR6avP56vP6anP6afP56nP56fN56XN56PN56XL56HL56PL5aPL56HL5aHJ5p/J5Z3J5Z3H5ZvH45nH5ZvH5ZnH45fF45nF5ZnF45XF45fD45XD45XD4ZPD45HD45LD4ZPB4ZHB4Y/B4Y+/4Y2/4Yu/342/34u/4Yu934m934u94Ye934e734W734O734O73YW73YO53YO534W53YG53YG33Xy33X633Xy13Xy123q123i123iz23Sz2XSz23az23az2XSx23Kx2XSx2XKx23Kv2W6v2W6v13Cv2XCu12yt2W6t2Gyt12qt12qr12ir12ar12ap12ap1WSp1WSp12Kp1WKn1WCn1V6n016n1V+l016l1WCl1Vyl01yj01qj01ij01uh0Vmh01ih0VSh0Vah0Vah01if0VSf0VKf0VSdz1Cd0VCdz06cz0qbz0ybz0mZz0qZzUiXzUSXzUaWzUKVy0OVzUCVzECTyzyTyz6Tyz2RyziRyTqRyz2PyTmOyTaOyTSNyTGMyTKNxy6LxyyJxiuHxiiHxSaFxSSDwyKBwiCBwSJ+wR9+wR98wRx8wf///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAwD/ACwAAAAAIAAgAAAI/wD/CRxIsGACAwUTKlxIkAEDhhAHHjCTcEKEhAwARCTY7lHBCRMKZnixkWAbfyYIgiRIgEbIkgPfWSMY4eJAEyxgEiTCD8lABw8FHqhxIGLQgrvCDRQgYOAKEAqbDjSDDU3BAYuKFgSQQSPBDT8uFPxTL9wPnQMjDGHyQeGHZfRWHY0oQEaTHFoXGkn2B6aIHi835o0YAK3hw4gFbmHEitYtV4VkoJ2gAwkTJkh0fNjiqDEtyJJ1UraMWXPi06gZDoZIACaNUmxg9hizAeIGVNcgrWY4QIofMA4UrtHWi8bhDW389Cg4hRaWggK8ICxIAElhgjLQ5JSo8M+ngSDaCknME0bhgIgshIX+d8aqQBGToBpeNYmgnz4E5RAyzERYBoKAAKISJTmghQpFBP0hIEFK9AVTAkQk5IcfCcnQ2mlkkJGaQj3woFNAACH5BAUDAP8ALAMABAAaABgAAAhPAP8JHEiwIMEVBhMqJPhhocOCKR5KdAht4kMa/+Bts5jwB0F4HAd6DEmypMmTJFehXMmypcuXHD01KzmHYDRaKGvCDCmH466dC/m4ZGQwIAAh+QQFAwD/ACwCAAQAHQAZAAAIWAD/CRxIsGDBDQYTDlymsKHDh/8QQix4TaGFiRgzasSobiPEXh5DihxJsmRGFiYJokzJsqXLicI8rklYbOSWmQ+tZDSh5aVDVg4BadwEUU5GWC0xYXyTMCAAIfkECQMA/wAsAAAAACAAIAAACHkA/wkcSLBgmDEFEypcSJAUKIYQIzZjFrGiQmnSEjKwCFFatIITOEJklkwkxHkES5kiGNLkQho7XMpc+GEhxZkmWrRUKE4mi5lAgwodSrSo0YgmjipdyrQikoqQdskEw3BLL6FUmzppyrEU168Q9biEBJbgmrJoGQYEACH5BAUDAP8ALAAAAAAgACAAAAj/AP8JHEiwoBcxBRMqXEiQ0yaGEAcesJLQWLGEASIWvOanoDJlBQUY0EhQzDsPBJUlIwggQUaSA7ntIlhMGEECBGAS1PHux8BRoAa2BBDxgEJTywbSoDEQp0KiA6Xs0lKQgB6jCQUkPLAB68A33Yox1SnQwAYREBRuWOVtkteIACx8uKCVoQ5WbWA64DCS5FuIUMkKHkxYiR1KmDBNmrOC7AEPKVq0SPFhgmHEihk7hix5RWXCoENrHADzpUYWiqiSNPFjAkQLiGLZ+ctQAA0sP2j/0xKLU4vBlrGkKPhj0pGCAZrkDEkjsEAPSTYQ1I2mo8ALFwZuQaKwLsMPm0wMPnTiZOAFOBkGK7JDMEwYglTACO7ByfVAMmQINoAzXGeh8gThVxANXug0wAwJkfFeQR94R5gTTYi2EAsw6BQQACH5BAUDAP8ALAIAAgAbABwAAAhsAP8JHEiwoEEwBwwqXDjwkTqGA9NB/GfCX5uJGP9Zc5fx3zmGSPj96AgR3C6SDA8oUhhB4LVeKAlOsFDwWsx/FhgoPIVS582fQIMKHUq0qNGjRVPdbFIw1SSgQ5ggnRqTDFWiVif6uSpwS8aAACH5BAkDAP8ALAAAAAAgACAAAAheAP8JHEiwoMGDCBMqXMiwYcNiDiNKnCiQGUWH4S5qnJhq48JmsTYeUGhx4gKPKFOqXMmypcuXMGPKFOiJ4g+FoBRtvOmQyEyDSDbqTKglphOKQxVuoWikYZOfUGUGBAAh+QQFAwD/ACwAAAAAIAAgAAAI/wD/CRxIsGAVLQUTKlxI0BEjhhAHHlCSMJashFoORCToK05BXLgKFgq3kSAWbhcI4rpF8IM9NCUJCitFUNYrgsvIxSQ4YxuNgZEiDTRij0dEjQkjXRQIQ8bAa6w2IjHFpKAANgYSHghEoCCAAAAKhim2CsbOgV/BKryASVggpCW/AgjLUIYmMTHn0t2Y9azfv4DP/iDzJ1AgP2Q+nCXAYILjCQwODC58OPHixo8jB97MmWHXuDFF1EESM0MKuAonyKFEpu/GAB9opPhcEMmlQCL+HoBBI0NBGn50FAzgQ0DCACb2CpzAYgJB1wStnBnoeOCPGQoDRNwAaMPAIEaXOzhh8FfOGIJMqg7sYcSvDEDkBzpxQvDAE+874fwoOL+gifYxEbBCQk2oR9AF2m3WQw+dKfRBbjEFBAAh+QQFAwD/ACwDAAMAGwAaAAAIZwD/CRxIsKDBgwWlIVy4cBdDgd8eDlQosaLFggwuLmwTDs0/hxoHGjmXrxBBkBYZ4MoX7YPBSBcLXUMS8uCBmjhz6tzJs6fPn0AZbQn5ouAjPT3r9HQZ0oZGOwyNALUI9eERiWV0BgQAIfkEBQMA/wAsAAADACAAGgAACE4A/wkcSLCgwYMIEypcyLChQ4brHkp0OGmixE0WHcrKyLGjx48gQ26RE3IggH8jSwo8qbKly5cwD3qIOVEGTZdtXoJhOMNizoU9Jm75GBAAIfkEBQMA/wAsAwACAB0AGwAACHMA/wkcSLCgwYMIEw60w0whQWAO/52LSHGgtIoCIQ7884cgOYwgESoKefAaQVQkB3abZ/BPKZLziiUMlLKmzZs4cw7sAYoZNWrOTKmxydMnUFNrdCpdylQgg6YVnhLUwcfmAws2sTYNaUahjK1MvzJdgTAgACH5BAkDAP8ALAAAAAAgACAAAAhdAP8JHEiwoMGDCBMqXMiwoUOHwh4K1MXwm8SLGHEpBIeRoa2OIBMqAoltIaeQKFOqXMmypcuXMGPKxCjAIRyMBxTKQXmg5syfCbUoNNHRSUyhC0tcbOJwA9CnMwMCACH5BAUDAP8ALAAAAAAgACAAAAj/AP8JHEiwoJEjBRMqXEhQDhyGEAcS0JEwEqSESBJEJHgJS8FJkwq22bWR4I9VFQiCJLhBm5SSBDcFIgjJEUFTwGASNLGqxcA6dQbS2CYjogGFchgNNGFioKxIChsQpOGHIsEAVgYkNLBGQEEwybYURHIpkAidA3lIQ2dH4YQ6lMxoLNkAlDpbGyCaqIMEZp1dQWASgHkAreHDiAW6QLKlS5ctRy6gpUHJV7FiwDCRWdz4ceTJlS9nJpO4tGmGXk8XzOCkqGqBB5yQGTL4tYwzXCy8FvjBSlOCAEoESAjgAICNtQvKCAy7sMAJERA/cDJh4Ia8AglkSK7TiFWBJs4OKZyQEu0GJ87B/xYY4EL6kkXWqy94oHzJABkShk844Hjp67sRBEF0MAUEACH5BAkDAP8ALAAAAAAgACAAAAhqAP8JHEiwoMGDCBMqXMiwocOHEBEqinhQEsWLBqVhVIjKYZ2NA4EdfARyXEI2F02CXMmypcuXMGPKnHnxwExC15Aw3AKRQax80kYg3OLkopFz+Q7JbBOOzEwGDI3QlCl1IYSIN6Zq3RoxIAAh+QQFAwD/ACwAAAAAIAAgAAAI/wD/CRxIsCCPHwUTKlxIEM0ZhhAHDpiRMFCghEQMRCQoiElBQYUKklm1kaAOTRMIFjJE8EIyjyUHFqpDMBAggphkxST4AZOJgWvUDJSRjEXEAQrJ+Bn44cPAUYcUHiAIg42MggGQEEhowIyAglh0SSkYJJCcDTsH0gjGrY1CCGQCVUFa8kAkbqnQMgRBJkhMNqt0xNxaN63hw4gFjuDhxMkTJj0qpJ3BCJYuXbQgbRnho7GTJjwk76RsGbPmxKhTMwwQc2rJCUF+lvwTzQjEA0Gk0PhakoEre8ycJjQhBUlKw0PE3btIcEMRvQMBXACQEAD1gmi8kSHIu2AJowIJEEH+J4B1QgYRD+hQMDDCg+gErk9eQbCCaIECusecoIOuQPsEARBfWjJwUBCABAWgX0QBvHfgfdGp9kAEqknlWkkBAQAh+QQFAwD/ACwDAAMAGgAbAAAIbAD/CRxIcKCfgggTRip4sKCvhBAjSpzokOLAOhYzahSoZ2NBXdQGbrHj8Z+0kihTqlzJsqXLlzBjFiyWMAlLJEFUzvN4QFHCaRA/QASHKyOLiEj0/aCYYiK0dhRhTDTBj41EExYfnXPp5QDBgAAh+QQFAwD/ACwDAAMAGgAZAAAIVgD/CRRYZ6DBgwI1ITxYaOFBWg4N6kEox2AhUBEtZoSYsaNASQ63ePSI6h8cMSMdJkvJsqXLlzBjypxJs6bNmzgH9ni5zqCPGTGx5Rxq8EPNDTaNvgwIACH5BAkDAP8ALAAAAAAgACAAAAhiAP8JHEiwoMGDCBMqXMiwocOHEP/5iegQDkWHEy9q3MixIIwzG1H985KQTMeTKFOqXMmypcuXMGMmlCEz4rmaCycMpKGjZSqRLKM1azmNWscJBwpOm9ZSWrSWpUi1NGPmYUAAIfkECQMA/wAsAAAAACAAIAAACP8A/wkcSLAgDBgFEypcSHBKFIYQBxL4kPAMmYQ0BkQkSEZHQTRoCkpxtJFgizkNCIIkWMFUkJIcsXC8OJBPJJgEL9ThMFCKlIEmRlGESEBhEy8DL1wYGKiNwgMEPSgZOhAADQEJCTgJUBAJJiMFVWxxMgHnQBagdG15amRLj6IlD+jR9cgCxApJVsDcAokFTK4lNZodTLjwPwsiYMiQAeMDVJwt6lzatAmTHiaIFTN2bLaFncmVLxseTZohAJiPNx7YULYknFgeGRLYYOIC4I0KLoWTtUHhBBOcB+tINg5OwQYeHBQEALfgAT/NBW7xRYXgbYIIUtOgMbDZqacRAzQ+uG2K1MAf8GKbPZCAYLJiBIN5GyzgwOmBzpgR/CAvzHrB3TlT0B/b4AQAVgUlk0xCUqRWGCielKaQGGPgFBAAIfkEBQMA/wAsAAAAACAAIAAACP8A/wkcSLBgCxYFEypcSJAJEoYQBwr4kBCMl4QyCEQkuKVGQTBgCjIJtJGgiTUHCIIkOAGTjpIEvUSJ2YVgnUIwCVpAk2EgEyYDR2CiCFGAQiNWBmboKZAPGYUpB24YsqEgABlGCxJAEqCgEUk/CpqYciRCzoErMLnCAtXHkxpZNx6Y46pQBYgTgpSAKaUQwpJdSw44S7iwYYETNphIkcLEhqgwU8CBNGlSpDlIEi9u/PhsCjqQKFnGfLi0aYYAYCaASaACA5hrVuWAGKDChgmpSx6IxA1V1YQKNlwYTJhGMG5sCh7QAHlgbuV44grEomsKwefXn9OgMbAYKKgRAQQ8eO7pu0Ag7LgTHk9QmC+Cuq4RFo/dWDGCINjVzAkA+79ixhTUhzRn+fePMMEkJEVzhW2CyWkKbXERTAEBACH5BAkDAP8ALAAAAAAgACAAAAh3AP8JHEiwoMGDCBMqXMiwoUOHeh4KFMMQksSHfi42fKSRIZ2OIBEmCfnPlEIjGk1lJMmypcuXMGPKnEmzps0HGqUpfOAApC6dDgsdeOiqoS5vCHuB/LEPScJxHd1BI7jLYLOLbPiNWFju4jmODJc9PODFplmQAQEAIfkEBQMA/wAsAAAAACAAIAAACP8A/wkcSLDghxEFEypcSDAID4YQBwrgkHBKlIQvCEQkiCRFQSlSCg6Rs5HgBiwHCIIk+KCQjJIElfwg6MQJQTJ2YBKcgGXCwB8zBYI4tCFiAIU0igycUGEgGy0KExCsIKMpQQApjhYk8EPrQB6BchS8wGNGA50DTSDi1EThABY9THiNaIAMJzs+GTZgcQGmEj0mYM6FOACt4cOIBR6YYCGD4weFdX4gE6hQoUBohixu/DgyzMmVCwnKnLi06dP/DMAEQGAwwzGeZkBkTUAAAJgHAiXb1DdhAAIEbhuWISuZmYKsBxMIlLLggTcCCjpBheSqwljYBsp4KRDXJIXNGQZCuZdk4CRKA3V4k234XDKCt2gRTFXMMBp8Hwjm0mWyGxa04hRSUC65FEQHMDodsEVCutySkBJSlRYJJKglhMWCMAUEACH5BAUDAP8ALAIAAwAcABsAAAhoAP8JHEhwIBIkBRMqFKik4MGCfBYqtCGx4sKGEiNa3Mixo0cZKTwW/DOp4AcZIgVKSsmypcuXMGPKnEmz5YGZSKwlimnC2j5cDET6KliInzojLU8BE4hmXJuZQWuyvCZVKjapuqoWDAgAIfkEBQMA/wAsAwADABwAGgAACFoA/wkUSGOgwYMIEw78obChwxsOBZKJaJAhxYsRtzjcgNGhnIEjOiK0kwhhSJH/CqFcybKly5cvNQ7sEtMgTZg4c+rcydOhrp5AE75z2Kwjt1464VF0dvHay4AAIfkEBQMA/wAsAgADABwAHAAACGcA/wkcSLCgQS0GE9JIWBANw4cQt0AsuHCgi4YTDabIyLEjwwMXPCb0YzCkyH9+wDCccLKly5cwJwKYOTNmG5o1YbaJybPny2Q+ga46OdTnwKJGIRmdmG5pRqQT1WUs5jSVU5d/OgYEACH5BAkDAP8ALAAAAAAgACAAAAhvAP8JHEiwoMGDCBMKNGFCocOHEBVOiEhR4AuDMgp6qcix48WEGzuKPHhg5EMIJv/VUYiS48qUMGPKnAkRzahk0Z4l49Qjpk1m0aLt1EGzqNGjR/08BAbPaDyTkGRuQUr1366Zl6oS7IU0pNavWgMCACH5BAUDAP8ALAAAAAAgACAAAAj/AP8JHEiwYIQJBRMqXEgQhAeGEAcCOJAwRYqEFwJEJHjBQUGLH5NsJHgAhACCIAcekLJhJEEOGVBeHBgEiUuCA0AQGPgBxMAJUhhEBKBwAgeVFAX+oKFwp0QCRAkCYBCVYAATVQWm2GKiYAACUG8OvNCFzQyFAAQQOOmSwJE2UpIuTKtx5AwpF1xmhchWrN+/gMlwEpYsGTBMTG9eQCImTBgxTGAIJmwYsdjFXhyDiQy4s+eNciM63RikFx6XSvR0ZfhhF7tRDVwmIIPJDsKEdtZd4/HXRCFNNgluYSamoIA2CRIOwFJ3YI8/iQXGTjgp1kATM/9BqqPQQMQZ3nIMPcRjZyALWKvFFkNFUFIkgoU4+cXireXAS5cIWohlRKwvOgXhV5AWmNx0ABPUSZKQDgN8Vgd3nyl0RHAjBQQAIfkECQMA/wAsAAAAACAAIAAACG4A/wkcSLCgwYMIEypcyLChw4cQ/1VgiCSiRYgTFFZcyAAhhIsD0YxrA3LgE4OF+LUzclFKQhPW9uHq+DDMxoRIshUqqfAAz59AgwodSrSo0aMgyxU11wykn0gHhSGdWvCa0V5HrS5MRbWrV6QBAQAh+QQFAwD/ACwAAAAAIAAgAAAI/wD/CRxIsOCBAwUTKlxIcMIEhhAHAgiQ8MKFhBMoRhxogEBBiwU30NhIMMABAARBcgxigSTBBAZSXhwIY6TLgSY1/nM4kMGPBhEZKCQQU+CAAQNlpFAogCCZb2sKAmiaMMAGlAQ9INlQkBA+c0NuDpygRMvShB+c3YsllKQAGlh+IGR4RFoglymGPCQ5d6NOsYADB+4SSRevXbcg2XRZIcgTKZB/mCBsmFfixSQr/Hgc2YTgz6A39o3okWQOVnBc/lADAuKGVeAojYY4QEshNA8UvvlWDLNLD3YK/SgohZeWggLIFCU4wMnffzTkyCA4W2AhUwM/fBgYCI1CpBBZMEGrMbBNm4EpPG0HfEsTQUF3B+phBNhJs5nWCxGsAKqHWFjeEVSIfgQ9gchNBxiRUCGCJDRDaZ+pEWBoCQUxnEsBAQAh+QQJAwD/ACwAAAAAIAAgAAAIcgD/CRxIsKDBgwgTKlxY8IAZhhANtnsE8UVEgW38mbh48Z01jhGJ8EOSsAbIgbvCnSyI7eCiAytjGhzCRCbCJjZz6tzJsydHkj4FAg1KtCjEUkSvnfSzsFfMNkyNSmUoTOGklauKVl1IyeifnFGnik0YEAA7',
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
