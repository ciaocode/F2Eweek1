// TDX API串接
// 指定縣市-台北: "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON"

//宣告另一個變數，用來存取資料網址
// 首頁:不分區觀光景點
var dataUrl = "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON"
// 建立一個物件，存入變數 tdxXhr，準備用來server發出請求
var tdxXhr = new XMLHttpRequest()
// 使用 XMLHttpRequest的method: open(),初始化新創建的請求。
// method:'GET', 資料來源網址: dataUrl, 非同步請求: true(預設值)。
tdxXhr.open('GET',dataUrl, true)
// send() sends the request to the server. 
tdxXhr.send() 
// 載入網頁後，呼叫函式
tdxXhr.onload = function(){
    // 先存一份資料回到本地端，避免API被擋而無法取得資料。
    // document.getElementById("TDX_Contain").innerHTML = this.responseText;

    // 處理回傳的字串型別，存入變數data
    var dataset = JSON.parse(this.responseText);
    // console.log(data);    
    // 確認資料回傳成功後，將資料傳入指定的function
    show(dataset)
}


// 呼叫已取得資料的函式
function show(dataset){
  // 使用 forEach迴圈取得陣列中的資料
	dataset.forEach( (data, index) => {
    // 在 HTML上建立新element物件
		let newCard = document.createElement("div")
    // 設定class name
		newCard.className = "infoCard"
    // 選擇 要產生資料的父層區域
		document.querySelector("#TDX_Contain").appendChild(newCard)
    // 創建存放內容資料的物件，設定class跟 key.value
		let newCardInfo = `
      <img class="picture" src="${data.Picture.PictureUrl1}" alt="${data.Picture.PictureDescription1}" />
			<h3 class="scenicSpot">${data.ScenicSpotName}</h3>
			<p class="address">${data.Address}</p>
		`
    // 把資料物件傳入已在網頁建立的新物件
		newCard.innerHTML = newCardInfo
	})
}

// 參考資料：https://ithelp.ithome.com.tw/articles/10251803