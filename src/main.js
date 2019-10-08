import Vue from 'vue'
import App from './App'
import router from '@/service/router'
import store from '@/service/store/index'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import GlobalUtils from '@/service/prototypes/prototype'
import VueLazyload from 'vue-lazyload'

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
import xBorder from '@/elements/x-border/index.vue'
import xCheck from '@/elements/x-check/index.vue'
import xCityPicker from '@/elements/x-city-picker/index.vue'
import xClass from '@/elements/x-class/index.vue'
import xClear from '@/elements/x-clear/index.vue'
import xCode from '@/elements/x-code/index.vue'
import xCol from '@/elements/x-col/index.vue'
import xDataSelect from '@/elements/x-data-select/index.vue'
import xEditor from '@/elements/x-editor/index.vue'
import xFormSelect from '@/elements/x-form-select/index.vue'
import xIcon from '@/elements/x-icon/index.vue'
import xImage from '@/elements/x-image/index.vue'
import xJson from '@/elements/x-json/index.vue'
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
Vue.component('x-border', xBorder)
Vue.component('x-check', xCheck)
Vue.component('x-city-picker', xCityPicker)
Vue.component('x-class', xClass)
Vue.component('x-clear', xClear)
Vue.component('x-code', xCode)
Vue.component('x-col', xCol)
Vue.component('x-data-select', xDataSelect)
Vue.component('x-editor', xEditor)
Vue.component('x-form-select', xFormSelect)
Vue.component('x-icon', xIcon)
Vue.component('x-image', xImage)
Vue.component('x-json', xJson)
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


Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(GlobalUtils)
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error:
    'http://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-05-27/5cebe282b41815014cb56700.png',
  loading:
    'https://s-open.qiniuniu99.com/wwwroot/uploads/api/2019-06-11/5cff0b3c57d1ff20248691ba.gif',
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
