/**
 * 初始化navPath
 */
function initNavPath() {
  let navPath = document.querySelector(".goods_content .nav_path");
  var paths = goodsData.paths;
  for (let i = 0; i < paths.length; i++) {
    if (i === paths.length - 1) {
      let aEle = document.createElement("a");
      aEle.innerText = paths[i].title;
      navPath.appendChild(aEle);
    } else {
      let aEle = document.createElement("a");
      aEle.href = paths[i].url;
      aEle.innerText = paths[i].title;
      let iEle = document.createElement("i");
      iEle.innerText = "/";
      navPath.appendChild(aEle);
      navPath.appendChild(iEle);
    }
  }
}
initNavPath();

/**
 * 图片预览
 */
function initPreview() {
  let smallPreviewWrap = document.querySelector(
    ".goods_content .goods_wrap .goods_preview .preview_wrap .small_preview_wrap"
  );
  let mask = document.querySelector(
    ".goods_content .goods_wrap .goods_preview .preview_wrap .small_preview_wrap .mask"
  );
  let bigPreviewWrap = document.querySelector(
    ".goods_content .goods_wrap .goods_preview .preview_wrap .big_preview_wrap"
  );
  let bigImg = document.querySelector(
    ".goods_content .goods_wrap .goods_preview .preview_wrap .big_preview_wrap img"
  );
  smallPreviewWrap.onmousemove = function (event) {
    let left =
      event.clientX -
      smallPreviewWrap.getBoundingClientRect().left -
      mask.offsetWidth / 2;
    let top =
      event.clientY -
      smallPreviewWrap.getBoundingClientRect().top -
      mask.offsetHeight / 2;

    // 限制范围
    if (left < 0) {
      left = 0;
    } else if (left > smallPreviewWrap.clientWidth - mask.offsetWidth) {
      left = smallPreviewWrap.clientWidth - mask.offsetWidth;
    }
    if (top < 0) {
      top = 0;
    } else if (top > smallPreviewWrap.clientHeight - mask.offsetHeight) {
      top = smallPreviewWrap.clientHeight - mask.offsetHeight;
    }

    // 移动mask
    mask.style.left = left + "px";
    mask.style.top = top + "px";

    // 计算小图与大图的比例
    let scale =
      (smallPreviewWrap.clientWidth - mask.offsetWidth) /
      (bigImg.offsetWidth - bigPreviewWrap.clientWidth);
    // 移动大图
    bigImg.style.left = -left / scale + "px";
    bigImg.style.top = -top / scale + "px";
  };
}
initPreview();

/**
 * 初始化底部缩略图
 */
function initThumbnail() {
  let currentIndex = 0;
  let imageUrls = goodsData.imageUrls;
  let ul = document.querySelector(
    ".goods_content .goods_wrap .goods_preview .thumbnail_wrap .pic_list ul"
  );
  let bigImg = document.querySelector(
    ".goods_content .goods_wrap .goods_preview .preview_wrap .big_preview_wrap img"
  );
  let smallImg = document.querySelector(
    ".goods_content .goods_wrap .goods_preview .preview_wrap .small_preview_wrap img"
  );

  bigImg.src = imageUrls[currentIndex].b;
  smallImg.src = imageUrls[currentIndex].s;
  for (let i = 0; i < imageUrls.length; i++) {
    let liEle = document.createElement("li");
    let imgEle = document.createElement("img");
    imgEle.src = imageUrls[i].s;
    liEle.appendChild(imgEle);
    liEle.index = i;
    ul.appendChild(liEle);
  }

  let lis = document.querySelectorAll(
    ".goods_content .goods_wrap .goods_preview .thumbnail_wrap .pic_list ul li"
  );
  for (let i = 0; i < lis.length; i++) {
    lis[i].idx = i;
    lis[i].onclick = function () {
      currentIndex = this.index;
      bigImg.src = imageUrls[currentIndex].b;
      smallImg.src = imageUrls[currentIndex].s;
    };
  }

  let prev = document.querySelector(
    " .goods_content .goods_wrap .goods_preview .thumbnail_wrap a.prev"
  );
  let next = document.querySelector(
    " .goods_content .goods_wrap .goods_preview .thumbnail_wrap a.next"
  );
  let start = 0;
  let step = (lis[0].offsetWidth + 20) * 2;
  let end = (lis.length - 5) * (lis[0].offsetWidth + 20);
  prev.onclick = function () {
    start += step;
    if (start > 0) {
      start = 0;
    }
    ul.style.left = start + "px";
  };
  next.onclick = function () {
    start -= step;
    if (start < -end) {
      start = -end;
    }
    ul.style.left = start + "px";
  };
}
initThumbnail();

/**
 * 初始化购物车信息
 */
function initShopCar() {
  let goodsDetail = goodsData.goodsDetail;
  let title = document.querySelector(
    ".goods_content .goods_wrap .goods_info .title"
  );
  let recommend = document.querySelector(
    ".goods_content .goods_wrap .goods_info .recommend"
  );
  let price = document.querySelector(
    ".goods_content .goods_wrap .goods_info .price_wrap .price_box .price"
  );
  let evaluate = document.querySelector(
    ".goods_content .goods_wrap .goods_info .price_wrap .evaluate_box .evaluate"
  );
  let type = document.querySelector(
    ".goods_content .goods_wrap .goods_info .promotion_wrap p .promotion_type"
  );
  let content = document.querySelector(
    ".goods_content .goods_wrap .goods_info .promotion_wrap p .promotion_content"
  );
  let support = document.querySelector(
    ".goods_content .goods_wrap .goods_info .support_wrap .support"
  );
  let address = document.querySelector(
    ".goods_content .goods_wrap .goods_info .address_wrap .address"
  );
  let styleWrap = document.querySelector(
    ".goods_content .goods_wrap .goods_info .style_wrap"
  );
  title.innerText = goodsDetail.title;
  recommend.innerText = goodsDetail.recommend;
  price.innerText = goodsDetail.price;
  evaluate.innerText = goodsDetail.evaluateNum;
  type.innerText = goodsDetail.promoteSales.type;
  content.innerText = goodsDetail.promoteSales.content;
  support.innerText = goodsDetail.support;
  address.innerText = goodsDetail.address;
  let selectedArr = [0, 0, 0, 0];
  for (let i = 0; i < goodsDetail.crumbData.length; i++) {
    let dlEle = document.createElement("dl");
    let dt = document.createElement("dt");
    dt.innerText = goodsDetail.crumbData[i].title;
    dlEle.appendChild(dt);
    for (let j = 0; j < goodsDetail.crumbData[i].data.length; j++) {
      let dd = document.createElement("dd");
      dd.innerText = goodsDetail.crumbData[i].data[j].type;
      dd.setAttribute("price", goodsDetail.crumbData[i].data[j].changePrice);
      dd.setAttribute("typeName", goodsDetail.crumbData[i].data[j].type);
      dd.setAttribute("row", i);
      dd.setAttribute("col", j);
      dd.onclick = function () {
        selectedArr[i] = this;
        changeShopLabel(i, j);
        changePrice(selectedArr);
        changeShopChoose(selectedArr);
      };
      if (j == 0) {
        dd.classList.add("active");
      }
      dlEle.appendChild(dd);
    }
    styleWrap.appendChild(dlEle);
  }
  setCollocationPrice(goodsDetail.price);
}
initShopCar();

/**
 * 更新选择区
 */
function changeShopChoose(selectedArr) {
  let markList = document.querySelectorAll(
    ".goods_content .goods_wrap .goods_info .choose_wrap .mark"
  );
  for (let i = 0; i < selectedArr.length; i++) {
    if (selectedArr[i]) {
      let spanEle = markList[i].querySelector("span");
      let aEle = markList[i].querySelector("a");
      let typeName = selectedArr[i].getAttribute("typeName");
      spanEle.innerText = typeName;
      aEle.onclick = function () {
        let index = Number(this.getAttribute("index"));
        markList[index].classList.remove("active");
        selectedArr[i] = 0;
        changePrice(selectedArr);
        changeShopLabel(i, 0);
      };
      markList[i].classList.add("active");
    } else {
      markList[i].classList.remove("active");
    }
  }
}

/**
 * 更新价格
 */
function changePrice(selectedArr) {
  let priceEle = document.querySelector(
    ".goods_content .goods_wrap .goods_info .price_wrap .price_box .price"
  );
  let price = goodsData.goodsDetail.price;
  for (let i = 0; i < selectedArr.length; i++) {
    if (selectedArr[i]) {
      let p = Number(selectedArr[i].getAttribute("price"));
      price += p;
    }
  }
  priceEle.innerText = price;
  setCollocationPrice(price);
}

/**
 * 更新标签
 */
function changeShopLabel(i, j) {
  let dlList = document.querySelectorAll(
    ".goods_content .goods_wrap .goods_info .style_wrap dl"
  );
  let ddList = dlList[i].querySelectorAll("dd");
  for (let m = 0; m < ddList.length; m++) {
    if (m === j) {
      ddList[m].classList.add("active");
    } else {
      ddList[m].classList.remove("active");
    }
  }
}

/**
 * 左边侧边栏切换
 */
function leftAside() {
  let h4List = document.querySelectorAll(
    ".goods_detail .left_aside .aside_top>h4"
  );
  let leftContentList = document.querySelectorAll(
    ".goods_detail .left_aside .aside_content>div"
  );
  for (let i = 0; i < h4List.length; i++) {
    h4List[i].onclick = function () {
      h4List.forEach((value, index) => {
        h4List[index].classList.remove("active");
        leftContentList[index].classList.remove("active");
      });
      h4List[i].classList.add("active");
      leftContentList[i].classList.add("active");
    };
  }
}
leftAside();

/**
 * 初始化搭配点击事件
 */
function initCollocationPrice() {
  let inputList = document.querySelectorAll(
    ".goods_detail .right_detail .collocation_wrap div ul li div input[type=checkbox]"
  );
  for (let i = 0; i < inputList.length; i++) {
    inputList[i].onclick = function () {
      calculatePrice();
    };
  }
}
initCollocationPrice();

/**
 * 设置搭配手机价格
 */
function setCollocationPrice(phonePrice) {
  let phonePriceEle = document.querySelector(
    ".goods_detail .right_detail .list_wrap .left p"
  );
  phonePriceEle.innerText = "¥" + phonePrice;
  calculatePrice();
}

/**
 * 计算价格
 */
function calculatePrice() {
  let inputList = document.querySelectorAll(
    ".goods_detail .right_detail .collocation_wrap div ul li div input[type=checkbox]"
  );
  let newPriceEle = document.querySelector(
    ".goods_detail .right_detail .collocation_wrap  div .right > i"
  );
  let phonePriceEle = document.querySelector(
    ".goods_detail .right_detail .list_wrap .left p"
  );
  let totalPrice = 0;
  totalPrice += Number(phonePriceEle.innerText.slice(1));
  inputList.forEach((item) => {
    if (item.checked) {
      totalPrice += Number(item.value);
    }
  });
  newPriceEle.innerText = "¥" + totalPrice;
}

/**
 * 初始化右边选项卡
 */
function initTabBtns() {
  let btns = document.querySelectorAll(
    ".goods_detail .right_detail .right_tabs_wrap .tab_btns li"
  );
  let contents = document.querySelectorAll(
    ".goods_detail .right_detail .right_tabs_wrap .tab_contents div"
  );
  for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
      btns.forEach((value, index) => {
        if (i === index) {
          btns[i].classList.add("active");
          contents[i].classList.add("active");
        } else {
          btns[index].classList.remove("active");
          contents[index].classList.remove("active");
        }
      });
    };
  }
}
initTabBtns();
