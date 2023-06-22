// function expandCard(card) {
// 	card.classList.toggle("expanded");
// 	const weatherDetail = card.querySelector(".weather_detail");
// 	weatherDetail.classList.toggle("hidden");
//   }
const card = document.querySelector('.expandable-card');

card.addEventListener('click', () => {
  card.classList.toggle('expanded');
  console.log("clicked")
});

  