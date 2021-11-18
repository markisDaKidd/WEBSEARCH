import '../dist/results.css'
let socket = io()
let main = document.querySelector('main')
let result
let count=0
let enabler = document.querySelector('.show')
let data
let xlinks=[]
let links=[]
console.log(socket);
socket.on('incoming',(payload)=>{
    data = payload
    console.log(data);
    for( let i in data.other_pages){
        xlinks.push(data.other_pages[i])
        
    }
    console.log(xlinks[1]);

     links = xlinks.map(e=>{
        let str = e
        let arr = str.split('com/search.json')
        return arr[1]
    })
    console.log(links[0]);
})



enabler.addEventListener('click',()=>{
    if(count<=links.length-1){
        console.log(links[0]);
        fetch(`/fetch`+links[count],{method:'POST'}).then(res=>res.json()).then(res=>{
            console.log(res);
            let html = ejs.render(`<% for(let i of arr) { %>
                <section>
                    <div class="title-link">
                        <a href="<%= i.link %>">
                            <div class ='title-link'>
                                <%= i.displayed_link %>
                            </div>
                            <div class="title-text">
                                <h1><%= i.title %>
                                </h1>
                            </div>
                           
                        </a>                
                        
                    </div>
                   
                    <div class="description">
                        <%= i.snippet %>
                    </div>
                </section>
            <% } %>
            
            `, {arr: res});
            main.insertAdjacentHTML('beforeend',html)
        })

    }
        
    
    count++
    console.log(count);
    
    
    
})

