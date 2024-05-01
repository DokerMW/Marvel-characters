const cardsContainer = document.querySelector('.cards__body');
const filmSelect = document.getElementById('select')
const upBtn = document.querySelector('.up__btn');
let fetchData;
let moviesBlock;
let cardContent;
let filterArr = []
let options = []

const getData = async () => {
  const response = await fetch('./dbHeroes.json');
  const data = await response.json();
  fetchData = data;
  return data;
}

const smoothScroll = (elem) =>{
	event.preventDefault();

	const blockID = elem.getAttribute('href').substr(1)

	document.getElementById(blockID).scrollIntoView({
		behavior: 'smooth',
		block: 'start'
	})
}

(async () => {
  await getData();

	const filterCards = () =>{
		filterArr = []
		cardsContainer.innerHTML = ''
		if(filmSelect.selectedIndex == 0){
			drawCards(fetchData)
		} else {
			fetchData.forEach(e => {
				if(e.movies){
					e.movies.forEach(el => {
						if(el == filmSelect.options[filmSelect.selectedIndex].value){
							filterArr.push(e)
						}
					})
				}
			})
			drawCards(filterArr)
		}
	}

	const getAllOptions = () => {
		filmSelect.innerHTML = `<option selected>Все фильмы</option>`
		fetchData.forEach(e => {
			if(e.movies){
				e.movies.forEach(el => {
						options.push(el)
						
				})
			}
		})
		options = options.filter((item, index) => {
			return options.indexOf(item) === index
	 });
	 options.sort()
	 options.forEach(e => {
		filmSelect.insertAdjacentHTML('beforeend', `<option value="${e}">${e}</option>`)
	 })
	}

	const drawCards = (arr) => {
		arr.forEach((e,i) => {
			cardsContainer.insertAdjacentHTML('beforeend', 
		 `<div class="cards__item item-card">
				<div class="item-card__img">
					<img src="./${e.photo}" alt="">
				</div>
				<div class="cards__content">
				</div>
			</div>
		 `)
	
		 cardContent = document.querySelectorAll('.cards__content')
	
		 const drawDiv = (el, label)  => {
			if(el){
				cardContent[i].insertAdjacentHTML('beforeend', 
				`<div>${label}: <span>${el}</span></div>`)
			}
		 }
		 drawDiv(e.name, 'Имя')
		 drawDiv(e.realName, 'Настоящее имя')
		 drawDiv(e.species, 'Вид')
		 drawDiv(e.citizenship, 'Гражданство')
		 drawDiv(e.gender, 'Пол')
		 drawDiv(e.birthDay, 'Год рождения')
		 drawDiv(e.deathDay, 'Год смерти')
		 drawDiv(e.status, 'Статус')
		 drawDiv(e.actors, 'Актер')
	
		if(e.movies){
			cardContent[i].insertAdjacentHTML('beforeend', 
			`<div class="item-card__movies">
					 <span>Фильмы:</span>
					<ul>
					 </ul>
				 </div>`)
			moviesBlock = document.querySelectorAll('.item-card__movies ul')
			
			e.movies.forEach(el => {
				moviesBlock[i].insertAdjacentHTML('beforeend', 
				`<li>${el}</li>`
			)
			})
		}  else {
			cardContent[i].insertAdjacentHTML('beforeend', '<div class="item-card__movies"><ul></ul></div>')
		}
		
		});
	}
	getAllOptions()
	drawCards(fetchData)

	filmSelect.addEventListener('change', e => 	filterCards());
})();

window.addEventListener('scroll', function () {
	if(window.scrollY > 700){
		upBtn.style.display = 'inline-block';
	} else{
		upBtn.style.display = 'none';
	}
});

upBtn.addEventListener('click', event => smoothScroll(upBtn))

