import { graphQLClient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTweets = () => {
    const query = useQuery({
      queryKey: ["all-tweets"],
      queryFn: () => graphQLClient.request(getAllTweetsQuery),
    });
    return { ...query, tweets: query.data?.getAllTweets };
  };