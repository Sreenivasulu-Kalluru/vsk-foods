import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';
import { CDN_URL } from '../utils/constants';
import { toast } from 'react-toastify';

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // dispatch an action
    dispatch(addItem(item));
    toast.success('Item added to the cart');
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="flex justify-between flex-shrink-0 py-2 text-left border-b-2 md:p-2 md:m-2"
          // className="relative flex justify-center w-28 max-h-24 shrink-0"
        >
          <div className="w-9/12 max-w-full">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="relative w-[40%] p-2 md:w-3/12">
            <img
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
              className="object-cover object-center w-full rounded-md"
            />
            <button
              className="p-2 rounded-lg absolute bottom-[2%] left-[35%] bg-black text-white shadow-lg hover:bg-white  hover:text-black transition-all duration-[.3s]"
              onClick={() => handleAddItem(item)}
            >
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
