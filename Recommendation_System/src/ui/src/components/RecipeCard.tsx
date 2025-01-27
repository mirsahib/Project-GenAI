import { Recipe } from "@/interface/IRecipe";
import placeHolderImage from "../assets/placeholder-image.jpg";

export default function RecipeCard(props: Recipe) {
    const parseStringToList = (input:string) => {
        try {
          // Replace single quotes with double quotes and parse as JSON
          return JSON.parse(input.replace(/'/g, '"'));
        } catch (error) {
          console.error("Invalid input string format", error);
          return [];
        }
      };
    

    return (
        <div className='w-full  rounded overflow-hidden  border border-black '>
            <img
                className='w-full object-cover'
                src={props.image_url}
                alt={props.recipe_name}
                onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = placeHolderImage; // Replace with the actual path to your placeholder image
                }}
            />
            <div className="p-4">
                <h2 className="font-semibold mb-2"> <span className="font-bold">Recipe Name: </span> {props.recipe_name}</h2>
                <p className="mb-2"><span className="text-black font-bold">Product Name: </span>{parseStringToList(props.product_name).map((item:any,index:number)=>(
                    <li key={index}>{item}</li>
                ))}</p>
                <p className="mb-2"><span className="text-black font-bold">Ingredients: </span>{parseStringToList(props.ingredients).map((item:any,index:number)=>(
                    <li key={index}>{item}</li>
                ))}</p>
                <p className="mb-2"><span className="text-black font-bold"> Cuisine: </span>{props.cuisine}</p>
                <p className="mb-2"><span className="text-black font-bold"> Instructions: </span>{props.instructions}</p>

                <p className="mb-2 font-bold">
                    Time to cooked: {props.total_time} min
                </p>
                {/* <div className="flex justify-between">
                    <div className="text-lg font-bold mb-4">${props.price}</div>
                    <Button
                        onClick={() =>
                            setPantryState((prev) => [...prev, props])
                        }
                        disabled={isInPantry}
                    >
                        {isInPantry ? "Added" : "Add to Pantry"}
                    </Button>{" "}
                </div> */}
            </div>
            
        </div>
    );
}
