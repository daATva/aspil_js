// Класс SmoothScroll, который создает объект для плавного скролла страницы
class SmoothScroll {
	constructor(wrapper, content, smooth = 1.5, effects = true) {
	  this.wrapper = wrapper; 
	  this.content = content; 
	  this.smooth = smooth; 
	  this.effects = effects; 
	}
  
	// Метод create() создает экземпляр ScrollSmoother, используя переданные параметры
	create() {
	  ScrollSmoother.create({
		wrapper: this.wrapper,
		content: this.content,
		smooth: this.smooth,
		effects: this.effects
	  });
	}
  }
  
  // Класс HeroSection, который создает объект для анимации главной секции страницы
  class HeroSection {
	constructor(selector) {
	  this.selector = selector;
	}
  
	// Метод animate() использует gsap.fromTo() для создания анимации, которая запускается при прокрутке страницы
	animate() {
	  gsap.fromTo(this.selector, { opacity: 1 }, {
		opacity: 0,
		scrollTrigger: {
		  trigger: this.selector, 
		  start: 'center',
		  end: '820',
		  scrub: true 
		}
	  });
	}
  }
  
  // Класс GalleryItem, который создает объект для анимации элементов галереи
  class GalleryItem {
	constructor(selector, xOffset, yOffset, start, end) {
	  this.selector = selector; 
	  this.xOffset = xOffset; 
	  this.yOffset = yOffset; 
	  this.start = start; 
	  this.end = end; 
	}
  
	// Метод animate() использует gsap.fromTo() для создания анимации элемента галереи, которая запускается при прокрутке страницы
	animate() {
	  gsap.fromTo(this.selector, { opacity: 0, x: this.xOffset }, {
		opacity: 1, x: 0,
		scrollTrigger: {
		  trigger: this.selector,
		  start: this.start, 
		  end: this.end, 
		  scrub: true 
		}
	  });
	}
  }
  
  const smoothScroll = new SmoothScroll('.wrapper', '.content');
  const heroSection = new HeroSection('.hero-section');
  const galleryItemsL = gsap.utils.toArray('.gallery__left .gallery__item');
  const galleryItemsR = gsap.utils.toArray('.gallery__right .gallery__item');
  
  if (ScrollTrigger.isTouch !== 1) {
	smoothScroll.create();
	heroSection.animate();
  
	galleryItemsL.forEach(item => {
	  const galleryItem = new GalleryItem(item, -50, 0, '-850', '-100');
	  galleryItem.animate();
	});
  
	galleryItemsR.forEach(item => {
	  const galleryItem = new GalleryItem(item, 50, 0, '-750', 'top');
	  galleryItem.animate();
	});
}