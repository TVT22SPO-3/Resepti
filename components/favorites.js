import { firestore, collection, addDoc, serverTimestamp, doc, deleteDoc, query, where, getDocs, setDoc, updateDoc } from '../firebase/config';
import { useAuth } from '../context/useAuth'; 
import { arrayUnion } from 'firebase/firestore';
import { arrayRemove } from 'firebase/firestore';

export const fetchUserFavorites = async () => {
    const { user } = useAuth(); 
    try {
    const favoritesRef = collection(firestore, `users/${user.uid}/favorites`);
    const favoritesSnapshot = await getDocs(favoritesRef);
    const favoritesData = favoritesSnapshot.docs.map(doc => doc.data());
    setFavorites(favoritesData);

    setMeals(prevMeals => {
      return prevMeals.map(recipe => {
        return {
          ...recipe,
          isFavorite: favoritesData.some(item => item.idMeal === recipe.idMeal)
        };
      });
    });
  } catch (error) {
    console.error(error);
  }
};

async function addToFavorites(uid, idMeal) {
  console.log("add favorites", idMeal)
  try {
    const favoritesRef = doc(firestore, `profile`, uid);
    await updateDoc(favoritesRef, {
      favorite: arrayUnion(idMeal)
    });
    console.log("Recipe added to favorites:", idMeal); 
  } catch (error) {
    console.error("Error adding recipe to favorites:", error);
  }
}
async function removeFromFavorites(uid, idMeal) {
  try {
      const favoritesRef = doc(firestore, `profile`, uid);
      await updateDoc(favoritesRef, {
          favorite: arrayRemove(idMeal)
      });
      console.log("Recipe removed from favorites:", idMeal);
  } catch (error) {
      console.error("Error removing from favorites:", error);
  }
}

export const updateMealFavoriteStatus = (mealId, isFavorite, setMeals) => {
  setMeals(prevMeals => {
    return prevMeals.map(item => {
      if (item.idMeal === mealId) {
        return { ...item, isFavorite: isFavorite };
      }
      return item;
    });
  });
}; 

export {addToFavorites, removeFromFavorites}

