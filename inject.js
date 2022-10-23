// add style sheet
let newStyle = `
	<style>
		.row-outline {
			outline: 1px solid #00cec9;
			background: #c3edf6;
		}

		.row-checked {
			background: #c3f6c6 !important;
		}

		.display-none {
			display: none !important;
		}
	</style>
`
document.head.insertAdjacentHTML("beforeend", newStyle)

// add tracking variables
let forums = document.querySelector("#module_1"),
	rows = forums.querySelectorAll("[id^=GSUB_itemline_thread_]"),
	currentRowNum = 0,
	currentRowId = rows[0].id,
	currentRow,
	rowCheckbox,
	tempCheckbox,
	tempCheckboxes,
	listArray = [],
	pageCommands,
	previousPageLink,
	nextPageLink

function setupSelection() {
	forums = document.querySelector("#module_1")
	rows = forums.querySelectorAll("[id^=GSUB_itemline_thread_]")
	listArray = []

	// delete any old checkboxes
	let delCheckboxes = document.querySelectorAll(".rowCheckbox")
	delCheckboxes.forEach(
		function(elm) {
			elm.remove()
		}
	)

	// add checkboxes
	rows.forEach(
		function(elm) {
			listArray.push(elm.id)
			rowCheckbox = "<input class='rowCheckbox' type='checkbox' id='chk" + elm.id + "' />"
			elm.querySelector(".geeksub_minorlink").insertAdjacentHTML("beforebegin", rowCheckbox)
			elm.querySelector("a[onclick^=GSUB_MarkRead]").classList.add(`chk${elm.id}btn`)
		}
	);
}

// init arrays and add checkboxes
setupSelection()

// outline and scroll to the 1st row
currentRow = document.getElementById(listArray[0])
currentRow.classList.add("row-outline")
scrollToMiddleElement(currentRow)


// add event listener for key presses
document.addEventListener("keydown", (event) => {
	// console.log(event.code)

	// prevent key shortcuts when typing into a text box
	var elem = event.target;
	var type = elem.getAttribute("type");
	if(type != 'text' && type != 'textarea') {

		currentRowNum = listArray.indexOf(currentRowId)

		//--------------
		//-- J - next --
		//--------------
		if (event.code === "KeyJ") {
			moveCursorNextMessage()
		}
		//------------------
		//-- K - previous --
		//------------------
		else if (event.code === "KeyK") {
			moveCursorPreviousMessage()
		}
		//-----------------------
		//-- Enter - goto post --
		//-----------------------
		else if (event.code === "Enter") {
			let thisLink = document.querySelectorAll(`#${currentRowId} a[href^='/thread/']`)[0]
			thisLink.click()
		}
		//----------------
		//-- X - select --
		//----------------
		else if (event.code === "KeyX") {
			selectMessage()
		}
		//--------------------
		//-- A - select all --
		//--------------------
		else if (event.code === "KeyA") {
			selectAllMessages()
		}
		//--------------------
		//-- I - select all --
		//--------------------
		else if (event.code === "KeyI") {
			invertSelectMessages()
		}
		//---------------------
		//-- N - select none --
		//---------------------
		else if (event.code === "KeyN") {
			deselectAllMessages()
		}
		//-------------------
		//-- D - mark read --
		//-------------------
		else if (event.code === "KeyD") {
			markMessageRead()
		}
		//----------------------------
		//-- Arrow Left - next page --
		//----------------------------
		else if (event.code === "ArrowLeft") {
			pageLeft()
		}
		//-----------------------------
		//-- Arrow Right - next page --
		//-----------------------------
		else if (event.code === "ArrowRight") {
			pageRight()
		}
		//---------------------
		//-- T - top message --
		//---------------------
		else if (event.code === "KeyT") {
			moveCursorTopMessage()
		}
		//------------------------
		//-- B - bottom message --
		//------------------------
		else if (event.code === "KeyB") {
			moveCursorBottomMessage()
		}
		//-------------------------
		//-- H - hide top bar ad --
		//-------------------------
		else if (event.code === "KeyH") {
			hideAd()
		}
	}
});

// =================================================
// == scroll page to the middle of passed element ==
// =================================================
function scrollToMiddleElement(scrollElm) {
	let elementRect = scrollElm.getBoundingClientRect(),
		absoluteElementTop = elementRect.top + window.pageYOffset,
		middle = absoluteElementTop - (window.innerHeight / 2)

	window.scrollTo({
		top: middle,
		left: 0,
		behavior: 'smooth'
	})
}

// =====================================
// == move cursor to the next message ==
// =====================================
function moveCursorNextMessage() {
	if (currentRowNum < (listArray.length - 1)) {
		currentRow = document.getElementById(currentRowId)
		currentRow.classList.remove("row-outline")
		currentRowNum += 1
		currentRowId = listArray[currentRowNum]
		currentRow = document.getElementById(currentRowId)
		scrollToMiddleElement(currentRow)
		currentRow.classList.add("row-outline")
	}
	else {
		//pageRight()
	}
}

// =========================================
// == move cursor to the previous message ==
// =========================================
function moveCursorPreviousMessage() {
	if (currentRowNum > 0) {
		currentRow = document.getElementById(currentRowId)
		currentRow.classList.remove("row-outline")
		currentRowNum += -1
		currentRowId = listArray[currentRowNum]
		currentRow = document.getElementById(currentRowId)
		scrollToMiddleElement(currentRow)
		currentRow.classList.add("row-outline")
	}
	else {
		//pageLeft()
	}
}

// ====================================
// == move cursor to the top message ==
// ====================================
function moveCursorTopMessage() {
	if (currentRowNum > 0) {
		currentRow = document.getElementById(currentRowId)
		currentRow.classList.remove("row-outline")
		currentRowNum = 0
		currentRowId = listArray[currentRowNum]
		currentRow = document.getElementById(currentRowId)
		scrollToMiddleElement(currentRow)
		currentRow.classList.add("row-outline")
	}
}

// =======================================
// == move cursor to the bottom message ==
// =======================================
function moveCursorBottomMessage() {
	if (currentRowNum < (listArray.length - 1)) {
		currentRow = document.getElementById(currentRowId)
		currentRow.classList.remove("row-outline")
		currentRowNum = (listArray.length - 1)
		currentRowId = listArray[currentRowNum]
		currentRow = document.getElementById(currentRowId)
		scrollToMiddleElement(currentRow)
		currentRow.classList.add("row-outline")
	}
}

// ============================
// == select current message ==
// ============================
function selectMessage() {
	tempCheckbox = document.getElementById(`chk${currentRowId}`)
	tempCheckbox.click()
	if (tempCheckbox.checked) {
		currentRow.classList.add("row-checked")
	} else {
		currentRow.classList.remove("row-checked")
	}
}

// =========================
// == select all messages ==
// =========================
function selectAllMessages() {
	listArray.forEach(
		function(elm) {
			document.getElementById(elm).classList.add("row-checked")
			document.getElementById(`chk${elm}`).checked = true
		}
	)
}

// ==================================
// == invert selection of messages ==
// ==================================
function invertSelectMessages() {
	listArray.forEach(
		function(elm) {
			if (document.getElementById(`chk${elm}`).checked === true) {
				document.getElementById(elm).classList.remove("row-checked")
				document.getElementById(`chk${elm}`).checked = false
			} else {
				document.getElementById(elm).classList.add("row-checked")
				document.getElementById(`chk${elm}`).checked = true
			}
		}
	)
}

// ===========================
// == deselect all messages ==
// ===========================
function deselectAllMessages() {
	listArray.forEach(
		function(elm) {
			document.getElementById(elm).classList.remove("row-checked")
			document.getElementById(`chk${elm}`).checked = false
		}
	)
}

// ==============================================
// == mark current or checked messages as read ==
// ==============================================
function markMessageRead() {
	let anythingChecked = false
	let thisMessage
	tempCheckboxes = document.querySelectorAll("[id^=chkGSUB_itemline_thread_]")
	tempCheckboxes.forEach(
		function(elm) {
			if (elm.checked) {
				anythingChecked = true
				thisMessage = document.querySelector(`.${elm.id}btn`)
				thisMessage.click()
			}
		}
	)

	if (anythingChecked === false) {
		thisMessage = document.querySelector(`.chk${currentRowId}btn`)
		thisMessage.click()
	}

	setTimeout(() => {
		setupSelection()
		currentRowId = listArray[currentRowNum]
		currentRow = document.getElementById(currentRowId)
		currentRow.classList.add("row-outline")
	}, 2000)
}

// =======================================
// == move to previous page of messages ==
// =======================================
function pageLeft() {
	let pageCommand
	pageCommands = document.querySelectorAll("#subform_1 + .moduletable .pages a")
	pageCommands.forEach(
		function(elm) {
			if (elm.text === "«") {
				elm.click()
			}

			setTimeout(() => {
				setupSelection()
				currentRowId = listArray[0]
				currentRow = document.getElementById(currentRowId)
				currentRow.classList.add("row-outline")
				currentRow.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
			}, 2000)
		}
	)
}

// ===================================
// == move to next page of messages ==
// ===================================
function pageRight() {
	pageCommands = document.querySelectorAll("#subform_1 + .moduletable .pages a[href^='javascript']")
	pageCommands.forEach(
		function(elm) {
			if (elm.innerText === "»") elm.click()

			setTimeout(() => {
				setupSelection()
				currentRowId = listArray[0]
				currentRow = document.getElementById(currentRowId)
				currentRow.classList.add("row-outline")
				currentRow.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
			}, 2000)
		}
	)
}

// ============================
// == hide add... shhhhhh... ==
// ============================
function hideAd() {
	document.querySelector(".advertisement-leaderboard").classList.add("display-none")
}
