class Slider {
	constructor(section, info) {

		this.section = section;
		this.selection = section.querySelector('.completed-projects__selection');
		this.rightArrow = section.querySelector('.arrow_right');
		this.leftArrow = section.querySelector('.arrow_left');
		this.dots = section.querySelector('.selection-bar__dot-container');
		this.slider = section.querySelector('.completed-projects__slider');
		this.sliderImg = this.slider.querySelector('.slider__img').firstElementChild;
		this.leftButton = this.slider.querySelector('.slide-button_left');
		this.rightButton = this.slider.querySelector('.slide-button_right')
		this.features = section.querySelector('.completed-projects__features');
		this.flats = info;
		this.currentFlat = 0;

		this.onClickSelection = this.onClickSelection.bind(this);
		this.onClickLeft = this.onClickLeft.bind(this);
		this.onClickRight = this.onClickRight.bind(this);
		this.onClickDots = this.onClickDots.bind(this);

		this.selection.addEventListener('click', this.onClickSelection);
		this.rightArrow.addEventListener('click', this.onClickRight);
		this.leftArrow.addEventListener('click', this.onClickLeft);
		this.dots.addEventListener('click', this.onClickDots);
		this.rightButton.addEventListener('click', this.onClickRight);
		this.leftButton.addEventListener('click', this.onClickLeft);

	}

	onClickRight() {
		this.currentFlat++;
		this.currentFlat = (this.currentFlat == 3) ? 0 : this.currentFlat;
		this.changeActiveItems();
		this.changeInformation();
	}
	onClickLeft() {
		this.currentFlat--;
		this.currentFlat = (this.currentFlat == -1) ? 2 : this.currentFlat;
		this.changeActiveItems();
		this.changeInformation();
	}
	onClickSelection(event) {
		event.preventDefault();
		const selectionItem = event.target.closest('.selection__item');
		if (!selectionItem) return;
		const newFlat = selectionItem.classList[1].slice(-1) - 1;
		if (this.currentFlat === newFlat) {
			return
		}
		this.currentFlat = newFlat;
		selectionItem.firstElementChild.classList.add('_active');
		this.changeActiveItems();
		this.changeInformation();
	}
	onClickDots(event) {
		const dot = event.target.closest('.selection-bar__dot');
		if (!dot) return;
		const childrenDots = [...event.currentTarget.children];
		const newFlat = childrenDots.indexOf(event.target);
		if (this.currentFlat === newFlat) {
			return
		}
		this.currentFlat = newFlat;
		this.changeActiveItems();
		this.changeInformation();
	}
	changeActiveItems() {
		const activeElements = this.section.querySelectorAll('._active');
		if (activeElements) {
			for (let elem of activeElements) {
				elem.classList.remove('_active');
			}
		}
		const selectionItems = this.selection.querySelectorAll('.selection__item');
		selectionItems[this.currentFlat].firstElementChild.classList.add('_active');
		this.dots.children[this.currentFlat].classList.add('_active');
	}
	async changeInformation() {
		const textBlocks = this.features.querySelectorAll('.block-text__text');
		let newOpacity = 0;
		textBlocks.forEach(element => {
			element.style.opacity = newOpacity;
		});
		this.sliderImg.style.opacity = newOpacity;
		this.sliderImg.setAttribute('src', this.flats[this.currentFlat].img);
		textBlocks[0].innerHTML = this.flats[this.currentFlat].city;
		textBlocks[1].innerHTML = this.flats[this.currentFlat].apartmentArea;
		textBlocks[2].innerHTML = this.flats[this.currentFlat].repairTime;
		while (newOpacity < 0.9) {

			await new Promise((resolve) => {
				setTimeout(() => { resolve(newOpacity += 0.1) }, 50);
			});
			textBlocks.forEach(element => {
				element.style.opacity = newOpacity;
			});
			this.sliderImg.style.opacity = newOpacity;
		}

	}

}
rostovAdmiral = {
	city: 'Rostov-On-Don <br>LCD Admiral',
	repairTime: '3.5 months',
	apartmentArea: '81 m2',
	img: 'img/completed-projects/1.jpg',
}
sochiThieves = {
	city: 'Sochi <br>Thieves',
	repairTime: '4 months',
	apartmentArea: '105 m2',
	img: 'img/completed-projects/2.jpg',
}
rostovPatriotic = {
	city: 'Rostov-On-Don <br>Patriotic',
	repairTime: '3 months',
	apartmentArea: '93 m2',
	img: 'img/completed-projects/3.jpg',
}
const information = [this.rostovAdmiral, this.sochiThieves, this.rostovPatriotic,];
const slider = new Slider(document.querySelector('.completed-projects'), information);

