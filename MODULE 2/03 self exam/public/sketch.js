var paintThiccness = 15
function setup() {
  const canvas = createCanvas(300, 300)
  pixelDensity(1)
  background(0)
  let lat, lon
  const buttonA = document.getElementById('submit')
  const buttonB = document.getElementById('delete')
  const buttonC = document.getElementById('makebigger')
  const buttonD = document.getElementById('makethinner')
  buttonD.addEventListener('click', event => {
    if(paintThiccness < 10){
      paintThiccness = 10
    }
    paintThiccness -= 5
  })
  buttonC.addEventListener('click', event => {
    paintThiccness += 5
  })
  buttonB.addEventListener('click', event => {
    background(0)
  })
  buttonA.addEventListener('click', async event => {
    const mood = document.getElementById('mood').value
    canvas.loadPixels()
    const image64 = canvas.elt.toDataURL()
    const data = {
      lat,
      lon,
      mood,
      image64
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const response = await fetch('/api', options)
    const json = await response.json()
    console.log(json)
  });

  if ('geolocation' in navigator) {
    console.log('geolocation available')
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude
      lon = position.coords.longitude
      console.log(lat, lon)
      document.getElementById('latitude').textContent = lat
      document.getElementById('longitude').textContent = lon
    })
  } else {
    console.log('geolocation not available')
  }
}

function draw() {
  fill(255, 50)
  if (mouseIsPressed) {
    ellipse(mouseX, mouseY, paintThiccness)
  }
}