import React, {useState, useEffect} from 'react'
import Quote from "../Quote";
import axios from 'axios'

function Kanye() {
  const [quote, setQuote] = useState('quote')


  const getQuote = () => {
    
    axios.get('https://api.kanye.rest')
      .then(json => {
        // console.log(json.data.quote)
        setQuote(json.data.quote)
        document.title = json.data.quote
      })
  }

  useEffect(() => {
    setTimeout(getQuote, 3000)
  }, [quote])


  return (
    <Quote quote={quote} quoter={"Kanye"} />
  )
}

export default Kanye