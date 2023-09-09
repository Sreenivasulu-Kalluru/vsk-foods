import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';
import Loader from './Loader';
import { CDN_URL } from '../utils/constants';
import { FiClock } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';

const RestaurantMenu = () => {
  const { resId } = useParams();

  const dummy = 'Dummy Data';

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Loader />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    cloudinaryImageId,
    avgRating,
    deliveryTime,
  } = resInfo?.cards[0]?.card?.card?.info;

  // const { itemCards } =
  //   resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    );

  // console.log(categories);

  return (
    <div className="text-center">
      <header className="min-h-[30vh] p-4 bg-black text-[#f7f7f7] flex justify-center items-center gap-[30px]">
        <div className="menu-header-left">
          <img
            src={CDN_URL + cloudinaryImageId}
            alt="Restaurent Info"
            className="hidden md:block w-[250px] object-cover h-[170px] rounded-md bg-cover bg-center"
          />
        </div>
        <div className="menu-header-right">
          <div className="top">
            <h1 className="text-[40px] font-normal">{name}</h1>
            <h3 className="font-normal opacity-[0.7] mt-[5px]">
              {cuisines.join(', ')}
            </h3>
          </div>
          <div className="flex gap-[20px] items-center mt-[20px]">
            <h4 className="flex items-center border-r-[4px] border-[#ccc] gap-1 pr-[20px]">
              <span
                className="icons"
                style={{
                  position: 'relative',
                  top: '2px',
                  marginRight: '3px',
                }}
              >
                <AiOutlineStar className="w-5 h-5" />
              </span>
              <span>{avgRating}</span>
            </h4>
            <h4 className="flex items-center gap-1 border-r-[4px] border-[#ccc] pr-[20px]">
              <span
                style={{
                  position: 'relative',
                  top: '2px',
                  marginRight: '3px',
                }}
              >
                <FiClock className="w-5 h-5" />
              </span>
              <span> {deliveryTime} MINS</span>
            </h4>
            <h3>{costForTwoMessage}</h3>
          </div>
        </div>
      </header>

      <div className="my-[50px] ml-[6%] text-left">
        <Link
          to="/"
          className="px-4 py-2 font-bold duration-[0.3s] bg-green-400 rounded-md hover:bg-green-500"
        >
          &larr; Back
        </Link>
      </div>

      {/* categories accordions */}
      {categories?.map((category, index) => (
        // Controlled Component
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
