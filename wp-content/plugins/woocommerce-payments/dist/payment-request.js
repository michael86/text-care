!function(){"use strict";var e=window.wp.hooks;const t=e=>("undefined"!=typeof wcpay_config?wcpay_config:wc.wcSettings.getSetting("woocommerce_payments_data"))[e]||null,n=e=>"object"==typeof wcpayPaymentRequestParams&&wcpayPaymentRequestParams.hasOwnProperty(e)?wcpayPaymentRequestParams[e]:null,a=e=>({label:n("total_label"),amount:e}),i=e=>n("wc_ajax_url").toString().replace("%%endpoint%%","wcpay_"+e),o=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"wcpay_";return e.toString().replace("%%endpoint%%",n+t)},r=e=>{var t;if(!n("login_confirmation"))return;let a=null===(t=n("login_confirmation"))||void 0===t?void 0:t.message;var i;"payment_request_api"!==e&&(a=a.replace(/\*\*.*?\*\*/,"apple_pay"===e?"Apple Pay":"Google Pay")),a=a.replace(/\*\*/g,""),confirm(a)&&(window.location.href=null===(i=n("login_confirmation"))||void 0===i?void 0:i.redirect_url)};class l{constructor(e,t){this.options=e,this.stripe=null,this.stripePlatform=null,this.request=t}createStripe(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];const i={locale:t};return n&&(i.stripeAccount=n),a&&(i.betas=a),new Stripe(e,i)}getStripe(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const{publishableKey:t,accountId:n,forceNetworkSavedCards:a,locale:i,isUPEEnabled:o,isStripeLinkEnabled:r}=this.options;if(a&&!e)return this.stripePlatform||(this.stripePlatform=this.createStripe(t,i)),this.stripePlatform;if(!this.stripe)if(o){let e=["card_country_event_beta_1"];r&&(e=e.concat(["link_autofill_modal_beta_1"])),this.stripe=this.createStripe(t,i,n,e)}else this.stripe=this.createStripe(t,i,n);return this.stripe}loadStripe(){return new Promise((e=>{try{e(this.getStripe())}catch(t){e({error:t})}}))}generatePaymentMethodRequest(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=this.getStripe();return new class{constructor(){this.args={...e,billing_details:{address:{}}}}prepareValue(e,n){if(void 0!==n&&0!==n.length||(n=t[e]),void 0!==n&&0<n.length)return n}setBillingDetail(e,t){const n=this.prepareValue(e,t);void 0!==n&&(this.args.billing_details[e]=n)}setAddressDetail(e,t){const n=this.prepareValue(e,t);void 0!==n&&(this.args.billing_details.address[e]=n)}send(){return n.createPaymentMethod(this.args).then((e=>{if(e.error)throw e.error;return e}))}}}confirmIntent(e,a){const i=e.match(/#wcpay-confirm-(pi|si):(.+):(.+):(.+)$/);if(!i)return!0;const o="si"===i[1];let r=i[2];const l=i[3],s=i[4],u=e.indexOf("order-pay"),d=-1<u,c=d&&e.substring(u).match(/\d+/);return c&&(r=c[0]),{request:(()=>{const{locale:e,publishableKey:n}=this.options,a=t("accountIdForIntentConfirmation");return o?this.getStripe().confirmCardSetup(l):a?this.createStripe(n,e,a).confirmCardPayment(l):this.getStripe(!0).confirmCardPayment(l)})().then((e=>{var i;const o=e.paymentIntent&&e.paymentIntent.id||e.setupIntent&&e.setupIntent.id||e.error&&e.error.payment_intent&&e.error.payment_intent.id||e.error.setup_intent&&e.error.setup_intent.id,l=null!==(i=n("ajax_url"))&&void 0!==i?i:t("ajaxUrl");return[this.request(l,{action:"update_order_status",order_id:r,_ajax_nonce:s,intent_id:o,payment_method_id:a||null}),e.error]})).then((e=>{let[t,n]=e;if(n)throw n;return t.then((e=>{const t="string"==typeof e?JSON.parse(e):e;if(t.error)throw t.error;return t.return_url}))})),isOrderPage:d}}initSetupIntent(){return this.request(o(t("wcAjaxUrl"),"init_setup_intent"),{_ajax_nonce:t("createSetupIntentNonce")}).then((e=>{if(!e.success)throw e.data.error;return e.data}))}setupIntent(e){return this.request(t("ajaxUrl"),{action:"create_setup_intent","wcpay-payment-method":e,_ajax_nonce:t("createSetupIntentNonce")}).then((e=>{if(!e.success)throw e.data.error;return"succeeded"===e.data.status?e.data:this.getStripe().confirmCardSetup(e.data.client_secret).then((e=>{const{setupIntent:t,error:n}=e;if(n)throw n;return t}))}))}createIntent(e){return this.request(o(t("wcAjaxUrl"),"create_payment_intent"),{wcpay_order_id:e,_ajax_nonce:t("createPaymentIntentNonce")}).then((e=>{if(!e.success)throw e.data.error;return e.data})).catch((e=>{throw e.message?e:new Error(e.statusText)}))}updateIntent(e,n,a,i,r){return this.request(o(t("wcAjaxUrl"),"update_payment_intent"),{wcpay_order_id:n,wc_payment_intent_id:e,save_payment_method:a,wcpay_selected_upe_payment_type:i,wcpay_payment_country:r,_ajax_nonce:t("updatePaymentIntentNonce")}).then((e=>{if("failure"===e.result)throw new Error(e.messages);return e})).catch((e=>{throw e.message?e:new Error(e.statusText)}))}async handlePaymentConfirmation(e,t,n){const a=this.getStripe(),i=await a.confirmPayment({elements:e,confirmParams:t});if(n&&i.error&&"lock_timeout"===i.error.code){const e=await a.retrievePaymentIntent(n);if(!e.error&&"succeeded"===e.paymentIntent.status)return window.location.href=t.redirect_url,e}return i}saveUPEAppearance(e){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.request(t("ajaxUrl"),{is_blocks_checkout:n,appearance:JSON.stringify(e),action:"save_upe_appearance",_ajax_nonce:t("saveUPEAppearanceNonce")}).then((e=>e.success)).catch((e=>{throw e.message?e:new Error(e.statusText)}))}processCheckout(e,n){return this.request(o(t("wcAjaxUrl"),"checkout",""),{...n,wc_payment_intent_id:e}).then((e=>{if("failure"===e.result)throw new Error(e.messages);return e})).catch((e=>{throw e.message?e:new Error(e.statusText)}))}paymentRequestCalculateShippingOptions(e){var t;return this.request(i("get_shipping_options"),{security:null===(t=n("nonce"))||void 0===t?void 0:t.shipping,is_product_page:n("is_product_page"),...e})}paymentRequestUpdateShippingDetails(e){var t;return this.request(i("update_shipping_method"),{security:null===(t=n("nonce"))||void 0===t?void 0:t.update_shipping,shipping_method:[e.id],is_product_page:n("is_product_page")})}paymentRequestGetCartDetails(){var e;return this.request(i("get_cart_details"),{security:null===(e=n("nonce"))||void 0===e?void 0:e.get_cart_details})}paymentRequestAddToCart(e){var t;return this.request(i("add_to_cart"),{security:null===(t=n("nonce"))||void 0===t?void 0:t.add_to_cart,...e})}paymentRequestGetSelectedProductData(e){var t;return this.request(i("get_selected_product_data"),{security:null===(t=n("nonce"))||void 0===t?void 0:t.get_selected_product_data,...e})}paymentRequestCreateOrder(e){var t;return this.request(i("create_order"),{_wpnonce:null===(t=n("nonce"))||void 0===t?void 0:t.checkout,...e})}initPlatformCheckout(e,n){return this.request(o(t("wcAjaxUrl"),"init_platform_checkout"),{_wpnonce:t("initPlatformCheckoutNonce"),email:e,user_session:n})}paymentRequestPayForOrder(e,t){var a;return this.request(i("pay_for_order"),{_wpnonce:null===(a=n("nonce"))||void 0===a?void 0:a.pay_for_order,order:e,...t})}logPaymentError(e){return this.request(o(t("wcAjaxUrl"),"log_payment_error"),{charge_id:e,_ajax_nonce:t("logPaymentErrorNonce")}).then((()=>!0))}}const s=async(e,t,n,a,i)=>{if("success"!==t.result)return a(i,(e=>{const t=document.createElement("div");return t.innerHTML=e.trim(),t.firstChild?t.firstChild.textContent:""})(t.messages));try{const a=e.confirmIntent(t.redirect);if(i.complete("success"),!0===a)n(t.redirect);else{const{request:e}=a;n(await e)}}catch(e){a(i,e.message)}},u=async(e,t,n,a)=>{const i=await e.paymentRequestCreateOrder((e=>{var t,n,a,i,o,r,l,s,u,d,c,p,m,y,_,h,v,g,w,P,q,f,b,R,S,I,k,C,x,j,E,A,B,U,N,D,O,T,L,M,G,F,K,z,V,W,J,Q;const $=null!==(t=null==e||null===(n=e.paymentMethod)||void 0===n||null===(a=n.billing_details)||void 0===a?void 0:a.name)&&void 0!==t?t:e.payerName,H=null!==(i=null==e||null===(o=e.paymentMethod)||void 0===o||null===(r=o.billing_details)||void 0===r?void 0:r.email)&&void 0!==i?i:"",X=null!==(l=null==e||null===(s=e.paymentMethod)||void 0===s||null===(u=s.billing_details)||void 0===u?void 0:u.phone)&&void 0!==l?l:"",Y=null!==(d=null==e||null===(c=e.paymentMethod)||void 0===c||null===(p=c.billing_details)||void 0===p?void 0:p.address)&&void 0!==d?d:{},Z=null!==(m=null==e?void 0:e.shippingAddress)&&void 0!==m?m:{};let ee="payment_request_api";return"applePay"===(null==e?void 0:e.walletName)?ee="apple_pay":"googlePay"===(null==e?void 0:e.walletName)&&(ee="google_pay"),{billing_first_name:null!==(y=null==$||null===(_=$.split(" "))||void 0===_||null===(h=_.slice(0,1))||void 0===h?void 0:h.join(" "))&&void 0!==y?y:"",billing_last_name:(null==$||null===(v=$.split(" "))||void 0===v||null===(g=v.slice(1))||void 0===g?void 0:g.join(" "))||"-",billing_company:null!==(w=null==Y?void 0:Y.organization)&&void 0!==w?w:"",billing_email:null!==(P=null!=H?H:null==e?void 0:e.payerEmail)&&void 0!==P?P:"",billing_phone:null!==(q=null!=X?X:null==e||null===(f=e.payerPhone)||void 0===f?void 0:f.replace("/[() -]/g",""))&&void 0!==q?q:"",billing_country:null!==(b=null==Y?void 0:Y.country)&&void 0!==b?b:"",billing_address_1:null!==(R=null==Y?void 0:Y.line1)&&void 0!==R?R:"",billing_address_2:null!==(S=null==Y?void 0:Y.line2)&&void 0!==S?S:"",billing_city:null!==(I=null==Y?void 0:Y.city)&&void 0!==I?I:"",billing_state:null!==(k=null==Y?void 0:Y.state)&&void 0!==k?k:"",billing_postcode:null!==(C=null==Y?void 0:Y.postal_code)&&void 0!==C?C:"",shipping_first_name:null!==(x=null==Z||null===(j=Z.recipient)||void 0===j||null===(E=j.split(" "))||void 0===E||null===(A=E.slice(0,1))||void 0===A?void 0:A.join(" "))&&void 0!==x?x:"",shipping_last_name:null!==(B=null==Z||null===(U=Z.recipient)||void 0===U||null===(N=U.split(" "))||void 0===N||null===(D=N.slice(1))||void 0===D?void 0:D.join(" "))&&void 0!==B?B:"",shipping_company:null!==(O=null==Z?void 0:Z.organization)&&void 0!==O?O:"",shipping_country:null!==(T=null==Z?void 0:Z.country)&&void 0!==T?T:"",shipping_address_1:null!==(L=null==Z||null===(M=Z.addressLine)||void 0===M?void 0:M[0])&&void 0!==L?L:"",shipping_address_2:null!==(G=null==Z||null===(F=Z.addressLine)||void 0===F?void 0:F[1])&&void 0!==G?G:"",shipping_city:null!==(K=null==Z?void 0:Z.city)&&void 0!==K?K:"",shipping_state:null!==(z=null==Z?void 0:Z.region)&&void 0!==z?z:"",shipping_postcode:null!==(V=null==Z?void 0:Z.postalCode)&&void 0!==V?V:"",shipping_method:[null!==(W=null==e||null===(J=e.shippingOption)||void 0===J?void 0:J.id)&&void 0!==W?W:null],order_comments:"",payment_method:"woocommerce_payments",ship_to_different_address:1,terms:1,"wcpay-payment-method":null==e||null===(Q=e.paymentMethod)||void 0===Q?void 0:Q.id,payment_request_type:ee}})(a));s(e,i,t,n,a)},d=e=>async(t,n,a,i)=>{const o=await t.paymentRequestPayForOrder(e,(e=>{var t;let n="payment_request_api";return"applePay"===(null==e?void 0:e.walletName)?n="apple_pay":"googlePay"===(null==e?void 0:e.walletName)&&(n="google_pay"),{payment_method:"woocommerce_payments","wcpay-payment-method":null==e||null===(t=e.paymentMethod)||void 0===t?void 0:t.id,payment_request_type:n}})(i));s(t,o,n,a,i)};jQuery((t=>{if(wcpayPaymentRequestParams.has_block)return;const i=wcpayPaymentRequestParams.stripe.publishableKey;if(!i)return;const o=new l({publishableKey:i,accountId:wcpayPaymentRequestParams.stripe.accountId,locale:wcpayPaymentRequestParams.stripe.locale},((e,t)=>new Promise(((n,a)=>{jQuery.post(e,t).then(n).fail(a)}))));let s;const c={getAttributes:function(){const e=t(".variations_form").find(".variations select"),n={};let a=0,i=0;return e.each((function(){const e=t(this).data("attribute_name")||t(this).attr("name"),o=t(this).val()||"";0<o.length&&i++,a++,n[e]=o})),{count:a,chosenCount:i,data:n}},abortPayment:(e,n)=>{e.complete("fail"),t(".woocommerce-error").remove();const a=t(".woocommerce-notices-wrapper").first();a.length&&(a.append(t('<div class="woocommerce-error" />').text(n)),t("html, body").animate({scrollTop:a.find(".woocommerce-error").offset().top},600))},completePayment:e=>{c.block(),window.location=e},block:()=>{t.blockUI({message:null,overlayCSS:{background:"#fff",opacity:.6}})},addToCart:()=>{let e=t(".single_add_to_cart_button").val();t(".single_variation_wrap").length&&(e=t(".single_variation_wrap").find('input[name="product_id"]').val());const n={product_id:e,qty:t(".quantity .qty").val(),attributes:t(".variations_form").length?c.getAttributes().data:[]},a=t("form.cart").serializeArray();return t.each(a,((e,t)=>{if(/^addon-/.test(t.name))if(/\[\]$/.test(t.name)){const e=t.name.substring(0,t.name.length-2);n[e]?n[e].push(t.value):n[e]=[t.value]}else n[t.name]=t.value})),o.paymentRequestAddToCart(n)},startPaymentRequest:t=>{const i=(e=>{var t,i,o;let{stripe:r,total:l,requestShipping:s,displayItems:u}=e,d=null===(t=n("checkout"))||void 0===t?void 0:t.country_code;"PR"===d&&(d="US");const c={total:a(l),currency:null===(i=n("checkout"))||void 0===i?void 0:i.currency_code,country:d,requestPayerName:!0,requestPayerEmail:!0,requestPayerPhone:null===(o=n("checkout"))||void 0===o?void 0:o.needs_payer_phone,requestShipping:s,displayItems:u};return r.paymentRequest(c)})(t),r=o.getStripe().elements(),l=c.createPaymentRequestButton(r,i),d=t=>{(0,e.doAction)("wcpay.payment-request.availability",t)};i.canMakePayment().then((e=>{e?(s=e.applePay?"apple_pay":e.googlePay?"google_pay":"payment_request_api",d({paymentRequestType:s}),c.attachPaymentRequestButtonEventListeners(l,i),c.showPaymentRequestButton(l)):d({paymentRequestType:null})})),i.on("shippingaddresschange",(e=>(async(e,t)=>{const n=await e.paymentRequestCalculateShippingOptions((a=t.shippingAddress,{first_name:null!==(i=null==a||null===(o=a.recipient)||void 0===o||null===(r=o.split(" "))||void 0===r||null===(l=r.slice(0,1))||void 0===l?void 0:l.join(" "))&&void 0!==i?i:"",last_name:null!==(s=null==a||null===(u=a.recipient)||void 0===u||null===(d=u.split(" "))||void 0===d||null===(c=d.slice(1))||void 0===c?void 0:c.join(" "))&&void 0!==s?s:"",company:"",address_1:null!==(p=null==a||null===(m=a.addressLine)||void 0===m?void 0:m[0])&&void 0!==p?p:"",address_2:null!==(y=null==a||null===(_=a.addressLine)||void 0===_?void 0:_[1])&&void 0!==y?y:"",city:null!==(h=null==a?void 0:a.city)&&void 0!==h?h:"",state:null!==(v=null==a?void 0:a.region)&&void 0!==v?v:"",country:null!==(g=null==a?void 0:a.country)&&void 0!==g?g:"",postcode:null!==(w=null==a||null===(P=a.postalCode)||void 0===P?void 0:P.replace(" ",""))&&void 0!==w?w:""}));var a,i,o,r,l,s,u,d,c,p,m,y,_,h,v,g,w,P;t.updateWith({status:n.result,shippingOptions:n.shipping_options,total:n.total,displayItems:n.displayItems})})(o,e))),i.on("shippingoptionchange",(e=>(async(e,t)=>{const n=await e.paymentRequestUpdateShippingDetails(t.shippingOption);"success"===n.result&&t.updateWith({status:"success",total:n.total,displayItems:n.displayItems}),"fail"===n.result&&t.updateWith({status:"fail"})})(o,e))),i.on("paymentmethod",(e=>{var n;(null!==(n=t.handler)&&void 0!==n?n:u)(o,c.completePayment,c.abortPayment,e)}))},getSelectedProductData:()=>{let e=t(".single_add_to_cart_button").val();t(".single_variation_wrap").length&&(e=t(".single_variation_wrap").find('input[name="product_id"]').val());const n=(t("#product-addons-total").data("price_data")||[]).reduce(((e,t)=>e+t.cost),0),a={product_id:e,qty:t(".quantity .qty").val(),attributes:t(".variations_form").length?c.getAttributes().data:[],addon_value:n};return o.paymentRequestGetSelectedProductData(a)},debounce:(e,t,n)=>{let a;return function(){const i=this,o=arguments,r=()=>{a=null,n||t.apply(i,o)},l=n&&!a;clearTimeout(a),a=setTimeout(r,e),l&&t.apply(i,o)}},createPaymentRequestButton:(e,t)=>e.create("paymentRequestButton",{paymentRequest:t,style:{paymentRequestButton:{type:wcpayPaymentRequestParams.button.type,theme:wcpayPaymentRequestParams.button.theme,height:wcpayPaymentRequestParams.button.height+"px"}}}),attachPaymentRequestButtonEventListeners:(e,t)=>{wcpayPaymentRequestParams.is_product_page?c.attachProductPageEventListeners(e,t):c.attachCartPageEventListeners(e)},attachProductPageEventListeners:(e,n)=>{let a=[];const i=t(".single_add_to_cart_button");e.on("click",(e=>wcpayPaymentRequestParams.login_confirmation?(e.preventDefault(),void r(s)):i.is(".disabled")?(e.preventDefault(),void(i.is(".wc-variation-is-unavailable")?window.alert(wc_add_to_cart_variation_params.i18n_unavailable_text):i.is(".wc-variation-selection-needed")&&window.alert(wc_add_to_cart_variation_params.i18n_make_a_selection_text))):0<a.length?(e.preventDefault(),void window.alert(a)):void c.addToCart())),t(document.body).on("woocommerce_variation_has_changed",(()=>{c.blockPaymentRequestButton(),t.when(c.getSelectedProductData()).then((e=>{t.when(n.update({total:e.total,displayItems:e.displayItems})).then((()=>{c.unblockPaymentRequestButton()}))})).catch((()=>{c.hide()}))})),t(".quantity").on("input",".qty",(()=>{c.blockPaymentRequestButton()})),t(".quantity").on("input",".qty",c.debounce(250,(()=>{c.blockPaymentRequestButton(),a=[],t.when(c.getSelectedProductData()).then((e=>{e.error?(a=[e.error],c.unblockPaymentRequestButton()):t.when(n.update({total:e.total,displayItems:e.displayItems})).then((()=>{c.unblockPaymentRequestButton()}))}))})))},attachCartPageEventListeners:e=>{e.on("click",(e=>{wcpayPaymentRequestParams.login_confirmation&&(e.preventDefault(),r(s))}))},getElements:()=>t("#wcpay-payment-request-wrapper,#wcpay-payment-request-button-separator"),hide:()=>{c.getElements().hide()},show:()=>{c.getElements().show()},showPaymentRequestButton:e=>{t("#wcpay-payment-request-button").length&&(c.show(),e.mount("#wcpay-payment-request-button"))},blockPaymentRequestButton:()=>{t("#wcpay-payment-request-button").data("blockUI.isBlocked")||t("#wcpay-payment-request-button").block({message:null})},unblockPaymentRequestButton:()=>{c.show(),t("#wcpay-payment-request-button").unblock()},init:()=>{if(wcpayPaymentRequestParams.is_pay_for_order){const{total:{amount:e},displayItems:t,order:n}=wcpayPaymentRequestPayForOrderParams;c.startPaymentRequest({stripe:o.getStripe(),requestShipping:!1,total:e,displayItems:t,handler:d(n)})}else wcpayPaymentRequestParams.is_product_page?c.startPaymentRequest({stripe:o.getStripe(),total:wcpayPaymentRequestParams.product.total.amount,requestShipping:wcpayPaymentRequestParams.product.needs_shipping,displayItems:wcpayPaymentRequestParams.product.displayItems}):o.paymentRequestGetCartDetails().then((e=>{c.startPaymentRequest({stripe:o.getStripe(),total:e.total.amount,requestShipping:e.needs_shipping,displayItems:e.displayItems})}))}};c.init(),t(document.body).on("updated_cart_totals",(()=>{c.init()})),t(document.body).on("updated_checkout",(()=>{c.init()}))}))}();