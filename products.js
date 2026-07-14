/**
 * File được tạo tự động từ https://zeo.vn/tat-ca-san-pham
 * Chạy: node scripts/sync-zeo-products.mjs
 */
const ZEO_PRODUCT_DATA = {
  "source": "https://zeo.vn/tat-ca-san-pham",
  "apiSource": "https://zeo.vn/collections/tat-ca-san-pham/products.json",
  "syncedAt": "2026-07-14T02:12:34.993Z",
  "currency": "VND",
  "total": 20,
  "categories": [
    {
      "slug": "nuoc-giat",
      "name": "Nước giặt",
      "count": 9
    },
    {
      "slug": "nuoc-giat-xa",
      "name": "Nước giặt xả",
      "count": 4
    },
    {
      "slug": "nuoc-rua-chen",
      "name": "Nước rửa chén",
      "count": 3
    },
    {
      "slug": "bot-giat",
      "name": "Bột giặt",
      "count": 2
    },
    {
      "slug": "nuoc-lau-san",
      "name": "Nước lau sàn",
      "count": 1
    },
    {
      "slug": "tay-rua",
      "name": "Tẩy rửa",
      "count": 1
    }
  ],
  "brands": [
    {
      "slug": "oplus",
      "name": "Oplus",
      "count": 10
    },
    {
      "slug": "zeo",
      "name": "ZeO",
      "count": 6
    },
    {
      "slug": "pano",
      "name": "Pano",
      "count": 4
    }
  ],
  "products": [
    {
      "id": 84560744,
      "slug": "nuoc-giat-xa-oplus-2in1-luu-huong-kep-huong-hoa-peony-1-8-kg",
      "name": "Nước giặt xả Oplus 2in1 lưu hương kép hương hoa Peony 1,8 Kg",
      "brand": "Oplus",
      "brandSlug": "oplus",
      "category": "Nước giặt xả",
      "categorySlug": "nuoc-giat-xa",
      "tags": [
        "Nước giặt xả",
        "oplus 2in1",
        "nước giặt xả 2in1"
      ],
      "price": 92000,
      "compareAtPrice": 132000,
      "discountPercent": 30,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/thumbnail-nls-37.png?v=1783483928127",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/thumbnail-nls-37.png?v=1783483928127",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-01.jpg?v=1783483928127"
      ],
      "sku": "NGX-OPLUS-HOAPEONY-T1800",
      "unit": "Túi",
      "shippingWeight": {
        "value": 2,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-xa-oplus-2in1-luu-huong-kep-huong-hoa-peony-1-8-kg"
    },
    {
      "id": 84560089,
      "slug": "nuoc-giat-oplus-2in1-khu-mui-mem-vai-tim-can-3500",
      "name": "Nước Giặt OPLUS 2in1 Khử Mùi Mềm Vải Tím Can 3.5kg",
      "brand": "Oplus",
      "brandSlug": "oplus",
      "category": "Nước giặt",
      "categorySlug": "nuoc-giat",
      "tags": [
        "Khử mùi",
        "nước giặt",
        "Oplus"
      ],
      "price": 139000,
      "compareAtPrice": 267000,
      "discountPercent": 48,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/ng-oplus-tim.png?v=1783569009577",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/ng-oplus-tim.png?v=1783569009577",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-30.jpg?v=1783569009577"
      ],
      "sku": "NG-OPLUS-2in1-VEILEX-TIM-3500",
      "unit": "Can",
      "shippingWeight": {
        "value": 4,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-oplus-2in1-khu-mui-mem-vai-tim-can-3500"
    },
    {
      "id": 84511753,
      "slug": "nuoc-giat-pano-khu-mui-can-xanh-3-8kg",
      "name": "Nước giặt Pano Khử Mùi Can Xanh 3.8Kg",
      "brand": "Pano",
      "brandSlug": "pano",
      "category": "Nước giặt",
      "categorySlug": "nuoc-giat",
      "tags": [
        "nước giặt",
        "Pano",
        "flashsale"
      ],
      "price": 124000,
      "compareAtPrice": 246000,
      "discountPercent": 50,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/ng-pano-3-8kg-xanh-8e46953a-15b9-437f-b481-aa71e6817d74.png?v=1783570340883",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/ng-pano-3-8kg-xanh-8e46953a-15b9-437f-b481-aa71e6817d74.png?v=1783570340883",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-80.jpg?v=1783570340883"
      ],
      "sku": "NG-PANO-VEILEX-XANH-3800",
      "unit": "Can",
      "shippingWeight": {
        "value": 4,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-pano-khu-mui-can-xanh-3-8kg"
    },
    {
      "id": 84479406,
      "slug": "nuoc-giat-xa-oplus-2in1-huong-do-quyen-ru-chai-3500",
      "name": "Nước giặt xả Oplus 2in1 hương đỏ quyến rũ chai 3,5kg",
      "brand": "Oplus",
      "brandSlug": "oplus",
      "category": "Nước giặt xả",
      "categorySlug": "nuoc-giat-xa",
      "tags": [
        "Oplus",
        "Nước giặt xả",
        "flashsale"
      ],
      "price": 146000,
      "compareAtPrice": 291000,
      "discountPercent": 50,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/ngz-oplus-3-1kg-do-75807d2d-52ad-4b84-a605-d2633ea141ff.jpg?v=1783925389610",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/ngz-oplus-3-1kg-do-75807d2d-52ad-4b84-a605-d2633ea141ff.jpg?v=1783925389610",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-20-f6254f41-2585-470b-b5e3-bcf6360ebc33.jpg?v=1783925389610"
      ],
      "sku": "NGX-OPLUS-2in1-DOQUYENRU-3500",
      "unit": "Chai",
      "shippingWeight": {
        "value": 4,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-xa-oplus-2in1-huong-do-quyen-ru-chai-3500"
    },
    {
      "id": 84453004,
      "slug": "nuoc-rua-chen-pano-vitamin-e-tui-3500",
      "name": "Nước rửa chén Pano Vitamin E Túi 3.5kg",
      "brand": "Pano",
      "brandSlug": "pano",
      "category": "Nước rửa chén",
      "categorySlug": "nuoc-rua-chen",
      "tags": [
        "Nước rửa chén",
        "Pano"
      ],
      "price": 59000,
      "compareAtPrice": 117000,
      "discountPercent": 50,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/tui-nrc-pano.jpg?v=1783490778873",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/tui-nrc-pano.jpg?v=1783490778873",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-72-d8e7bf2b-dec8-4f93-95b5-67025a40e3a0-8df1e74c-0e8b-43bf-ac8a-b7a534cd7960.jpg?v=1783490778873"
      ],
      "sku": "NRC-PANO-E-3500",
      "unit": "Túi",
      "shippingWeight": {
        "value": 3.7,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-rua-chen-pano-vitamin-e-tui-3500"
    },
    {
      "id": 84452714,
      "slug": "nuoc-rua-chen-zeo-enzim-huong-chanh-chai-1500g",
      "name": "Nước rửa chén ZEO enzyme hương chanh chai 1.5kg",
      "brand": "ZeO",
      "brandSlug": "zeo",
      "category": "Nước rửa chén",
      "categorySlug": "nuoc-rua-chen",
      "tags": [
        "Enzyme",
        "Nước rửa chén",
        "zeo"
      ],
      "price": 37000,
      "compareAtPrice": 72000,
      "discountPercent": 49,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/nrc-zeo-chanh-1-5kg.png?v=1783653096580",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/nrc-zeo-chanh-1-5kg.png?v=1783653096580",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-79.jpg?v=1783653096580"
      ],
      "sku": "NRC-ZEO-ENZYME-CHANH-1500",
      "unit": "Chai",
      "shippingWeight": {
        "value": 1.7,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-rua-chen-zeo-enzim-huong-chanh-chai-1500g"
    },
    {
      "id": 84452351,
      "slug": "nuoc-giat-oplus-xanh-ngan-hoa-diu-nhe-can-3-5kg",
      "name": "Nước giặt Oplus Xanh Ngàn Hoa Dịu Nhẹ Can 3.5kg",
      "brand": "Oplus",
      "brandSlug": "oplus",
      "category": "Nước giặt",
      "categorySlug": "nuoc-giat",
      "tags": [
        "Oplus",
        "oplus 2in1",
        "flashsale"
      ],
      "price": 137000,
      "compareAtPrice": 267000,
      "discountPercent": 49,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/ng-oplus-xanh-ef402de5-7c2a-4a60-b33f-00e5771c3a70.png?v=1783569037437",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/ng-oplus-xanh-ef402de5-7c2a-4a60-b33f-00e5771c3a70.png?v=1783569037437",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-31-6208a7fe-e77d-4b48-b5a5-c28b6cd44ea4.jpg?v=1783569037437"
      ],
      "sku": "NG-OPLUS-XANH-NGANHOA-3500",
      "unit": "Can",
      "shippingWeight": {
        "value": 3.7,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-oplus-xanh-ngan-hoa-diu-nhe-can-3-5kg"
    },
    {
      "id": 84119895,
      "slug": "nuoc-lau-san-oplus-huong-sa-chanh-1-kg",
      "name": "Nước lau sàn Oplus hương sả chanh chai 1kg",
      "brand": "Oplus",
      "brandSlug": "oplus",
      "category": "Nước lau sàn",
      "categorySlug": "nuoc-lau-san",
      "tags": [
        "flashsale",
        "nước lau sàn"
      ],
      "price": 27000,
      "compareAtPrice": 53000,
      "discountPercent": 49,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/nls-sa-chanh.png?v=1783491017760",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/nls-sa-chanh.png?v=1783491017760",
        "https://bizweb.dktcdn.net/100/342/100/products/nls.png?v=1783491017760",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-74.jpg?v=1783491017760"
      ],
      "sku": "NLS-OPLUS-SACHANH-1000",
      "unit": "1 chai",
      "shippingWeight": {
        "value": 1.2,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-lau-san-oplus-huong-sa-chanh-1-kg"
    },
    {
      "id": 84117293,
      "slug": "nuoc-giat-xa-oplus-2in1-luu-huong-kep-bao-tim-1-8-kg",
      "name": "Nước giặt xả Oplus 2in1 lưu hương kép hương nước hoa Pháp 1,8 Kg",
      "brand": "Oplus",
      "brandSlug": "oplus",
      "category": "Nước giặt xả",
      "categorySlug": "nuoc-giat-xa",
      "tags": [
        "Nước giặt xả",
        "Oplus"
      ],
      "price": 67000,
      "compareAtPrice": 132000,
      "discountPercent": 49,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/thumbnail-nls-36.png?v=1783491032333",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/thumbnail-nls-36.png?v=1783491032333",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-02.jpg?v=1783491032333"
      ],
      "sku": "NGX-OPLUS-NUOCHOA-1800",
      "unit": "Túi",
      "shippingWeight": {
        "value": 2,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-xa-oplus-2in1-luu-huong-kep-bao-tim-1-8-kg"
    },
    {
      "id": 84103834,
      "slug": "nuoc-giat-zeo-bio-enzyme-sach-sieu-nhanh-3-phut-9-kg",
      "name": "Nước giặt Zeo BiO Enzyme sạch siêu nhanh 3 phút can 9 Kg",
      "brand": "ZeO",
      "brandSlug": "zeo",
      "category": "Nước giặt",
      "categorySlug": "nuoc-giat",
      "tags": [
        "flashsale",
        "nước giặt",
        "zeo"
      ],
      "price": 237000,
      "compareAtPrice": 473000,
      "discountPercent": 50,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/enzyme.jpg?v=1783499768097",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/enzyme.jpg?v=1783499768097",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-75.jpg?v=1783499768097",
        "https://bizweb.dktcdn.net/100/342/100/products/enzyme-tiem-giat-05.jpg?v=1783499768097",
        "https://bizweb.dktcdn.net/100/342/100/products/enzyme-tiem-giat-06.jpg?v=1783499768097",
        "https://bizweb.dktcdn.net/100/342/100/products/enzyme-tiem-giat-07.jpg?v=1783499768097"
      ],
      "sku": "NG-ZEO-BIOENZYME-9000",
      "unit": "can",
      "shippingWeight": {
        "value": 9.2,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-zeo-bio-enzyme-sach-sieu-nhanh-3-phut-9-kg"
    },
    {
      "id": 84103652,
      "slug": "nuoc-giat-zeo-bio-enzyme-sach-sieu-nhanh-3-phut-2-kg",
      "name": "Nước giặt Zeo BiO Enzyme sạch siêu nhanh 3 phút can 2Kg",
      "brand": "ZeO",
      "brandSlug": "zeo",
      "category": "Nước giặt",
      "categorySlug": "nuoc-giat",
      "tags": [
        "zeo",
        "flashsale",
        "nước giặt"
      ],
      "price": 89000,
      "compareAtPrice": 170000,
      "discountPercent": 48,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/enzyme-2kg.jpg?v=1783499789110",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/enzyme-2kg.jpg?v=1783499789110",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-76.jpg?v=1783499789110",
        "https://bizweb.dktcdn.net/100/342/100/products/enzyme-tiem-giat-05-b5cc8359-f33a-4f04-ad4f-d3b40bf21dee.jpg?v=1783499789110",
        "https://bizweb.dktcdn.net/100/342/100/products/enzyme-tiem-giat-06-34c4826b-3826-4794-b83c-b7dae94b0432.jpg?v=1783499789110",
        "https://bizweb.dktcdn.net/100/342/100/products/enzyme-tiem-giat-07-8d9b6d5d-8e22-45d7-a75e-bc89a6f06b38.jpg?v=1783499789110"
      ],
      "sku": "NG-ZEO-BIOENZYME-2000",
      "unit": "can",
      "shippingWeight": {
        "value": 2.2,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-zeo-bio-enzyme-sach-sieu-nhanh-3-phut-2-kg"
    },
    {
      "id": 83638937,
      "slug": "nuoc-giat-oplus-xanh",
      "name": "Nước giặt Oplus Xanh Ngàn Hoa Dịu Nhẹ Chai 1kg",
      "brand": "Oplus",
      "brandSlug": "oplus",
      "category": "Nước giặt",
      "categorySlug": "nuoc-giat",
      "tags": [
        "nước giặt",
        "Oplus"
      ],
      "price": 47000,
      "compareAtPrice": 93000,
      "discountPercent": 49,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/ng-oplus-xanh-1kg.png?v=1783644001107",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/ng-oplus-xanh-1kg.png?v=1783644001107",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-28.jpg?v=1783644001107"
      ],
      "sku": "NG-OPLUS-XANH-NGANHOA-1000",
      "unit": "Chai",
      "shippingWeight": {
        "value": 1.2,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-oplus-xanh"
    },
    {
      "id": 38863750,
      "slug": "nuoc-rua-chen-oplus-sach-nhanh-1-5-kg",
      "name": "Nước rửa chén Oplus sạch nhanh can 1,5kg",
      "brand": "Oplus",
      "brandSlug": "oplus",
      "category": "Nước rửa chén",
      "categorySlug": "nuoc-rua-chen",
      "tags": [
        "Nước rửa chén",
        "flashsale"
      ],
      "price": 37000,
      "compareAtPrice": 72000,
      "discountPercent": 49,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/nrc-oplus-1-5kg.jpg?v=1783909671403",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/nrc-oplus-1-5kg.jpg?v=1783909671403",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-82.jpg?v=1783909671403"
      ],
      "sku": "NRC-OPLUS-SACHNHANH-1500",
      "unit": "Can",
      "shippingWeight": {
        "value": 1.7,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-rua-chen-oplus-sach-nhanh-1-5-kg"
    },
    {
      "id": 27456489,
      "slug": "nuoc-giat-xa-zeo-3in1-tui-2-2kg",
      "name": "Nước giặt xả ZeO 3in1 Polymer Bạc Diệt Khuẩn Túi 2,2kg",
      "brand": "ZeO",
      "brandSlug": "zeo",
      "category": "Nước giặt xả",
      "categorySlug": "nuoc-giat-xa",
      "tags": [
        "zeo",
        "Nước giặt xả",
        "flashsale"
      ],
      "price": 111000,
      "compareAtPrice": 220000,
      "discountPercent": 50,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/zeo-matic.jpg?v=1783491195583",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/zeo-matic.jpg?v=1783491195583",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-91.jpg?v=1783491195583"
      ],
      "sku": "NGX-ZEO-3in1-POLYMER-2200",
      "unit": "Túi",
      "shippingWeight": {
        "value": 2.5,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-xa-zeo-3in1-tui-2-2kg"
    },
    {
      "id": 22085531,
      "slug": "nuoc-giat-pano-khu-mui-can-tim-3800g",
      "name": "Nước giặt Pano Khử Mùi Can Tím 3.8Kg",
      "brand": "Pano",
      "brandSlug": "pano",
      "category": "Nước giặt",
      "categorySlug": "nuoc-giat",
      "tags": [
        "nước giặt",
        "Pano",
        "flashsale"
      ],
      "price": 124000,
      "compareAtPrice": 246000,
      "discountPercent": 50,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/ng-pano-3-8kg-tim.png?v=1783570163267",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/ng-pano-3-8kg-tim.png?v=1783570163267",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-81.jpg?v=1783570163267"
      ],
      "sku": "NG-PANO-VEILEX-TIM-3800",
      "unit": "Can",
      "shippingWeight": {
        "value": 4,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-pano-khu-mui-can-tim-3800g"
    },
    {
      "id": 14571256,
      "slug": "bot-giat-oplus-tiet-kiem-nuoc-2kg",
      "name": "Bột Giặt OPLUS Tiết Kiệm Nước Túi 2kg",
      "brand": "Oplus",
      "brandSlug": "oplus",
      "category": "Bột giặt",
      "categorySlug": "bot-giat",
      "tags": [
        "Bột giặt",
        "Oplus",
        "flashsale"
      ],
      "price": 62000,
      "compareAtPrice": 124000,
      "discountPercent": 50,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/bg-oplus-tiet-kiem-nuoc-2kg.jpg?v=1783907060273",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/bg-oplus-tiet-kiem-nuoc-2kg.jpg?v=1783907060273",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-11.jpg?v=1783491288253",
        "https://bizweb.dktcdn.net/100/342/100/products/tiet-kiem-nuoc.jpg?v=1783907060273"
      ],
      "sku": "BG-OPLUS-TIETKIEMNUOC-2KG",
      "unit": "Túi",
      "shippingWeight": {
        "value": 2.2,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/bot-giat-oplus-tiet-kiem-nuoc-2kg"
    },
    {
      "id": 13632222,
      "slug": "nuoc-tay-javel-zeo-1lit",
      "name": "Nước tẩy Javel - ZeO 1 lít",
      "brand": "ZeO",
      "brandSlug": "zeo",
      "category": "Tẩy rửa",
      "categorySlug": "tay-rua",
      "tags": [
        "Javel",
        "nước tẩy",
        "tẩy toilet"
      ],
      "price": 15000,
      "compareAtPrice": 29000,
      "discountPercent": 48,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/tay-javvel.png?v=1783491298193",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/tay-javvel.png?v=1783491298193",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-90.jpg?v=1783491298193"
      ],
      "sku": "NTT-ZEO-1000",
      "unit": "chai",
      "shippingWeight": {
        "value": 1,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-tay-javel-zeo-1lit"
    },
    {
      "id": 13585248,
      "slug": "nuoc-giat-oplus-khu-mui-1kg-tim",
      "name": "Nước Giặt OPLUS 2in1 Khử Mùi Mềm Vải Tím Can 1kg",
      "brand": "Oplus",
      "brandSlug": "oplus",
      "category": "Nước giặt",
      "categorySlug": "nuoc-giat",
      "tags": [
        "Khử mùi",
        "nước giặt",
        "Oplus"
      ],
      "price": 47000,
      "compareAtPrice": 93000,
      "discountPercent": 49,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/ng-oplus-tim-1kg.png?v=1783653770800",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/ng-oplus-tim-1kg.png?v=1783653770800",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-29.jpg?v=1783653770800"
      ],
      "sku": "NG-OPLUS-2in1-VEILEX-TIM-1000",
      "unit": "Can",
      "shippingWeight": {
        "value": 1,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-oplus-khu-mui-1kg-tim"
    },
    {
      "id": 13582869,
      "slug": "nuoc-giat-pano-khu-mui-huong-dam-me-tim-3800",
      "name": "Nước giặt PANO Khử Mùi Hương Đam Mê Tím Can 3.8kg",
      "brand": "Pano",
      "brandSlug": "pano",
      "category": "Nước giặt",
      "categorySlug": "nuoc-giat",
      "tags": [
        "Pano",
        "nước giặt",
        "Khử mùi"
      ],
      "price": 170000,
      "compareAtPrice": null,
      "discountPercent": null,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/pano-dam-me-3.jpg?v=1783671175713",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/pano-dam-me-3.jpg?v=1783671175713",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-85-82fab143-7394-45df-b715-4a598f4f1c64.jpg?v=1783671175713"
      ],
      "sku": "NG-PANO-DAMME-3800",
      "unit": "Can",
      "shippingWeight": {
        "value": 4,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/nuoc-giat-pano-khu-mui-huong-dam-me-tim-3800"
    },
    {
      "id": 13582347,
      "slug": "bot-giat-zeo-khu-mui-manh-me",
      "name": "Bột giặt ZeO Nước Hoa Tím túi 4.5Kg",
      "brand": "ZeO",
      "brandSlug": "zeo",
      "category": "Bột giặt",
      "categorySlug": "bot-giat",
      "tags": [
        "Bột giặt",
        "zeo",
        "flashsale"
      ],
      "price": 150000,
      "compareAtPrice": 299000,
      "discountPercent": 50,
      "thumbnail": "https://bizweb.dktcdn.net/100/342/100/products/bg-zeo-ng-6kg.jpg?v=1783910828420",
      "images": [
        "https://bizweb.dktcdn.net/100/342/100/products/bg-zeo-ng-6kg.jpg?v=1783910828420",
        "https://bizweb.dktcdn.net/100/342/100/products/thumbl-nail-web-16.jpg?v=1783910828420"
      ],
      "sku": "BG-ZEO-NUOCHOA-4500",
      "unit": "Túi",
      "shippingWeight": {
        "value": 4.8,
        "unit": "kg"
      },
      "available": true,
      "url": "https://zeo.vn/bot-giat-zeo-khu-mui-manh-me"
    }
  ]
};

function formatZeoPrice(value) {
  if (value === null || value === undefined) return null;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: ZEO_PRODUCT_DATA.currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function getZeoProductById(id) {
  return ZEO_PRODUCT_DATA.products.find((product) => product.id === Number(id)) || null;
}

function filterZeoProducts({ brand, category, available = true } = {}) {
  return ZEO_PRODUCT_DATA.products.filter((product) => {
    if (available !== null && product.available !== available) return false;
    if (brand && product.brandSlug !== brand && product.brand !== brand) return false;
    if (category && product.categorySlug !== category && product.category !== category) return false;
    return true;
  });
}

if (typeof window !== "undefined") {
  window.ZEO_PRODUCT_DATA = ZEO_PRODUCT_DATA;
  window.ZEO_PRODUCTS = ZEO_PRODUCT_DATA.products;
  window.formatZeoPrice = formatZeoPrice;
  window.getZeoProductById = getZeoProductById;
  window.filterZeoProducts = filterZeoProducts;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ZEO_PRODUCT_DATA,
    ZEO_PRODUCTS: ZEO_PRODUCT_DATA.products,
    formatZeoPrice,
    getZeoProductById,
    filterZeoProducts,
  };
}
