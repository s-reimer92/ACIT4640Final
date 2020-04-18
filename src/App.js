import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'



function App() {

  const [image, setImage] = useState("https://i.picsum.photos/id/1/200/300.jpg")
  const [savedImages, setSavedImages] = useState([])
  const [loaded, setLoaded] = useState(false)

  const getImage = () => {
    axios.get("http://localhost:8090/img")
      .then(url => {
        console.log(image)
        setImage(url.data)
      })
  }

  const toDatabase = () => {
    console.log(image)
    axios.post("http://localhost:8090/db", {"image": image})
    .then(function(res){
      console.log(res.statusText)
    })
  }

  const setUp = () => {
    axios.get("http://localhost:8090/db")
    .then(images => {
      console.log(images)
      setSavedImages(images.data)
    })
  }

  const saveImage = () => {
    const saved = savedImages
    saved.push(image)
    setSavedImages(saved)
    toDatabase()
  }

  useEffect(() => {
    setTimeout(getImage, 3000)
  }, [image])
  


  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("out")
      if (loaded == false) {
        console.log("in")
        setUp()
        setLoaded(true)
        }
    }, 3000)

    return () => clearTimeout(timeout) // "cleanup function"
  }, [loaded])

  return (
    <div className="App">
      <h1>Shane's Project</h1>
        
      <img src={image} />
      <button onClick={saveImage}>Save</button> 
      <p>
        This is my final project for ACIT4640.  The app displays a random photo, changing every 3 seconds.  
      </p>
      <p>
        On startup it will load any photos in the sqlite db and display below.
      </p>
      <p>
        Pressing save will store the current image in the dp.
      </p>
      <p>
        Uses a react frontend, python api and sqlite db
      </p>
      <ul>
        {savedImages.map((value, index) => {
      
          return <img key={index} src={value} />
        })}
      </ul>

    </div>
  );
}

export default App;
