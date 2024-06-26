const navContainer = document.querySelector(".nav__container");
const navBars = document.querySelector(".nav__bars");
const navItems = document.querySelectorAll(".js-items");
const navExit = document.querySelector(".nav__exit");
const footerYear = document.querySelector(".footer__year");
let isShowedNav = false;

const name = document.querySelector("#name");
const surname = document.querySelector("#surname");
const mail = document.querySelector("#mail");
const phone = document.querySelector("#phone");
const msg = document.querySelector("#msg");
const formBtn = document.querySelector(".form__btn");
const formInfo = document.querySelector(".form__info");
const emailInfo = document.querySelector(".form__info-email");
const phoneInfo = document.querySelector(".form__info-phone");

navItems.forEach((item) => {
	item.addEventListener("click", (event) => {
		if (isShowedNav) {
			navContainer.classList.remove("nav__container--active");
			navExit.classList.remove("nav__exit--active");
		}
		event.preventDefault();
		console.log(item.dataset["selector"]);
		scrollToSection(item.dataset["selector"]);
	});
});

const showNav = () => {
	isShowedNav = true;
	navContainer.classList.add("nav__container--active");
	navExit.classList.add("nav__exit--active");
};

const hideNav = () => {
	isShowedNav = false;
	navContainer.classList.remove("nav__container--active");
	navExit.classList.remove("nav__exit--active");
};

const currentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};

currentYear();
const scrollToSection = (selector) => {
	const navigationHeight = document.querySelector(".nav").offsetHeight + 30;
	const targetDiv = document.querySelector(`${selector} .section__heading`);
	const targetDivPosition = targetDiv.offsetTop - navigationHeight;

	window.scrollTo({
		top: targetDivPosition,
	});

	console.log(targetDivPosition);
};


const checkForm = (inputs) => {
	let allFilled = true;

	inputs.forEach((item) => {
		if (item.value.trim() === "") {
			allFilled = false;
		}
	});

	if (!allFilled) {
		formInfo.textContent = "Wszystkie pola muszą zostać wypełnione";
	} else {
		clearInput(inputs);
		formInfo.textContent =
			"Dziękujemy za przesłanie formularza! Odpowiedź prześlemy na podany adres e-mail";
	}
};

const checkPhone = (phone) => {
	const re = /^(\+48[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{3}[- ]?\d{3}$/;

	if (re.test(phone.value)) {
		phoneInfo.textContent = "";
		return true;
	} else {
		phoneInfo.textContent = "Numer telefonu jest niepoprawny";
		return false;
	}
};

const checkMail = (mail) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(mail.value)) {
		emailInfo.textContent = "";
		return true;
	} else {
		emailInfo.textContent = "E-mail jest niepoprawny";
		return false;
	}
};

const clearInput = (inputs) => {
	inputs.forEach((item) => {
		item.value = "";
	});
};

formBtn.addEventListener("click", (e) => {
	e.preventDefault();

	const isPhoneValid = checkPhone(phone);
	const isMailValid = checkMail(mail);

	if (isPhoneValid && isMailValid) {
		checkForm([name, surname, mail, phone, msg]);
	} else {
		formInfo.textContent = "";
	}
});

navBars.addEventListener("click", showNav);
navExit.addEventListener("click", hideNav);
