// let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'

let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
let page = 1

let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}` 
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`

let btns = document.querySelectorAll('.btns')
let prev = document.querySelector(".prev")
let next = document.querySelector(".next")

let appending = document.querySelector('.append')

let sanoq = document.querySelector('.title')

class Kinolar {
    constructor(){}


    changeToken(){
        tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}` 
        tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}` 
        tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}` 
    }

    async rendering(){
        let type = window.localStorage.getItem("type") || "top_rated"
        let data = null
        if(type === "top_rated"){
            let response = await fetch(tokenTop)
            console.log(tokenTop)
            data = await response.json()
            data = data.results
            console.log(data)
        }else if(type === "popular"){
            let response = await fetch(tokenPopular)
            data = await response.json()
            data = data.results
            // console.log(data)

        }else if(type === 'upcoming'){
            let response = await fetch(tokenUpComing)
            data = await response.json()
            data = data.results
            // console.log(data)
        }




        appending.innerHTML = null
        for(let i of data){
            let element = getHtml(i)
            appending.innerHTML += element
        }

        search.value = null, min.value = null, max.value = null, score.value = null

    }

    async filter(ism, min, max, score){
        let type = window.localStorage.getItem("type") || "top_rated"
        let data = null
        if(type === "top_rated"){
            let response = await fetch(tokenTop)
            console.log(tokenTop)
            data = await response.json()
            data = data.results
            console.log(data)
        }else if(type === "popular"){
            let response = await fetch(tokenPopular)
            data = await response.json()
            data = data.results
            // console.log(data)

        }else if(type === 'upcoming'){
            let response = await fetch(tokenUpComing)
            data = await response.json()
            data = data.results
            // console.log(data)
        }

        data = data.filter((el, i) => {
            let name = ism ? el.title.toLowerCase().includes(ism.toLowerCase()) : true
            let minDate = min ? el.release_date.slice(0,4) >= min && min.length == 4 : true
            let maxDate = max ? el.release_date.slice(0,4) <= max && max.length == 4 : true
            let scor = score ? el.vote_average >= score : true


            return name && minDate && maxDate && scor
        })

        appending.innerHTML = null
        if(data.length){
            console.log(data)
            for(let i of data){
                let element = getHtml(i)
                appending.innerHTML += element
            }
        }else{
            let h1 = document.createElement('h1')
            h1.textContent = 'Kinolar Topilmadi. Yoki Xatolik Bor!'
            h1.style.color = "orange"
            console.log("hello")
            appending.append(h1)
        }

    }
}




let kino = new Kinolar()

kino.rendering()


for(let i of btns){
    i.addEventListener('click', (e) => {
        page = 1
        sanoq.textContent = page
        kino.changeToken()
        window.localStorage.setItem("type", e.target.value)
        kino.rendering()
    })
}

next.onclick = event => {
    page++
    sanoq.textContent = page
    kino.changeToken()
    kino.rendering()
}


prev.onclick = event => {
    if(page > 1){
        page--
        sanoq.textContent = page
        kino.changeToken()
        kino.rendering()
    }
}

filtering.onclick = event => {
    kino.filter(search.value, min.value, max.value, score.value)
}

