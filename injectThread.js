if (window.location.href.indexOf('https://boardgamegeek.com/thread') == 0) {
	// add style sheet
	let newStyle = `
		<style>
			.display-none {
				display: none !important;
			}

			/* --------------------------------------------- */
			/* -- some quality of life style improvements -- */
			/* --------------------------------------------- */
			@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

			body {
				font-family: 'Roboto', sans-serif;
			}
		</style>
	`
	document.head.insertAdjacentHTML("beforeend", newStyle)

	// init
	addKeyboardEventListeners()

	function addKeyboardEventListeners() {
		// add event listener for key presses
		document.addEventListener("keydown", (event) => {
			// console.log(event.code)

			// prevent key shortcuts when typing into a text box
			var elem = event.target;
			var type = elem.getAttribute("type");
			if(type != 'text' && type != 'textarea') {

				//---------------------
				//-- J - scroll down --
				//---------------------
				if (event.code === "KeyJ") {
					window.scrollBy({
						top: 350,
						behavior: 'smooth'
					})
				}
				//-------------------
				//-- K - scroll up --
				//-------------------
				else if (event.code === "KeyK") {
					window.scrollBy({
						top: -350,
						behavior: 'smooth'
					})
				}
				//-------------------
				//-- S - subscribe --
				//-------------------
				else if (event.code === "KeyS") {
					document.querySelectorAll("gg-subscription-button button")[0].click()
				}
				//-----------------
				//-- G - go back --
				//-----------------
				else if (event.code === "KeyG") {
					history.back()
				}
				//---------------------
				//-- T - top message --
				//---------------------
				else if (event.code === "KeyT") {
					window.scrollTo({
						top: 0,
						behavior: 'smooth'
					})
				}
				//------------------------
				//-- B - bottom message --
				//------------------------
				else if (event.code === "KeyB") {
					window.scrollTo({
						top: 9999999999,
						behavior: 'smooth'
					})
				}
				//-------------------------
				//-- H - hide top bar ad --
				//-------------------------
				else if (event.code === "KeyH") {
					hideAd()
				}
			}
		});
	}

	// ============================
	// == hide add... shhhhhh... ==
	// ============================
	function hideAd() {
		document.querySelector("gg-leaderboard-ad").classList.add("display-none")
	}
}
