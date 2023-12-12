import { useEffect, useState } from "react";

let a=1;
export function Meals(){

    const [loadedMeals,setLoadedMeals]=useState([]);

    useEffect(()=>{
        async function fetchMeals(){
      
            const response = await fetch('http://localhost:3000/meals');


            if(!response.ok){
             console.log("sorry brother you gets some error");
            }
            
            const meals= await response.json();
            setLoadedMeals(meals);

    }

   
        fetchMeals();
    },[])

    
        
    


    return <>
        <ul id="meals">
            {loadedMeals.map(meal => <li key={meal.id}>{meal.name}</li>)}
        </ul>
    </>
}