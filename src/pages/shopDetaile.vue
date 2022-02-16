<template>
  <div>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      sku: {
        tree: [
          {
            k: "颜色",
            k_s: "s1",
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "红色", // skuValueName：规格值名称
                imgUrl: "https://img01.yzcdn.cn/1.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "https://img01.yzcdn.cn/1p.jpg", // 用于预览显示的规格类目图片
              },
            ],
            largeImageMode: true,
          },
        ],
        list: [
          {
            id: 2259, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "1", // 是否必填 '1' 表示必填
            placeholder: "", // 可选值，占位文本
            extraDesc: "", // 可选值，附加描述文案
          },
        ],
        hide_stock: false, // 是否隐藏剩余库存
        },
      goods: {
            // 默认商品 sku 缩略图
            picture: 'https://img01.yzcdn.cn/1.jpg',
        },
      properties: [
        // 商品属性
        {
            k_id: 123, // 属性id
            k: '加料', // 属性名
            is_multiple: true, // 是否可多选
            v: [
            {
                id: 1222, // 属性值id
                name: '珍珠', // 属性值名
                price: 1, // 属性值加价
            },
            {
                id: 1223,
                name: '椰果',
                price: 1,
            },
            ],
        },
        ],
      initialSku: {
            // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
            // 值：skuValueId（规格值 id）
            s1: '1',
            s2: '1',
            // 初始选中数量
            selectedNum: 3,
            // 初始选中的商品属性
            // 键：属性id
            // 值：属性值id列表
            selectedProp: {
                123: [1222]
            }
        }
    };
  },
  methods: {
      onBuyClicked(){

      },
      onAddCartClicked(){

      }
  }
};
</script>
