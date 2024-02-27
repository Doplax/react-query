import { useQuery } from '@tanstack/react-query';

// Como no la exporto queda privada
const getRandomNumberFromApi = async (): Promise<number> => {
    const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain');
    const numberString = await res.text();
    return +numberString;
};


export const useRandom = () => {
    const query = useQuery({
        queryKey: ['randomNumber'],
        queryFn: getRandomNumberFromApi,
        retry: 1
      });

      return query
}


  