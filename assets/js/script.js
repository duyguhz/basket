let buttons=document.querySelectorAll(".addCart");

let result=localStorage.getItem("basket")
let basket=[];

if (!result) {
    localStorage.setItem("basket",JSON.stringify([]))
}
buttons.forEach((btn)=>{
     btn.addEventListener("click",function () {
     basket=JSON.parse(localStorage.getItem("basket"))


     let id=this.getAttribute("data-id")
     let parent=this.parentElement.parentElement;
     let price=parent.querySelector(".price").innerText;
     let name=parent.querySelector(".name");
     let imageSrc=parent.previousElementSibling.querySelector("img").src;
     let imageDatas=imageSrc.split("/");
     let image=imageDatas[imageDatas.length-1]

     
     let existed=basket.find((value)=>{
        return value.id==id
     })

     if(!existed){
        let item={id,image,name,price,count:1}
        basket.push(item);

     }
     else{
        existed.count++;
     }
   
     localStorage.setItem("basket",JSON.stringify(basket))
     GetCount();
     TotalPrice();
    
     
    })
})
GetCount();


function GetCount(){
    let basket=JSON.parse(localStorage.getItem("basket"))
    let count=basket.reduce((count,value)=>{
        return(count+=value.count)

    },0)
    let countSection=document.querySelector(".count")
    countSection.innerText=count

  
}
TotalPrice();
function TotalPrice(){
    let basket=JSON.parse(localStorage.getItem("basket"))
    let total=basket.reduce((t,value)=>{
        return(t+=value.count*value.price)
    },0)
    let totalSection=document.querySelector(".price");
    totalSection.innerText=total
}