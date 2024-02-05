export const fetchQuote = async (onSuccess, onError) => {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error);
  }
};
