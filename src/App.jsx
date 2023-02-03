import React from "react"

function App() {

  function Header()
  {
    return(
      <nav>
        <h2>MemeGenerator</h2>
      </nav>
    )
  }

  function Meme()
  {  
    const [meme , setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg"
    })

    const [allImages , setAll] = React.useState([])

    React.useEffect(function()
    {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAll(data.data.memes))
    } , [])



    function getMeme(){
      const randomNumber = Math.floor(Math.random() * allImages.length)
      const url  = allImages[randomNumber].url
      setMeme(function(prevMeme){
          return {
              ...prevMeme,
              randomImg: url
          }
      })
    }

    function handle(event)
    {
        const{name , value} = event.target
        setMeme(function(prev){
            return{
                ...prev,
                [name]: value
            }
        })
    }
    
    return(
      <main>
        <form className="form">
          <input type="text" 
                  placeholder="Top text"
                  name="topText"
                  value={meme.topText} 
                  onChange={handle}
            />

            <input type="text"
              placeholder="Bottom text"
              name="bottomText"
              value={meme.bottomText} 
              onChange={handle}/>

        </form>
        <button onClick={getMeme}>Get a new meme image 🖼</button>
        <div className="meme-img">
          <img src={meme.randomImg} className="image"/>
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </main>
    )

  }

  return (
    <div className="container">
      <Header />
      <Meme />
    </div>
  )
}

export default App
