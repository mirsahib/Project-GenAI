import Layout from '@/components/Layout';
import PantryCard from '@/components/PantryCard';
import RecipeCard from '@/components/RecipeCard';
import { apiUrl } from '@/config/apiUrl';
import { usePantryContext } from '@/context/PantryContext';
import { Recipe, RecipeResponse } from '@/interface/IRecipe';
import { postData } from '@/util/RESTOPS';
import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

const item: Recipe = {
    id: '1',
    recipe_name:
        'Egg White Cheese Scrambled Eggs With Spinach & Caramelized Onion Recipe',
    product_name:
        "['Potato Finger Salt', 'Organic - Black Pepper Powder', 'Onion', 'Eggs - Regular']",
    ingredients:
        "['2 tablespoon Cheddar cheese', 'Salt - to taste', 'Black pepper powder - to taste', '1 Onion', '1 tablespoon Butter - plus extra', '4 Egg whites', '1/2 cup Spinach - tightly packed']",
    total_time: 25,
    cuisine: 'Continental',
    instructions:
        'To begin with Egg White Cheese Scrambled Eggs With Spinach & Caramelized Onion, thinly sliced the onions.\nWash spinach leaves and chop them into small pieces.Add 1 tablespoon of butter in a skillet.\nAdd thin slices of onions and sauté until it turn light golden brown (caramelized onions).Next add chopped spinach and cook until spinach until soft.\nWhisk egg whites along with salt and pepper well until frothy.Pour the whisked egg whites into the skillet and turn the heat down.\nUse a spatula to fold the eggs from the edge of the pan into the centre until they are fully cooked.This will help keep them light and fluffy.\nThey should only cook for about 30 seconds as this will keep the texture perfect.Turn off flame and add grated cheese.Serve Egg White Cheese Scrambled Eggs With Spinach & Caramelized Onion with toast and Mango Tofu Smoothie for a healthy breakfast.',
    url: 'https://www.archanaskitchen.com/egg-white-cheese-scrambled-eggs-with-spinach-caramelized-onion-recipe',
    image_url:
        'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Jyothi_Rajesh/Egg_White_Cheese_Scrambled_Eggs_with_Spinach__Caramelized_Onion.jpg',
    ingredient_count: 7,
    similarity: 0.4027699294182593,
};

export default function index() {
    const { PantryState } = usePantryContext();
    const [recipies, setRecipies] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const product_name = PantryState.map(item => item.product_name);
            console.log('🚀 ~ fetchData ~ product_name:', product_name);
            const response = await postData<RecipeResponse>(
                apiUrl.listrecipes,
                {
                    product_name: product_name,
                },
            );
            console.log('🚀 ~ fetchData ~ response:', response);
            if (!response.success) {
                throw new Error(response.error);
            }
            setRecipies(response.data.recipies);
            setLoading(false);
        } catch (error) {
            console.log('🚀 ~ fetchData ~ error:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (PantryState && PantryState.length > 0) {
            fetchData();
        }
    }, [PantryState]);

    return (
        <Layout>
            <div className='flex flex-col items-center justify-between px-10 my-10'>
                <h1 className='font-bold mb-2 text-center'>Pantry</h1>
                <div className='grid grid-cols-3 md:grid-cols-4 gap-5'>
                    {PantryState.map(item => (
                        <PantryCard {...item} key={item.id} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center justify-between px-10 my-10'>
                <h1 className='font-bold mb-2 text-center'>Recipies</h1>
                <div className='grid grid-cols-1 md:grid-cols-1 gap-5'>
                    
                    {loading ? (
                        <Loader className='mx-auto animate-spin' />
                   ) : (
                        recipies.map(item => (
                            <RecipeCard {...item} key={item.id} />
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
}
