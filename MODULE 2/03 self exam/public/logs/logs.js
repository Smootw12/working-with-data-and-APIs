getData();
let buttons = []
async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  data.forEach((item) => {
    const root = document.createElement('p');
    const mood = document.createElement('div');
    const geo = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');

    mood.textContent = `mood: ${item.mood}`;
    geo.textContent = `${item.lat}°, ${item.lon}°`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    image.src = item.image64;
    buttons[item._id] = document.createElement('button')
    buttons[item._id].textContent = 'delete'
    root.append(mood, geo, date, image, buttons[item._id]);
    document.body.append(root);
  });
  console.log(data);
}
buttons.forEach(element => {
  element.addEventListener('click', async event => {
    
  })
});
