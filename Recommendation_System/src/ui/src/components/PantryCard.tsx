import { Product } from '@/interface/IProduct';
import placeHolderImage from '../assets/placeholder-image.jpg';
import { Button } from './ui/button';
import { usePantryContext } from '@/context/PantryContext';

export default function PantryCard(props: Product) {
    const {PantryState,setPantryState} = usePantryContext();
    const handleRemove =()=>{
        const newPantryState = PantryState.filter((item:Product) => item.id !== props.id);
        setPantryState(newPantryState);
    }
    return (
        <div className='w-full flex justify-center items-center p-1  rounded overflow-hidden  border border-black '>
            <img
                className='w-24 h-24 object-cover'
                src={props.img_url}
                alt={props.product_name}
                onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = placeHolderImage; // Replace with the actual path to your placeholder image
                }}
            />
            <div className='p-4'>
                <h2 className='font-semibold mb-2'>{props.product_name}</h2>
                <p className='text-gray-600 mb-2'>{props.brand}</p>
                <p className='text-gray-600 mb-2'>{props.category}</p>
                <div className='flex justify-between'>
                    <Button
                    onClick={handleRemove}
                    // disabled={isInPantry}
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
}
